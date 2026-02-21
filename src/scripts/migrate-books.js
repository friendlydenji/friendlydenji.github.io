import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const BOOKS_DIR = path.resolve(DATA_DIR, 'books');

if (!fs.existsSync(BOOKS_DIR)) {
    fs.mkdirSync(BOOKS_DIR, { recursive: true });
}

const collections = ['normal_books.json', 'manga.json', 'specialized.json'];

// Fields that should be moved to individual files
const DETAIL_FIELDS = ['summary', 'chapters', 'authorBio', 'ambientMedia'];

collections.forEach(fileName => {
    const filePath = path.resolve(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${fileName} (not found)`);
        return;
    }

    const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const liteBooks = [];

    books.forEach(book => {
        const bookId = String(book.id);
        const detailFilePath = path.resolve(BOOKS_DIR, `${bookId}.json`);

        // Create individual book file with full data
        fs.writeFileSync(detailFilePath, JSON.stringify(book, null, 2));
        console.log(`Exported book ${bookId} to ${detailFilePath}`);

        // Create lite version of the book
        const liteBook = { ...book };
        DETAIL_FIELDS.forEach(field => {
            delete liteBook[field];
        });
        liteBooks.push(liteBook);
    });

    // Save the lite version back to the collection file
    fs.writeFileSync(filePath, JSON.stringify(liteBooks, null, 2));
    console.log(`Updated ${fileName} with lite versions of ${books.length} books.`);
});

console.log('Migration complete!');
