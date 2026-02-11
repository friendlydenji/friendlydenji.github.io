import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const BOOKS_PATH = path.join(process.cwd(), 'src/data/books.json');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('📚 Add a new Book Recap\n');

    const title = await question('Book Title: ');
    const id = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    const author = await question('Author: ');
    const coverImage = await question('Cover Image URL: ');
    const category = await question('Category: ');

    let status = '';
    while (!['read', 'reading', 'wanna-read'].includes(status)) {
        status = (await question('Status (read/reading/wanna-read): ')).toLowerCase();
    }

    let type = '';
    while (!['fiction', 'non-fiction'].includes(type)) {
        type = (await question('Type (fiction/non-fiction): ')).toLowerCase();
    }

    const tagsInput = await question('Tags (comma separated): ');
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

    const summary = await question('Summary (one line or paste blob): ');
    const date = new Date().toISOString().split('T')[0];

    const newBook = {
        id,
        title,
        author,
        coverImage,
        category,
        status,
        type,
        tags,
        summary,
        date
    };

    const data = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf-8'));
    data.push(newBook);
    fs.writeFileSync(BOOKS_PATH, JSON.stringify(data, null, 2));

    console.log(`\n✅ Success! "${title}" added to books.json.`);
    rl.close();
}

main().catch(console.error);
