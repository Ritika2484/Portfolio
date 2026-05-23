import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import './index.css';
import { WavyBackground } from './components/wavy-background';
import MarqueeDefault from 'react-fast-marquee';
import TiltDefault from 'react-parallax-tilt';
import heroImg from './assets/hero.png';

const Marquee = MarqueeDefault.default || MarqueeDefault;
const Tilt = TiltDefault.default || TiltDefault;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const Typewriter = ({ words, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, delay]);

  return <span>{currentText}</span>;
};

const FadeIn = ({ children, delay = 0, y = 40, duration = 0.8, className = '', style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = '', style = {}, as = 'div' }) => {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

const StaggerChild = ({ children, className = '', style = {}, y = 30, scale = 0.98, as = 'div' }) => {
  const Component = motion[as] || motion.div;
  return (
    <Component
      variants={{
        hidden: { opacity: 0, y, scale },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 18,
            mass: 0.5
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

const StaggerTiltCard = ({ children, className = '', style = {}, y = 30, scale = 0.98 }) => (
  <StaggerChild y={y} scale={scale} style={{ display: 'flex', width: '100%', height: '100%' }}>
    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.05} glareColor="var(--primary-blue)" glarePosition="all" style={{ width: '100%', display: 'flex' }}>
      <div className={`minimal-card ${className}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', ...style }}>
        {children}
      </div>
    </Tilt>
  </StaggerChild>
);

const TiltCard = ({ children, delay = 0, className = '', style = {} }) => (
  <FadeIn delay={delay} style={{ display: 'flex', width: '100%', height: '100%' }}>
    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.05} glareColor="var(--primary-blue)" glarePosition="all" style={{ width: '100%', display: 'flex' }}>
      <div className={`minimal-card ${className}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', ...style }}>
        {children}
      </div>
    </Tilt>
  </FadeIn>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [githubData, setGithubData] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS credentials are still using placeholder or empty values
    if (
      !serviceId || serviceId === 'your_service_id' ||
      !templateId || templateId === 'your_template_id' ||
      !publicKey || publicKey === 'your_public_key'
    ) {
      console.warn("EmailJS credentials are not configured in your .env file.");
      setSubmitStatus('Error: Email service not configured. Please set your credentials in the .env file.');
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Ritika Kaushik'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('EmailJS Success:', response.status, response.text);
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, (err) => {
        console.error('EmailJS Error:', err);
        setSubmitStatus(`Failed to send message: ${err.text || 'Please try again later'}`);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control scrolled styling
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Control show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/Ritika2484');
        setGithubData(response.data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // Fallback data if GitHub API rate limit is exceeded
        setGithubData({
          public_repos: "15+",
          followers: "10+",
          following: "10+",
          html_url: "https://github.com/Ritika2484"
        });
      }
    };
    fetchGithubData();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <CustomCursor />
      {/* Navbar */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-content">
          <motion.a 
            href="#" 
            className="logo" 
            onClick={closeMenu}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            RK
          </motion.a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="nav-underline"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="section section-light" style={{ padding: 0 }}>
          <WavyBackground
            backgroundFill="var(--bg-white)"
            waveOpacity={0.6}
            colors={["#1C76FF", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]}
          >
            <div className="container hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', zIndex: 10 }}>
              <div className="hero-content">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                  className="hero-title"
                >
                  RITIKA<br /><span className="gradient-text">KAUSHIK</span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
                  className="hero-subtitle"
                >
                  <Typewriter words={["Frontend Developer", "Full Stack Developer", "Problem Solver"]} />
                  <span className="cursor">|</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                  className="hero-desc"
                >
                  Passionate about building scalable web applications and delivering high-performance, responsive UI with modern design principles.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
                  className="hero-cta"
                >
                  <a href="#projects" className="btn btn-primary">View Projects</a>
                  <a href="/ritikacv-2.pdf" download className="btn btn-outline"><i className="fas fa-download"></i> Resume</a>
                  <a href="#contact" className="btn btn-outline">Contact Me</a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
                  className="social-links"
                >
                  <a href="https://github.com/Ritika2484" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/ritika-kaushik24/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                </motion.div>
              </div>

              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glarePosition="all" style={{ zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  style={{ position: 'relative', width: '100%', padding: '2rem' }}
                >
                  <div style={{ position: 'absolute', inset: '10%', background: 'var(--primary-blue)', filter: 'blur(80px)', opacity: 0.4, zIndex: -1, borderRadius: '50%' }}></div>
                  <video src="/profile.mp4" autoPlay loop muted playsInline style={{ width: '100%', maxWidth: '450px', height: 'auto', display: 'block', margin: '0 auto', objectFit: 'cover', borderRadius: '40px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)' }} />
                </motion.div>
              </Tilt>
            </div>
          </WavyBackground>
        </section>

        {/* Marquee Divider */}
        <div style={{ background: 'var(--primary-blue)', color: 'var(--bg-white)', padding: '1.5rem 0', transform: 'rotate(-2deg)', margin: '4rem -2rem', width: 'calc(100% + 4rem)', overflow: 'hidden' }}>
          <Marquee speed={80} gradient={false}>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Building The Future</span> •
            <span style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Scalable Modern Web</span> •
            <span style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>AI-Driven Applications</span> •
            <span style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Full Stack Expertise</span> •
            <span style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Creative Interfaces</span> •
          </Marquee>
        </div>

        {/* About Section */}
        <section id="about" className="section section-light">
          <div className="container">
            <FadeIn><h2 className="section-title">ABOUT <span className="gradient-text">ME</span></h2></FadeIn>
            <StaggerContainer className="about-grid">
              <StaggerTiltCard className="about-card">
                <div className="about-icon"><i className="fas fa-user-graduate"></i></div>
                <h3>B.Tech CSE Student</h3>
                <p>Lovely Professional University</p>
                <p className="highlight" style={{ marginTop: '0.5rem' }}>CGPA: 6.89</p>
              </StaggerTiltCard>
              <StaggerTiltCard className="about-card">
                <div className="about-icon"><i className="fas fa-laptop-code"></i></div>
                <h3>Passionate Developer</h3>
                <p>Strong interest in frontend UI development, reactive applications, database management, and building robust backend services. Driven by a problem-solving mindset and continuous learning.</p>
              </StaggerTiltCard>
            </StaggerContainer>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section section-dark">
          <div className="container">
            <FadeIn><h2 className="section-title">MY <span className="gradient-text">SKILLS</span></h2></FadeIn>
            <StaggerContainer className="skills-grid">
              <StaggerTiltCard className="skill-category">
                <h3><i className="fas fa-code"></i> Languages</h3>
                <div className="skill-tags">
                  <span>JavaScript</span><span>Python</span><span>C++</span><span>Java</span><span>PHP</span><span>C</span>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="skill-category">
                <h3><i className="fas fa-layer-group"></i> Frameworks</h3>
                <div className="skill-tags">
                  <span>ReactJS</span><span>NextJs</span><span>NodeJS</span><span>ExpressJS</span><span>Mongoose</span><span>React-Native</span><span>Laravel</span>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="skill-category">
                <h3><i className="fas fa-database"></i> Tools</h3>
                <div className="skill-tags">
                  <span>MongoDB</span><span>MySQL</span><span>PostgreSQL</span><span>Postman</span><span>Git</span><span>AWS</span><span>Dockerization</span><span>Kubernetes</span><span>CI/CD</span>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="skill-category">
                <h3><i className="fas fa-users"></i> Soft Skills</h3>
                <div className="skill-tags">
                  <span>Problem-Solving</span><span>Team Player</span><span>Adaptability</span><span>Leadership</span>
                </div>
              </StaggerTiltCard>
            </StaggerContainer>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section section-light">
          <div className="container">
            <FadeIn><h2 className="section-title">FEATURED <span className="gradient-text">PROJECTS</span></h2></FadeIn>
            <StaggerContainer className="projects-grid">
              <StaggerTiltCard className="project-card alumni-card">
                {/* SVG Network/Community nodes background */}
                <svg className="network-bg-nodes" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="15" cy="25" r="1.2" fill="var(--primary-blue)" />
                  <circle cx="85" cy="15" r="1.8" fill="var(--primary-blue)" />
                  <circle cx="45" cy="75" r="1.2" fill="var(--primary-blue)" />
                  <circle cx="90" cy="85" r="1.5" fill="var(--primary-blue)" />
                  <circle cx="25" cy="60" r="1" fill="var(--primary-blue)" />
                  <line x1="15" y1="25" x2="25" y2="60" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="25" y1="60" x2="45" y2="75" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="85" y1="15" x2="45" y2="75" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="85" y1="15" x2="90" y2="85" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="45" y1="75" x2="90" y2="85" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                </svg>

                <div className="project-tags alumni-tags" style={{ zIndex: 1 }}>
                  <span>ReactJS</span><span>Laravel</span><span>MySQL</span><span>REST API</span><span>JWT Auth</span>
                </div>
                <h3 style={{ zIndex: 1, letterSpacing: '-0.02em', fontWeight: '800' }}>Alumni Networking Platform</h3>
                <p style={{ zIndex: 1, lineHeight: '1.6' }}>
                  A premium, high-performance professional network designed to connect alumni and students. Built with an elegant React frontend, Laravel backend, and MySQL database, it features secure JWT authentication, direct mentorship matching, dynamic job boards, and fully optimized RESTful APIs for real-time engagement.
                </p>
                <div className="project-links" style={{ zIndex: 1 }}>
                  <a href="https://github.com/Ritika2484/Alumii" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="project-card alumni-card">
                {/* SVG Queue Hub nodes background */}
                <svg className="network-bg-nodes" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="20" cy="20" r="1.5" fill="var(--primary-blue)" />
                  <circle cx="80" cy="30" r="1" fill="var(--primary-blue)" />
                  <circle cx="50" cy="65" r="1.8" fill="var(--primary-blue)" />
                  <circle cx="15" cy="80" r="1.2" fill="var(--primary-blue)" />
                  <circle cx="85" cy="75" r="1.3" fill="var(--primary-blue)" />
                  <line x1="20" y1="20" x2="50" y2="65" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="80" y1="30" x2="50" y2="65" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="15" y1="80" x2="50" y2="65" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="85" y1="75" x2="50" y2="65" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                </svg>

                <div className="project-tags alumni-tags" style={{ zIndex: 1 }}>
                  <span>MERN</span><span>Socket.IO</span><span>MongoDB Atlas</span><span>AWS</span>
                </div>
                <h3 style={{ zIndex: 1, letterSpacing: '-0.02em', fontWeight: '800' }}>ServeQ: A Real-time Smart Queue Management Platform</h3>
                <p style={{ zIndex: 1, lineHeight: '1.6' }}>Designed a scalable real-time queue management platform with role-based access control. Merged Socket.IO for live tracking, improving real-time data processing and achieving a ~20% reduction in average wait times.</p>
                <div className="project-links" style={{ zIndex: 1 }}>
                  <a href="https://github.com/Ritika2484" className="btn btn-outline btn-sm"><i className="fab fa-github"></i> GitHub</a>
                  <a href="https://smart-queue-blond.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><i className="fas fa-external-link-alt"></i> Live Demo</a>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="project-card alumni-card">
                {/* SVG Constellation nodes background */}
                <svg className="network-bg-nodes" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="10" cy="35" r="1.3" fill="var(--primary-blue)" />
                  <circle cx="90" cy="25" r="1.5" fill="var(--primary-blue)" />
                  <circle cx="35" cy="15" r="1.2" fill="var(--primary-blue)" />
                  <circle cx="70" cy="80" r="1.6" fill="var(--primary-blue)" />
                  <circle cx="30" cy="70" r="1" fill="var(--primary-blue)" />
                  <line x1="10" y1="35" x2="35" y2="15" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="90" y1="25" x2="70" y2="80" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="30" y1="70" x2="70" y2="80" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="35" y1="15" x2="70" y2="80" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                </svg>

                <div className="project-tags alumni-tags" style={{ zIndex: 1 }}>
                  <span>ReactJS</span><span>ExpressJS</span><span>MongoDB</span><span>NodeJS</span>
                </div>
                <h3 style={{ zIndex: 1, letterSpacing: '-0.02em', fontWeight: '800' }}>Magic-Tales – Story Book for Children</h3>
                <p style={{ zIndex: 1, lineHeight: '1.6' }}>Developed an interactive animation-based web platform enabling users to explore engaging animated content through a smooth and responsive interface. Delivered rich animated experiences, real-time content updates, and secure data management.</p>
                <div className="project-links" style={{ zIndex: 1 }}>
                  <a href="https://github.com/Ritika2484/Animation-Project" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><i className="fab fa-github"></i> GitHub</a>
                </div>
              </StaggerTiltCard>
              <StaggerTiltCard className="project-card alumni-card">
                {/* SVG Neural network nodes background */}
                <svg className="network-bg-nodes" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="30" cy="25" r="1" fill="var(--primary-blue)" />
                  <circle cx="70" cy="25" r="1" fill="var(--primary-blue)" />
                  <circle cx="30" cy="75" r="1" fill="var(--primary-blue)" />
                  <circle cx="70" cy="75" r="1" fill="var(--primary-blue)" />
                  <circle cx="50" cy="50" r="1.8" fill="var(--primary-blue)" />
                  <line x1="30" y1="25" x2="50" y2="50" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="70" y1="25" x2="50" y2="50" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="30" y1="75" x2="50" y2="50" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                  <line x1="70" y1="75" x2="50" y2="50" stroke="var(--primary-blue)" stroke-width="0.15" stroke-dasharray="1 1" />
                </svg>

                <div className="project-tags alumni-tags" style={{ zIndex: 1 }}>
                  <span>HTML/CSS</span><span>JavaScript</span><span>PHP</span><span>MySQL</span>
                </div>
                <h3 style={{ zIndex: 1, letterSpacing: '-0.02em', fontWeight: '800' }}>AI–Powered Log Management System</h3>
                <p style={{ zIndex: 1, lineHeight: '1.6' }}>Developed a role-based AI Log Management System enabling secure authentication, question handling, and real-time access to stored data. Enabled intelligent search and admin-controlled updates to improve data retrieval efficiency.</p>
                <div className="project-links" style={{ zIndex: 1 }}>
                  <a href="https://github.com/Ritika2484/project" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><i className="fab fa-github"></i> GitHub</a>
                </div>
              </StaggerTiltCard>
            </StaggerContainer>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section section-dark">
          <div className="container">
            <FadeIn><h2 className="section-title">INTERNSHIP & <span className="gradient-text">EXPERIENCE</span></h2></FadeIn>
            <StaggerContainer className="timeline">
              <StaggerChild className="timeline-item" y={15}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-date">Aug '25 - Jan '26</span>
                  <h3>Frontend Developer Intern</h3>
                  <h4 className="gradient-text">Local Startup KIRIJO (IIT Guwahati)</h4>
                  <ul>
                    <li>Led the frontend development of the Kirijo prototype using React + Vite, delivering a responsive, high-performance UI from Figma mockups.</li>
                    <li>Implemented modular components, client-side routing, and optimized performance through lazy loading and bundle size reduction.</li>
                    <li>Collaborated remotely with backend and design teams to integrate APIs, handle asynchronous data, and ensure smooth user experience.</li>
                  </ul>
                </div>
              </StaggerChild>
            </StaggerContainer>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section id="achievements" className="section section-light">
          <div className="container">
            <div className="dual-grid">
              <FadeIn delay={0.1}>
                <h2 className="section-title" style={{ textAlign: 'left' }}><span className="gradient-text">CERTIFICATIONS</span></h2>
                <StaggerContainer className="fancy-list" as="ul">
                  <StaggerChild as="li" y={15} scale={1}>
                    <i className="fas fa-award"></i>
                    <div>
                      <strong><a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=EDC4517D60765017E456279637194A66579406427EC9324CF88A26FBD2C18E8B" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Oracle Certified AI Foundation Associate <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i></a></strong>
                      <span>ORACLE (Apr '26)</span>
                    </div>
                  </StaggerChild>
                  <StaggerChild as="li" y={15} scale={1}>
                    <i className="fas fa-award"></i>
                    <div>
                      <strong><a href="https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/0bc09883-5bc3-400f-a500-f298bc027ba5-ritika-kaushik-6012c0db-a39f-4287-93fb-7eefeac7e5d7-certificate.pdf" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>MongoDB Certified Developer <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i></a></strong>
                      <span>MongoDB University (Mar '26)</span>
                    </div>
                  </StaggerChild>
                  <StaggerChild as="li" y={15} scale={1}>
                    <i className="fas fa-award"></i>
                    <div>
                      <strong><a href="https://www.cipherschools.com/certificate/preview?id=689a095d94c24c5a4c609b1e" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Data Structure Algorithms <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i></a></strong>
                      <span>CipherSchools (Jul '25)</span>
                    </div>
                  </StaggerChild>
                  <StaggerChild as="li" y={15} scale={1}>
                    <i className="fas fa-award"></i>
                    <div>
                      <strong><a href="https://drive.google.com/file/d/1f6QkWKOYQTKdZLHo51OFAmSKL9IxlfxV/view?usp=drive_link" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-blue)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Privacy and Security in Social Media <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem', marginLeft: '0.3rem' }}></i></a></strong>
                      <span>NPTEL (Apr '25)</span>
                    </div>
                  </StaggerChild>
                </StaggerContainer>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="section-title" style={{ textAlign: 'left' }}><span className="gradient-text">ACHIEVEMENTS</span></h2>
                <StaggerContainer className="stats-grid">
                  <StaggerTiltCard className="stat-card">
                    <div className="stat-number">300+</div>
                    <div className="stat-label">Coding Problems Solved</div>
                  </StaggerTiltCard>
                  <StaggerTiltCard className="stat-card">
                    <div className="stat-number"><i className="fas fa-star" style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '5px' }}></i>5</div>
                    <div className="stat-label">C++ (HackerRank)</div>
                  </StaggerTiltCard>
                  <StaggerTiltCard className="stat-card" style={{ gridColumn: '1 / -1' }}>
                    <div className="stat-number"><i className="fas fa-star" style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '5px' }}></i>5</div>
                    <div className="stat-label">Problem Solving (HackerRank)</div>
                  </StaggerTiltCard>
                </StaggerContainer>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Education & Github stats */}
        <section id="education" className="section section-dark">
          <div className="container">
            <FadeIn><h2 className="section-title">EDUCATION & <span className="gradient-text">PROFILES</span></h2></FadeIn>
            <div className="dual-grid">
              <StaggerContainer className="timeline">
                <StaggerChild className="timeline-item" y={15}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Aug '23 - Present</span>
                    <h3>B.Tech Computer Science Engineering</h3>
                    <p style={{ color: 'var(--text-light)', opacity: 0.8 }}>Lovely Professional University &bull; Punjab, India</p>
                  </div>
                </StaggerChild>
                <StaggerChild className="timeline-item" y={15}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Apr '21 - Mar '22</span>
                    <h3>Madhav Public School</h3>
                    <p className="highlight">Score: 84%</p>
                  </div>
                </StaggerChild>
                <StaggerChild className="timeline-item" y={15}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Apr '19 - Mar '20</span>
                    <h3>Saraswati Balika Vidyalaya</h3>
                    <p className="highlight">Score: 94%</p>
                  </div>
                </StaggerChild>
              </StaggerContainer>
              <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <StaggerTiltCard className="comp-card">
                  <h3><i className="fas fa-trophy"></i> Competitive Programming</h3>
                  <p>Active participant in competitive programming platforms, continuously refining problem-solving skills and algorithmic thinking.</p>
                  <div className="cp-links">
                    <a href="https://leetcode.com/u/ritika_2484/" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">LeetCode</a>
                    <a href="https://www.hackerrank.com/" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">HackerRank</a>
                  </div>
                </StaggerTiltCard>

                <StaggerTiltCard className="comp-card">
                  <h3><i className="fab fa-github"></i> GitHub Overview</h3>
                  {githubData ? (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Public Repos</span>
                        <strong style={{ color: 'var(--primary-blue)' }}>{githubData.public_repos}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-light)' }}>Followers</span>
                        <strong style={{ color: 'var(--primary-blue)' }}>{githubData.followers}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-light)' }}>Following</span>
                        <strong style={{ color: 'var(--primary-blue)' }}>{githubData.following}</strong>
                      </div>
                      <div className="cp-links" style={{ marginTop: '0.5rem' }}>
                        <a href={githubData.html_url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ width: '100%', textAlign: 'center' }}>Visit GitHub</a>
                      </div>
                    </div>
                  ) : (
                    <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Loading stats...</p>
                  )}
                </StaggerTiltCard>
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section section-light">
          <div className="container">
            <FadeIn><h2 className="section-title">GET IN <span className="gradient-text">TOUCH</span></h2></FadeIn>
            <StaggerContainer className="contact-container">
              <StaggerChild className="minimal-card contact-info" y={20} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <h3>Let's start a project together</h3>
                <p>Have an idea, opportunity, or project in mind? I’d love to connect, collaborate, and contribute through clean code, creative problem-solving, and modern web development solutions.</p>
                <div className="contact-methods">
                  <a href="mailto:ritikakaushik2484@gmail.com" className="contact-method">
                    <div className="cm-icon"><i className="fas fa-envelope"></i></div>
                    <div>
                      <h4>Email</h4>
                      <span>ritikakaushik2484@gmail.com</span>
                    </div>
                  </a>
                  <a href="tel:+919369554806" className="contact-method">
                    <div className="cm-icon"><i className="fas fa-phone"></i></div>
                    <div>
                      <h4>Phone</h4>
                      <span>+91-9369554806</span>
                    </div>
                  </a>
                </div>
              </StaggerChild>
              <StaggerTiltCard className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                  {submitStatus && <p style={{ color: submitStatus.includes('success') ? '#1C76FF' : '#f87171', marginBottom: '1rem', fontWeight: '600' }}>{submitStatus}</p>}
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="YOUR NAME" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="YOUR EMAIL" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="5" placeholder="HOW CAN I HELP YOU?" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Send Message</button>
                </form>
              </StaggerTiltCard>
            </StaggerContainer>
          </div>
        </section>

        {/* Footer Marquee */}
        <div style={{ background: 'var(--text-dark)', color: 'var(--primary-blue)', padding: '1rem 0', width: '100%', overflow: 'hidden', borderTop: '1px solid var(--border-dark)' }}>
          <Marquee speed={60} gradient={false} direction="right">
            <span style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Available For Freelance</span> ∾
            <span style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Let's Build Something Amazing</span> ∾
            <span style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Open To Opportunities</span> ∾
            <span style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Creative Problem Solving</span> ∾
            <span style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 2rem', textTransform: 'uppercase' }}>Always Learning</span> ∾
          </Marquee>
        </div>
      </main>

      <footer>
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} Ritika Kaushik. All rights reserved.</p>
          <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/Ritika2484" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/ritika-kaushik24/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;

