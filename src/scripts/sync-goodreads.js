import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
    customFields: {
        item: [
            'book_id',
            'book_image_url',
            'author_name',
            'book_description',
            'user_shelves',
            'user_read_at',
            'user_date_added',
            'user_rating',
            'average_rating'
        ]
    }
});

const USER_ID = '183266525';
const DATA_DIR = path.join(__dirname, '../data');

const PATH_MAP = {
    'normal': path.join(DATA_DIR, 'normal_books.json'),
    'specialized': path.join(DATA_DIR, 'specialized.json'),
    'challenges': path.join(DATA_DIR, 'challenges.json')
};

// Helper to get high-res image from Goodreads or Amazon CDN
function getHighResImage(url) {
    if (!url) return '';

    // Convert standard Goodreads low-res to high-res
    // Remove resizing suffixes (SY, SX, SH, SL) to get the original/large version
    let highRes = url.replace(/\._S[YXHL]\d+_/, '');

    // Pattern mapping for Amazon CDN (found in many Goodreads URLs)
    // Use the mirrored version on Amazon to avoid potential SSL issues with gr-assets
    // and to align with the m.media-amazon.com domain
    if (highRes.includes('i.gr-assets.com')) {
        highRes = highRes.replace('i.gr-assets.com', 'm.media-amazon.com');
    } else if (highRes.includes('s.gr-assets.com')) {
        highRes = highRes.replace('s.gr-assets.com', 'm.media-amazon.com');
    }

    return highRes;
}

/**
 * Syncs a specific shelf to a target JSON file
 * @param {string} shelf - Goodreads shelf name
 * @param {string} targetKey - Key in PATH_MAP
 */
async function syncShelf(shelf, targetKey = 'normal') {
    console.log(`Syncing shelf: ${shelf} -> ${targetKey}...`);
    const path = PATH_MAP[targetKey];
    const url = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}`;

    try {
        const feed = await parser.parseURL(url);

        // Ensure file exists and has valid JSON
        let existingBooks = [];
        if (fs.existsSync(path)) {
            try {
                const content = fs.readFileSync(path, 'utf-8');
                existingBooks = content.trim() ? JSON.parse(content) : [];
            } catch (e) {
                console.warn(`- Pre-initializing ${targetKey} due to invalid JSON`);
                existingBooks = [];
            }
        }

        feed.items.forEach(item => {
            const id = item.book_id || item.guid.split('/').pop();
            const existingIndex = existingBooks.findIndex(b => b.id === id || b.title === item.title);

            const rawImage = item.book_image_url || '';
            const highResImage = getHighResImage(rawImage);

            const isSpecialized = item.user_shelves?.includes('specialized');

            // Route books based on tags
            if (targetKey === 'normal' && isSpecialized) {
                console.log(`- Skipping ${item.title} (tagged as specialized)`);
                return;
            }

            const bookData = {
                id: id,
                title: item.title,
                author: item.author_name || 'Unknown',
                coverImage: highResImage,
                category: shelf === 'read' ? 'Finished' : (shelf === 'currently-reading' ? 'Reading' : 'Wanna Read'),
                status: shelf === 'currently-reading' ? 'reading' : (shelf === 'read' ? 'read' : 'wanna-read'),
                type: (item.user_shelves?.includes('detective-novels') || item.user_shelves?.includes('other-novels')) ? 'fiction' : 'non-fiction',
                tags: item.user_shelves ? item.user_shelves.split(',').map(s => s.trim()) : [],
                userRating: item.user_rating ? parseFloat(item.user_rating) : 0,
                averageRating: item.average_rating ? parseFloat(item.average_rating) : 0,
                summary: item.book_description || '',
                date: item.user_read_at || item.user_date_added || new Date().toISOString().split('T')[0],
                readAt: item.user_read_at || null
            };

            if (existingIndex > -1) {
                // Update core fields but preserve manual summary if already exists
                const currentBook = existingBooks[existingIndex];
                existingBooks[existingIndex] = {
                    ...currentBook,
                    ...bookData,
                    summary: currentBook.summary && currentBook.summary.length > 500 ? currentBook.summary : bookData.summary
                };
            } else {
                existingBooks.push(bookData);
            }
        });

        fs.writeFileSync(path, JSON.stringify(existingBooks, null, 2));
        console.log(`✅ Shelf ${shelf} synced to ${targetKey} successfully.`);
    } catch (error) {
        console.error(`❌ Error syncing shelf ${shelf}:`, error.message);
    }
}

async function main() {
    // Sync Normal Books
    await syncShelf('currently-reading', 'normal');
    await syncShelf('read', 'normal');
    await syncShelf('to-read', 'normal');

    // Sync Specialized from Goodreads (using 'specialized' shelf/tag)
    await syncShelf('specialized', 'specialized');

    console.log('🚀 Global sync completed.');
}

main();
