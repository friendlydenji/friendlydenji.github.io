// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Custom plugin to handle local file operations for books and users
const localCmsPlugin = () => ({
  name: 'local-cms-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      let body = '';
      req.on('data', chunk => body += chunk.toString());

      req.on('end', () => {
        const url = req.url;
        const method = req.method;

        // 1. SAVE BOOK
        if (method === 'POST' && url === '/api/save-book') {
          const token = req.headers['x-admin-token'];
          // Simple validation: must be 'admin' in local storage format
          if (!token || !token.includes('role:admin')) {
            res.statusCode = 403;
            res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
            return;
          }

          try {
            const bodyData = JSON.parse(body);
            const { collection, ...updatedBook } = bodyData;

            // Map collection to filename
            const fileName = collection === 'manga' ? 'manga.json'
              : collection === 'specialized' ? 'specialized.json'
                : 'normal_books.json';

            const filePath = path.resolve(__dirname, `src/data/${fileName}`);

            // Ensure file exists
            if (!fs.existsSync(filePath)) {
              fs.writeFileSync(filePath, JSON.stringify([], null, 2));
            }

            const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const index = books.findIndex(b => b.id === updatedBook.id);

            if (index !== -1) {
              books[index] = { ...books[index], ...updatedBook };
              fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } else {
              // Optionally add new book if it doesn't exist
              books.push(updatedBook);
              fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            }
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        }

        // 2. LOGIN
        else if (method === 'POST' && url === '/api/login') {
          try {
            const { username, password } = JSON.parse(body);
            const usersPath = path.resolve(__dirname, 'src/data/users.json');
            const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
            const user = users.find(u => u.username === username && u.password === password);

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
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false }));
          }
        }

        // 3. REGISTER
        else if (method === 'POST' && url === '/api/register') {
          try {
            const { username, password } = JSON.parse(body);
            const usersPath = path.resolve(__dirname, 'src/data/users.json');
            const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

            if (users.find(u => u.username === username)) {
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
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false }));
          }
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
