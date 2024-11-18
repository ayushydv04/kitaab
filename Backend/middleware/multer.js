import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
import fs from "fs";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Set the destination folder
        callback(null, uploadDir);
    },
    filename: function (req, file, callback) {
        // Use original filename or modify as needed
        callback(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

export default upload;
