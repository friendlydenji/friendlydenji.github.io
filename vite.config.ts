import { defineConfig, Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { IncomingMessage, ServerResponse } from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CMS Helper Functions
const DETAIL_FIELDS = ['summary', 'chapters', 'authorBio'];

const getCollectionFilename = (collection: string) => {
  if (collection === 'manga') return 'manga.json';
  if (collection === 'specialized') return 'specialized.json';
  return 'normal_books.json';
};

const saveBook = (body: string, res: ServerResponse) => {
  try {
    const { collection, ...updatedBook } = JSON.parse(body);
    const fileName = getCollectionFilename(collection);

    const mainFilePath = path.resolve(__dirname, `src/data/${fileName}`);
    const detailFilePath = path.resolve(__dirname, `src/data/books/${updatedBook.id}.json`);

    // 1. Save Full Version to individual file
    fs.writeFileSync(detailFilePath, JSON.stringify(updatedBook, null, 2));

    // 2. Save Lite Version to main collection
    if (!fs.existsSync(mainFilePath)) {
      fs.writeFileSync(mainFilePath, JSON.stringify([], null, 2));
    }

    const books = JSON.parse(fs.readFileSync(mainFilePath, 'utf-8'));
    const liteBook = { ...updatedBook };
    DETAIL_FIELDS.forEach(field => delete liteBook[field]);

    const index = books.findIndex((b: { id: string }) => String(b.id) === String(updatedBook.id));

    if (index !== -1) {
      books[index] = { ...books[index], ...liteBook };
    } else {
      books.push(liteBook);
    }

    fs.writeFileSync(mainFilePath, JSON.stringify(books, null, 2));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
  } catch (e: unknown) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: e instanceof Error ? e.message : 'Unknown error' }));
  }
};

const handleLogin = (body: string, res: ServerResponse) => {
  try {
    const { username, password } = JSON.parse(body);
    const usersPath = path.resolve(__dirname, 'src/data/users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    const user = users.find((u: { username: string; password?: string }) => u.username === username && u.password === password) as { username: string; role: string } | undefined;

    if (user) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        user: { username: user.username, role: user.role },
        token: `user:${user.username}|role:${user.role}`
      }));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
    }
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false }));
  }
};

const handleRegister = (body: string, res: ServerResponse) => {
  try {
    const { username, password } = JSON.parse(body);
    const usersPath = path.resolve(__dirname, 'src/data/users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    if (users.find((u: { username: string }) => u.username === username)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, error: 'User already exists' }));
      return;
    }

    const newUser = { username, password, role: 'user' };
    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      user: { username: newUser.username, role: newUser.role },
      token: `user:${newUser.username}|role:${newUser.role}`
    }));
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false }));
  }
};

const saveRambling = (body: string, res: ServerResponse) => {
  try {
    const updatedArticle = JSON.parse(body);
    const listFilePath = path.resolve(__dirname, 'src/data/rambling.json');
    const detailFilePath = path.resolve(__dirname, `src/data/rambling/${updatedArticle.id}.json`);

    // 1. Save Full Version to individual file
    fs.writeFileSync(detailFilePath, JSON.stringify(updatedArticle, null, 2));

    // 2. Save Lite Version to main list
    if (!fs.existsSync(listFilePath)) {
      fs.writeFileSync(listFilePath, JSON.stringify([], null, 2));
    }

    const articles = JSON.parse(fs.readFileSync(listFilePath, 'utf-8'));
    const liteArticle = { ...updatedArticle };
    delete liteArticle.content;

    const index = articles.findIndex((a: { id: string }) => String(a.id) === String(updatedArticle.id));

    if (index !== -1) {
      articles[index] = { ...articles[index], ...liteArticle };
    } else {
      articles.unshift(liteArticle); // Add to the top
    }

    fs.writeFileSync(listFilePath, JSON.stringify(articles, null, 2));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
  } catch (e: unknown) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: e instanceof Error ? e.message : 'Unknown error' }));
  }
};

// Custom plugin to handle local file operations for books and users
const localCmsPlugin = (): Plugin => ({
  name: 'local-cms-plugin',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
      let body = '';
      req.on('data', (chunk: Buffer) => body += chunk.toString());

      req.on('end', () => {
        const url = req.url;
        const method = req.method;

        // 1. SAVE BOOK
        if (method === 'POST' && url === '/api/save-book') {
          const token = req.headers['x-admin-token'] as string | undefined;
          if (!token || !token.includes('role:admin')) {
            res.statusCode = 403;
            res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
            return;
          }
          saveBook(body, res);
        }

        // 2. SAVE RAMBLING
        else if (method === 'POST' && url === '/api/save-rambling') {
          const token = req.headers['x-admin-token'] as string | undefined;
          if (!token || !token.includes('role:admin')) {
            res.statusCode = 403;
            res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
            return;
          }
          saveRambling(body, res);
        }

        // 2. LOGIN (Wait, this should be 3...)
        else if (method === 'POST' && url === '/api/login') {
          handleLogin(body, res);
        }

        // 3. REGISTER
        else if (method === 'POST' && url === '/api/register') {
          handleRegister(body, res);
        }

        else {
          next();
        }
      });
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localCmsPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
})
