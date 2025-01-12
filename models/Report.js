    const mongoose = require("mongoose");

    const ReportSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    location: {
        type: {
        type: String,
        enum: ["Point"],
        required: true,
        },
        coordinates: {
        type: [Number],
        required: true,
        },
    },
    water_level: {
        type: String,
        enum: ["rendah", "sedang", "tinggi"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["verified", "unverified"],
        default: "unverified",
    },
    image_url: {
        type: String,
    },
    });

    ReportSchema.index({ location: "2dsphere" });

    module.exports = mongoose.model("Report", ReportSchema);
