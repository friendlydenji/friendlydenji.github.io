import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage';
import Landing from './pages/Landing';
import AboutMe from './pages/AboutMe';
import AboutSite from './pages/AboutSite';
import RamblingList from './pages/RamblingList';
import RamblingDetail from './pages/RamblingDetail';
import RamblingEditor from './pages/RamblingEditor';
import { HoverProvider } from './context/HoverContext';
import { ThemeProvider } from './context/ThemeContext';
import HoverOverlay from './components/HoverOverlay';

const ReadingLayout = ({ showFooter = true }: { showFooter?: boolean }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
        {showFooter && <Footer />}
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <HoverProvider>
        <div className="h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col transition-colors duration-300">
          <HoverOverlay />
          <div className="relative z-10 flex-1 flex flex-col min-h-0">
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />

                {/* Home Portal - No Footer */}
                <Route path="/mylibrary" element={<ReadingLayout showFooter={false} />}>
                  <Route index element={<Home />} />
                </Route>

                <Route path="/myreading" element={<ReadingLayout />}>
                  <Route path="books" element={<Books />} />
                  <Route path="manga" element={<CategoryPage title="Manga & Manhwa" collection="manga" />} />
                  <Route path="specialized" element={<CategoryPage title="Specialized Books" collection="specialized" />} />
                  <Route path="books/summary/:id" element={<BookDetail collection="normal_books" />} />
                  <Route path="manga/summary/:id" element={<BookDetail collection="manga" />} />
                  <Route path="specialized/summary/:id" element={<BookDetail collection="specialized" />} />
                  <Route path="about/me" element={<AboutMe />} />
                  <Route path="about/site" element={<AboutSite />} />
                  <Route path="login" element={<Login />} />
                </Route>

                <Route path="/writing" element={<ReadingLayout />}>
                  <Route path="rambling" element={<RamblingList />} />
                  <Route path="rambling/:id" element={<RamblingDetail />} />
                  <Route path="rambling/new" element={<RamblingEditor />} />
                  <Route path="rambling/edit/:id" element={<RamblingEditor />} />
                </Route>

                {/* Legacy redirects */}
                <Route path="/books/summary/:id" element={<Navigate to="/myreading/books/summary/:id" replace />} />
                <Route path="/manga/summary/:id" element={<Navigate to="/myreading/manga/summary/:id" replace />} />
                <Route path="/specialized/summary/:id" element={<Navigate to="/myreading/specialized/summary/:id" replace />} />
                <Route path="/manga" element={<Navigate to="/myreading/manga" replace />} />
                <Route path="/specialized" element={<Navigate to="/myreading/specialized" replace />} />
              </Routes>
            </Router>
          </div>
        </div>
      </HoverProvider>
    </ThemeProvider>
  );
}

export default App;