import React from 'react';
import { Cpu, Zap, Shield, Database, Layout, Globe, Bot } from 'lucide-react';

const AboutSite: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 italic text-blue-600">
                    Site Engineering
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg">
                    A look into the architecture and technologies driving Mike Reading.
                </p>
            </div>

            {/* AI Generation Highlight */}
            <div className="mb-16 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Bot className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Bot className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest opacity-80">Autonomous Development</span>
                    </div>
                    <h2 className="text-3xl font-black mb-4 uppercase leading-none">Built by AI</h2>
                    <p className="text-lg opacity-90 leading-relaxed font-medium">
                        This entire platform was autonomously architected, coded, and optimized by an AI Coding Agent. The design, routing, and component logic were synthesized from scratch to meet the specific needs of this reading journal.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                    { icon: Zap, title: "Pure Performance", desc: "Built as a high-performance static application, ensuring near-instant load times." },
                    { icon: Shield, title: "Static Security", desc: "A serverless architecture that inherently minimizes common web vulnerabilities." },
                    { icon: Database, title: "Structured Data", desc: "Leverages JSON-based data management for clean, portable, and version-controlled content." }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm group hover:border-blue-600 transition-colors">
                        <item.icon className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold mb-2 uppercase text-xs tracking-widest">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-12 leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                <section>
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-6 text-black dark:text-white uppercase tracking-tighter italic">
                        <Cpu className="w-6 h-6 text-blue-600" /> Core Stack
                    </h2>
                    <p className="mb-4">
                        The application is powered by <strong className="text-black dark:text-white font-bold">React</strong> and <strong className="text-black dark:text-white font-bold">Vite</strong>, providing a modern and robust environment for development and production. Every component is custom-built to ensure maximum efficiency.
                    </p>
                    <p>
                        Styling is managed through <strong className="text-black dark:text-white font-bold">Tailwind CSS</strong>, utilizing a utility-first approach to create a cohesive and responsive design system without the overhead of unused styles.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-6 text-black dark:text-white uppercase tracking-tighter italic">
                        <Globe className="w-6 h-6 text-blue-600" /> Global Delivery
                    </h2>
                    <p>
                        The site is served via <strong className="text-black dark:text-white font-bold">GitHub Pages</strong>, taking advantage of a global Content Delivery Network (CDN). This ensures that the content is delivered with high availability and low latency regardless of the visitor's location.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-6 text-black dark:text-white uppercase tracking-tighter italic">
                        <Layout className="w-6 h-6 text-blue-600" /> Design Philosophy
                    </h2>
                    <p className="opacity-90">
                        The core philosophy is simplicity and purpose. Every line of code exists to enhance the user experience. By focusing on essential functionality, the system maintains a clean aesthetic and exceptional responsiveness across all devices.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutSite;
