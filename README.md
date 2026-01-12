# 🛡️ Secure File Upload System

A robust Node.js application demonstrating secure file handling practices. This project prevents common security vulnerabilities (like malicious script execution) by validating files at the binary level ("Magic Bytes") rather than relying on easily spoofed file extensions.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Security](https://img.shields.io/badge/Security-High-blue)

## 🚀 Key Features

* **Magic Byte Validation:** Verifies file types by reading the raw hexadecimal signature (Magic Numbers) of the file buffer.
* **Extension Agnostic:** Rejects malicious files (e.g., a `.exe` renamed to `.jpg`).
* **Safe Storage:** Files are stored outside the public web root to prevent direct execution via URL.
* **Sanitized Filenames:** Original filenames are discarded and replaced with unique timestamps/IDs to prevent Directory Traversal attacks.
* **Memory Storage:** Uses RAM buffering to validate files *before* they ever touch the disk.
* **Modern UI:** Drag-and-drop interface with real-time feedback and Glassmorphism design.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Middleware:** Multer (Memory Storage engine)
* **Frontend:** HTML5, CSS3 (Flexbox/Glassmorphism), Vanilla JavaScript (Fetch API)

## 📂 Project Structure

```text
secure-upload-project/
├── uploads/            # Secure storage (Outside public root)
├── public/             # Publicly accessible assets
│   └── index.html      # Drag-and-drop Frontend interface
├── server.js           # Main application logic & Security checks
├── package.json        # Dependencies
└── README.md           # Project Documentation
```

## ▶️ Run locally

1) Install dependencies:

```bash
npm install
```

2) Start the server:

```bash
npm start
# then open http://localhost:3000 in your browser
```

Notes:

- The app listens on port `3000` by default (see `server.js`).
- If you'd like to add environment configuration later, consider creating a `.env.example` to document required variables without committing secrets.
