import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Edit3 } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { marked } from 'marked';

interface ArticleDetail {
    id: string;
    title: string;
    summary: string;
    content: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

const RamblingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<ArticleDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(localStorage.getItem('user_role') === 'admin');
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        if (!id) return;
        try {
            const response = await fetch(`/src/data/rambling/${id}.json`);
            if (!response.ok) throw new Error('Article not found');
            const data = await response.json();
            setArticle(data);
        } catch (error) {
            console.error('Failed to fetch article:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (!article) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4 italic text-gray-400">Article not found.</h2>
                <Link to="/writing/rambling" className="text-blue-600 hover:underline font-bold">Go back to Rambling</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white dark:bg-[#0f172a] pb-32">
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <Link
                    to="/writing/rambling"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Rambling
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-6">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{new Date(article.updatedAt || article.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {isAdmin && (
                            <Link
                                to={`/writing/rambling/edit/${article.id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors font-black uppercase text-[10px] tracking-widest"
                            >
                                <Edit3 className="w-3.5 h-3.5" /> Edit Article
                            </Link>
                        )}
                    </div>
                </header>

                {article.thumbnail && (
                    <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                        <img src={article.thumbnail} alt={article.title} className="w-full h-auto" />
                    </div>
                )}

                <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.8] prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:px-8 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic"
                    dangerouslySetInnerHTML={{ __html: marked.parse(article.content || '') as string }}
                />
            </div>
        </article>
    );
};

export default RamblingDetail;
