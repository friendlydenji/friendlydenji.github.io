import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Article {
    id: string;
    title: string;
    summary: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

const RamblingList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('user_role') === 'admin');
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch('/src/data/rambling.json');
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter">Tản mạn</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Nơi mình viết mấy cái xàm xàm mình ngẫu hứng nghĩ ra và muốn viết lại.</p>
                    </div>
                    {isAdmin && (
                        <Link
                            to="/writing/rambling/new"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                        >
                            <Plus className="w-4 h-4" /> New Post
                        </Link>
                    )}
                </div>

                <div className="space-y-8">
                    {articles.length === 0 ? (
                        <div className="text-center py-20 bg-[var(--bg-primary)] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                            <p className="text-gray-400 font-bold italic">No posts yet. Stay tuned!</p>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/writing/rambling/${article.id}`}
                                className="group block bg-[var(--bg-primary)] rounded-3xl border border-gray-100 dark:border-white/5 p-6 md:p-8 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/10 transition-all"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner">
                                        {article.thumbnail ? (
                                            <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                                <Plus className="w-8 h-8 opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-between py-1">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                                {article.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-3 text-sm leading-relaxed mb-4">
                                                {article.summary}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                {new Date(article.updatedAt || article.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                                Read Article <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RamblingList;
