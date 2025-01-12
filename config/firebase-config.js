const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "storage-crowdsourcing",
    "private_key_id": "1bee385f8c4e4630c458ceb5044e590cdb2cabd6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLhH1aVC2XIhLw\nwjVSOCE8UpzBdiK9G4raRHbtVB+lnbHaGylCkzNzb2/ofHUQo1RSTA4qhDIqcMIg\nmZp8/LTIznE+BXCLpM3XljMjkoLIcP3nieCcakY7xmVDnAv9ZRU5z0xlEJMF+/C+\nbI6gVKrNWoBGHFZPdAQFqi7PGo5oR5hADZrghDPnKnfvnkSV9etoU7u0/qbx3sGU\nne+QPIRWzYvFkl7M1FSf/adfBBZFG+aqAo17ixN70WDHIdDLrHoHnmPyWqBr3ix6\nUU+hPnOmq8ZdENx+lFm9DtyYJ5pY1jHFfSeqFANpvL2ZCYYoeQ8tSWHwZrPXpm1d\np0lblTJFAgMBAAECggEAAqP/GwtD5YBxWHhcnWrRsOkC1FZxEEe+3yLLnDwJhmpB\nDYBpYk4V+SXKq5c5zvPKO0sgqpfj2BMgdwXR2v9NuoabMjUl3Fn7Zb8IKNT/fL73\n5xIt5476xvnFr0E4vUVGJ5AzVeMHf/4LMJ1TTcHreWtMMMdbWKqRBssffQZuL0Ir\nRw5twI8k1wexbE8bnI7wCMEmP/4RZSfqEuMso+VNI6hhkqEtoi5/VQhVeCJDAQhx\nmwavLWyq6+HzUeFC6NeGTU7jdSSJlb07BQALHr1bJO3nZassIidGOLyzR+iQY5nH\nR6OqEqqg9lkPq/vVPGui6JK/JJJ41E9CR3+fNsFu/QKBgQD2eMGMEAkE7Gv1Q2r4\nAlWygWeWTlJfr1ByM8pkcNeWGvoE5s/8rNwJoP69LOHYA6EUE49jK3JZCW52yhr2\n2lRWm6cCZJO5gbpiq/1MabkdF7jo3dlQwV42D71AFgmaw/sNF2gqZ1YzTtRC8av3\ng0gkYi3n1VXbv3DpYHRkS5Yo9wKBgQDTYqGduG2EBrn1YBLPCRLypbz6m6n0M2jo\n4Jnh6B4SLB1q3lUex7hqC9dTOYpeLfoUE7QIQrIp+UyTIkiLovA62rLPbkSGfh2J\n6YE8SFZOvs1vieI0iOfAUwZXYfNb9PGO0+6KW4Sfipf9gBNuQWDjGn1oC+2Zikib\nJKrNd12LowKBgFLT8fcnzGAjM4SQy3ndDv+WDUGtwHD3cYlvbiyi31BKcIsFJhA7\n5xY1TGY2lw8I6TDeAenJx/uz97Nj5/vdE0qntFBRjHNi7UgLlGwBe3wTZMidBVLm\nKMryLx9CSKgCBHQ50X+uioFjlGGK5cegDrZraBHo15mplEBZccPiwuuxAoGAYfj5\n3ScIo0OW1tKDhS+4d3w3vZN+Tu+w9RZ8XAcAQP3vWIPZwd1hbM02LJ2jswjuOnXz\nYEzBVND2G8+s/gM0AqMwcxGxcwBq4mu2eWExl2e5wbOPgzfc6ffRHZkJeRprBv7V\nNY07R9KtpVHCL7zfkgLKEvpMUniUNEvnWjmzwq8CgYEAqSWR4Uwrf5FCjgZsZVX1\nCQPrK0JpzbEx6kigSMVybBZKWJdEfkHWQOEcVqoJWWXgpqf3sl0c5tzqXH9xN7a4\ntIISJADsSW6IOOM6lRSX7cBIhIkV+bnWy40M6It+Ie2t5sWeWb2DPlo0+IACkn7u\nUaQY/GTzO4+cB2GBwgHdQEQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-scnap@storage-crowdsourcing.iam.gserviceaccount.com",
    "client_id": "100195601881593511066",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-scnap%40storage-crowdsourcing.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
  storageBucket: "gs://storage-crowdsourcing.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = bucket;
