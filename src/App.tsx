import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage';
import Landing from './pages/Landing';
import AboutMe from './pages/AboutMe';
import AboutSite from './pages/AboutSite';
import './styles/main.css';

const ReadingLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="py-12 border-t border-gray-100 dark:border-gray-800 text-center text-[var(--text-secondary)] text-sm">
        &copy; {new Date().getFullYear()} Mike Book Recap (Inspired by minh.la & khoa.day).
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/myreading" element={<ReadingLayout />}>
          <Route index element={<Home />} />
          <Route path="manga" element={<CategoryPage title="Manga & Manhwa" collection="manga" />} />
          <Route path="specialized" element={<CategoryPage title="Specialized Books" collection="specialized" />} />
          <Route path="summary/:id" element={<BookDetail collection="normal_books" />} />
          <Route path="manga/summary/:id" element={<BookDetail collection="manga" />} />
          <Route path="specialized/summary/:id" element={<BookDetail collection="specialized" />} />
          <Route path="about/me" element={<AboutMe />} />
          <Route path="about/site" element={<AboutSite />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Legacy redirects */}
        <Route path="/summary/:id" element={<Navigate to="/myreading/summary/:id" replace />} />
        <Route path="/manga/summary/:id" element={<Navigate to="/myreading/manga/summary/:id" replace />} />
        <Route path="/specialized/summary/:id" element={<Navigate to="/myreading/specialized/summary/:id" replace />} />
        <Route path="/manga" element={<Navigate to="/myreading/manga" replace />} />
        <Route path="/specialized" element={<Navigate to="/myreading/specialized" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
