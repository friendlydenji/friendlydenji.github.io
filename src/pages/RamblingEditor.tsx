import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MarkdownEditor from '../components/ui/MarkdownEditor';

interface ArticleData {
    id: string;
    title: string;
    summary: string;
    content: string;
    thumbnail?: string;
    createdAt?: string;
    updatedAt?: string;
}

const RamblingEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<ArticleData>({
        id: id || `post-${Date.now()}`,
        title: '',
        summary: '',
        content: '',
        thumbnail: ''
    });

    const fetchArticle = React.useCallback(async () => {
        try {
            const response = await fetch(`/src/data/rambling/${id}.json`);
            if (!response.ok) throw new Error('Article not found');
            const articleData = await response.json();
            setData(articleData);
        } catch (error) {
            console.error('Failed to fetch article:', error);
            alert('Cần có file JSON trong data/rambling để edit.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (localStorage.getItem('user_role') !== 'admin') {
            navigate('/writing/rambling');
            return;
        }

        if (isEditing) {
            fetchArticle();
        }
    }, [isEditing, navigate, fetchArticle]);

    const handleSave = async () => {
        if (!data.title.trim() || !data.content.trim()) {
            alert('Title and Content are required!');
            return;
        }

        setSaving(true);
        const now = new Date().toISOString();
        const payload = {
            ...data,
            createdAt: data.createdAt || now,
            updatedAt: now
        };

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/save-rambling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Token': token || '',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                navigate(`/writing/rambling/${payload.id}`);
            } else {
                throw new Error(result.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Failed to save article.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pb-32">
            <div className="max-w-4xl mx-auto px-6 pt-12">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to={isEditing ? `/writing/rambling/${id}` : "/writing/rambling"}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" /> Cancel
                    </Link>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
                    >
                        {saving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Save className="w-4 h-4" />}
                        {isEditing ? 'Save Changes' : 'Publish Article'}
                    </button>
                </div>

                <div className="bg-[var(--bg-primary)] rounded-3xl border border-gray-100 dark:border-white/10 p-8 md:p-12 shadow-sm">
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                placeholder="Enter an eye-catching title..."
                                className="w-full text-3xl font-black bg-transparent border-b-2 border-gray-100 dark:border-gray-800 focus:border-blue-600 outline-none pb-4 text-gray-900 dark:text-white transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Thumbnail URL</label>
                                <div className="relative group aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                    {data.thumbnail ? (
                                        <img src={data.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-gray-300" />
                                    )}
                                    <input
                                        type="text"
                                        value={data.thumbnail || ''}
                                        onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
                                        placeholder="URL..."
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Summary</label>
                                <textarea
                                    value={data.summary}
                                    onChange={(e) => setData({ ...data, summary: e.target.value })}
                                    placeholder="Briefly describe what this article is about..."
                                    className="w-full h-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 focus:border-blue-500 outline-none text-gray-700 dark:text-gray-300 text-sm resize-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Content (Markdown)</label>
                            <MarkdownEditor
                                value={data.content}
                                onChange={(val) => setData({ ...data, content: val })}
                                placeholder="Write your thoughts here..."
                                className="min-h-[500px] w-full bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 focus-within:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RamblingEditor;
