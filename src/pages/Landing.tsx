import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing/style.css';

const Typewriter = ({ words, wait = 3000 }: { words: string[], wait?: number }) => {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];



        // Custom logic to match original slightly complex timing
        let timer: any;
        if (!isDeleting && text === currentWord) {
            // Pause at end of word
            if ((wordIndex % words.length) === words.length - 1) {
                // Stop
                const cursor = document.querySelector('.cursor') as HTMLElement;
                if (cursor) cursor.style.display = 'none';
                return;
            }
            timer = setTimeout(() => setIsDeleting(true), wait);
        } else if (isDeleting && text === '') {
            // Pause before next word
            setIsDeleting(false);
            setWordIndex(prev => prev + 1);
        } else {
            timer = setTimeout(() => {
                if (isDeleting) {
                    setText(currentWord.substring(0, text.length - 1));
                } else {
                    setText(currentWord.substring(0, text.length + 1));
                }
            }, isDeleting ? 50 : 100);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, wait]);

    return <span id="typewriter" className="typewriter-text">{text}</span>;
};

const Landing = () => {
    const projectsGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.classList.add('landing-body');
        return () => {
            document.body.classList.remove('landing-body');
        };
    }, []);

    // Scroll Logic for Projects
    const scrollProjects = (direction: 'left' | 'right') => {
        const grid = projectsGridRef.current;
        if (!grid) return;

        if (direction === 'right') {
            if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: grid.clientWidth, behavior: 'smooth' });
            }
        } else {
            if (grid.scrollLeft <= 10) {
                grid.scrollTo({ left: grid.scrollWidth, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: -grid.clientWidth, behavior: 'smooth' });
            }
        }
    };

    // Scroll Spy for Pagination
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.findIndex(el => el === entry.target);
                    if (index !== -1) setActiveSection(index);
                }
            });
        }, {
            threshold: 0.5
        });

        sectionRefs.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (index: number) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="wrapper">
            <div className="landing-main main"> {/* Added landing-main for uniqueness if needed, main kept for css */}
                {/* PAGE 1: INTRODUCTION */}
                <section className="page-intro" ref={el => sectionRefs.current[0] = el}>
                    <div className="page_container">
                        <div className="hero-content fade-in">
                            <h1 className="greeting">Hi, I'm <span className="highlight">Ta Dien Minh Tri</span></h1>
                            <h2 className="typewriter-container">
                                <span className="typewriter-prefix">I am </span>
                                <Typewriter words={["Spider Man", "Denji", "a Software Engineer"]} />
                                <span className="cursor">|</span>
                            </h2>
                            <p className="hero-description">A logical guy with an artistic soul</p>
                            <div className="social-links">
                                <a href="https://vn.linkedin.com/in/tadienminhtri" target="_blank" className="social-icon" aria-label="LinkedIn">
                                    <i className="fa fa-linkedin"></i>
                                </a>
                                <a href="https://github.com/tritdm" target="_blank" className="social-icon" aria-label="GitHub">
                                    <i className="fa fa-github"></i>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100016256626246" target="_blank" className="social-icon" aria-label="Facebook">
                                    <i className="fa fa-facebook"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAGE 2: EXPERIENCE + SKILLS */}
                <section className="page-experience-skills" ref={el => sectionRefs.current[1] = el}>
                    <div className="page_container">
                        <h2 className="section-title">Experience & Expertise</h2>
                        <div className="experience-skills-layout">
                            {/* Left: Experience Timeline */}
                            <div className="experience-section">
                                <h3 className="subsection-title">Professional Journey</h3>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-badge active">Current</span>
                                            <h4>Firmware R&D Engineer</h4>
                                            <p className="timeline-meta">2023 - Present</p>
                                            <p className="timeline-description">Specializing in firmware development and system optimization for embedded devices.</p>
                                        </div>
                                    </div>
                                    {/* Add more timeline items as needed */}
                                </div>
                            </div>

                            {/* Right: Skills */}
                            <div className="skills-section">
                                <h3 className="subsection-title">Technical Skills</h3>
                                <div className="skills-container">
                                    <div className="skill-category">
                                        <h4>Languages</h4>
                                        <div className="skill-tags">
                                            <span className="skill-tag">C/C++</span>
                                            <span className="skill-tag">Python</span>
                                            <span className="skill-tag">JavaScript</span>
                                            <span className="skill-tag">TypeScript</span>
                                        </div>
                                    </div>
                                    <div className="skill-category">
                                        <h4>Frameworks & Tools</h4>
                                        <div className="skill-tags">
                                            <span className="skill-tag">React</span>
                                            <span className="skill-tag">Node.js</span>
                                            <span className="skill-tag">Embedded Systems</span>
                                            <span className="skill-tag">Git</span>
                                        </div>
                                    </div>
                                    <div className="skill-category">
                                        <h4>Specializations</h4>
                                        <div className="skill-tags">
                                            <span className="skill-tag">Firmware Development</span>
                                            <span className="skill-tag">System Architecture</span>
                                            <span className="skill-tag">Performance Optimization</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAGE 3: PROJECTS & OTHER */}
                <section className="page-projects" ref={el => sectionRefs.current[2] = el}>
                    <div className="page_container">
                        <h2 className="section-title">Pet Projects & Interests</h2>

                        <div className="projects-grid" ref={projectsGridRef}>
                            <div className="project-card">
                                <div className="project-icon">📚</div>
                                <h3>Reading</h3>
                                <p>I have never read a book (of course, except for textbooks and manga) until I was 23 years old. Thanks to my senior colleague at my first company, I started reading books by buying an e-reader. And I want to share my reading progress with you.</p>
                                <div className="project-tags"></div>
                                <Link to="/myreading" className="project-link">
                                    View my reading <i className="fa fa-external-link"></i>
                                </Link>
                            </div>

                            <div className="project-card">
                                <div className="project-icon">🎲</div>
                                <h3>Board game</h3>
                                <p>I had played multiple pc games but they make me toxic. So I started playing board games with my friends instead. And I want to make a board games platform for my friends to play together.</p>
                                <div className="project-tags"></div>
                                <a href="https://github.com/tritdm" target="_blank" className="project-link">
                                    View GitHub <i className="fa fa-external-link"></i>
                                </a>
                            </div>

                            <div className="project-card">
                                <div className="project-icon">🎯</div>
                                <h3>Financial management</h3>
                                <p>I don't know why my money always runs out =)). If you have the same problem with me, you can try my financial management app.</p>
                                <div className="project-tags"></div>
                                <a href="https://github.com/friendlydenji/finmng" target="_blank" className="project-link">
                                    View GitHub <i className="fa fa-external-link"></i>
                                </a>
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="carousel-nav">
                            <button className="nav-btn prev-btn" aria-label="Previous Project" onClick={() => scrollProjects('left')}>
                                <i className="fa fa-chevron-left"></i>
                            </button>
                            <button className="nav-btn next-btn" aria-label="Next Project" onClick={() => scrollProjects('right')}>
                                <i className="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Pagination Dots (Manual) */}
            <ul className="onepage-pagination">
                <li><a className={activeSection === 0 ? 'active' : ''} onClick={() => scrollToSection(0)}></a></li>
                <li><a className={activeSection === 1 ? 'active' : ''} onClick={() => scrollToSection(1)}></a></li>
                <li><a className={activeSection === 2 ? 'active' : ''} onClick={() => scrollToSection(2)}></a></li>
            </ul>
        </div>
    );
};

export default Landing;
