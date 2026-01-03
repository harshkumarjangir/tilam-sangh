import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source: frontend tenders folder
const sourceDir = path.join(__dirname, '../../tilam-sangh/public/assets/tenders');

// Destination: backend uploads folder
const destDir = path.join(__dirname, '../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

console.log('📁 Copying tender PDFs...');
console.log('Source:', sourceDir);
console.log('Destination:', destDir);
console.log('');

try {
    // Read all files from source directory
    const files = fs.readdirSync(sourceDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    console.log(`Found ${pdfFiles.length} PDF files`);
    console.log('');

    let copied = 0;
    let skipped = 0;

    pdfFiles.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        // Check if file already exists in destination
        if (fs.existsSync(destPath)) {
            console.log(`⏭️  Skipped (already exists): ${file}`);
            skipped++;
        } else {
            // Copy file
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ Copied: ${file}`);
            copied++;
        }
    });

    console.log('');
    console.log('📊 Summary:');
    console.log(`✅ Copied: ${copied} files`);
    console.log(`⏭️  Skipped: ${skipped} files`);
    console.log(`📁 Total: ${pdfFiles.length} files`);
    console.log('');
    console.log('🎉 Done! All tender PDFs are now in the uploads folder.');
    console.log(`Access them at: http://localhost:5000/uploads/filename.pdf`);

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
