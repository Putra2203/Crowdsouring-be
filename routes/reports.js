const express = require("express");
const multer = require("multer");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const storage = require("../config/firebase-config.js");
const Report = require("../models/Report.js");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// POST: Membuat laporan baru
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { user_id, location, water_level, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded!" });
    }

    const fileName = `reports/${Date.now()}_${req.file.originalname}`;
    const fileRef = ref(storage, fileName);

    // Upload file ke Firebase Storage
    await uploadBytes(fileRef, req.file.buffer, {
      contentType: req.file.mimetype,
    });

    // Dapatkan URL download untuk file yang diupload
    const imageUrl = await getDownloadURL(fileRef);

    // Simpan laporan ke database
    const newReport = new Report({
      user_id,
      location: JSON.parse(location),
      water_level,
      description,
      image_url: imageUrl,
    });

    await newReport.save();

    res
      .status(201)
      .json({ message: "Report created successfully!", report: newReport });
  } catch (err) {
    console.error("Error while creating report:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Mendapatkan semua laporan
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("user_id", "name email");
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Mendapatkan laporan berdasarkan user_id
router.get("/user/:user_id", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.params;

    if (req.user.id !== user_id) {
      return res.status(403).json({ error: "Unauthorized access!" });
    }

    const reports = await Report.find({ user_id }).populate(
      "user_id",
      "name email phone"
    );

    if (!reports || reports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this user!" });
    }

    res.status(200).json(reports);
  } catch (err) {
    console.error("Error while fetching reports by user_id:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT: Memperbarui laporan
router.put(
  "/:report_id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { report_id } = req.params;
      const { location, water_level, description, status } = req.body;

      const report = await Report.findById(report_id);

      if (!report) {
        return res.status(404).json({ message: "Report not found!" });
      }

      if (req.user.id !== report.user_id.toString()) {
        return res.status(403).json({ error: "Unauthorized access!" });
      }

      let newImageUrl = report.image_url;
      if (req.file) {
        const newFileName = `reports/${Date.now()}_${req.file.originalname}`;
        const newFileRef = ref(storage, newFileName);

        await uploadBytes(newFileRef, req.file.buffer, {
          contentType: req.file.mimetype,
        });

        if (report.image_url) {
          const oldFileName = decodeURIComponent(
            report.image_url.split("/o/")[1].split("?")[0]
          );
          const oldFileRef = ref(storage, oldFileName);
          await deleteObject(oldFileRef).catch((err) => {
            console.error("Error deleting old image:", err.message);
          });
        }

        newImageUrl = await getDownloadURL(newFileRef);
      }

      report.location = location ? JSON.parse(location) : report.location;
      report.water_level = water_level || report.water_level;
      report.description = description || report.description;
      report.status = status || report.status;
      report.image_url = newImageUrl;

      await report.save();

      res.status(200).json({
        message: "Report updated successfully!",
        report,
      });
    } catch (err) {
      console.error("Error while updating report:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// DELETE: Menghapus laporan
router.delete("/:report_id", authenticateToken, async (req, res) => {
  try {
    const { report_id } = req.params;

    const report = await Report.findById(report_id);

    if (!report) {
      return res.status(404).json({ message: "Report not found!" });
    }

    if (report.image_url) {
      const fileName = decodeURIComponent(
        report.image_url.split("/o/")[1].split("?")[0]
      );
      const fileRef = ref(storage, fileName);

      await deleteObject(fileRef).catch((err) => {
        console.error("Error deleting image from Firebase:", err.message);
      });
    }

    const deletedReport = await Report.findByIdAndDelete(report_id);

    res.status(200).json({
      message: "Report and associated image deleted successfully!",
      report: deletedReport,
    });
  } catch (err) {
    console.error("Error while deleting report:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Mendapatkan laporan di sekitar lokasi
router.get("/nearby", async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    const reports = await Report.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(maxDistance),
        },
      },
    });
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
