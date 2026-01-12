const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure Multer to store files in memory (RAM) first.
// This allows us to inspect the file buffer (Magic Bytes) BEFORE saving it to disk.
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));

// Dictionary mapping Hex Signatures (Magic Numbers) to their file extensions.
const ALLOWED_SIGNATURES = {
    'ffd8ff': 'jpg',       
    '89504e47': 'png',     
    '25504446': 'pdf',     
    '47494638': 'gif',     
    '49492a00': 'tiff',    
    '4d4d002a': 'tiff',    
    '424d': 'bmp',         
    '504b0304': 'zip'      
};

// Function to validate file type based on binary content (Magic Bytes), not extension.
function checkMagicBytes(buffer) {
    if (!buffer || buffer.length < 4) return false;

    const hex = buffer.toString('hex').toLowerCase();

    // Check if the file's hex start matches any signature in our allowed list
    for (const [signature, extension] of Object.entries(ALLOWED_SIGNATURES)) {
        if (hex.startsWith(signature)) {
            return extension;
        }
    }
    return false;
}

// Route to handle file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');

        // SECURITY STEP 1: Validate the content using Magic Bytes
        const fileType = checkMagicBytes(req.file.buffer);

        if (!fileType) {
            // If bytes don't match allowed types, reject immediately.
            return res.status(415).send('Error: Invalid file type.');
        }

        // SECURITY STEP 2: Generate a safe, unique filename.
        // Never use req.file.originalname to prevent directory traversal attacks.
        const uniqueName = `file-${Date.now()}.${fileType}`;
        const savePath = path.join(__dirname, 'uploads', uniqueName);

        // Write the validated buffer to the disk
        fs.writeFile(savePath, req.file.buffer, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error saving file.');
            }
            res.send(`File uploaded successfully as: ${uniqueName}`);
        });

    } catch (error) {
        res.status(500).send('Something went wrong.');
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;