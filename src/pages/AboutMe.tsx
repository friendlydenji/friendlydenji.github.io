import React from 'react';
import { User, Mail, Github, Book } from 'lucide-react';

const AboutMe: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <div className="w-24 h-24 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-blue-500/20">
                    <User className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">About Me</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Reading Collector & Web Architect</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold italic underline decoration-blue-600 decoration-4 underline-offset-4">Who am I?</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        Hi, I'm a book lover and tech enthusiast. This project was created to store the essence of the books I've read, helping me (and perhaps you) systematize knowledge more effectively.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        I believe in the power of "Notetaking for Understanding". Every book is not just pages of paper, but a different life experience.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <a href="https://github.com/friendlydenji" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 transition-colors font-bold text-sm">
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                        <a href="mailto:contact@example.com" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-sm">
                            <Mail className="w-4 h-4" /> Contact
                        </a>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                        <Book className="w-4 h-4" /> Reading Stats
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold uppercase mb-2">
                                <span>2024 Goal</span>
                                <span>12/20 Books</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[60%]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                                <div className="text-2xl font-black">42</div>
                                <div className="text-[10px] font-bold uppercase text-gray-400">Total Books</div>
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                                <div className="text-2xl font-black">8</div>
                                <div className="text-[10px] font-bold uppercase text-gray-400">Manga series</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
