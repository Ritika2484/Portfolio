import { useState } from 'react';
import { Mail, Download, Menu, X, Code2, Layers, Database, Users, ExternalLink, Check, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './index.css';

function Github({ size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
}
function Linkedin({ size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.3 7.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM3.5 9h3.6v12H3.5V9Zm5.8 0h3.5v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21h-3.6v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.3V9Z" /></svg>;
}

const links = { github: 'https://github.com/Ritika2484', linkedin: 'https://www.linkedin.com/in/ritika-kaushik24/', email: 'ritikakaushik2484@gmail.com' };
const skills = [
  { title: 'Languages', Icon: Code2, items: ['JavaScript', 'TypeScript', 'C++', 'Java', 'C'] },
  { title: 'Frameworks', Icon: Layers, items: ['Next.js', 'Node.js', 'Express.js', 'Mongoose'] },
  { title: 'Tools & platforms', Icon: Database, items: ['MongoDB', 'PostgreSQL', 'Postman', 'Git', 'AWS', 'Docker', 'GitHub Actions'] },
  { title: 'How I work', Icon: Users, items: ['Problem-solving', 'Teamwork', 'Adaptability', 'Leadership'] },
];
const experience = [
  { company: 'PBNC Private Limited', subtitle: 'Pragati Bharati', date: 'Oct 2026 — Present', url: 'https://pragatibharati.com/login', points: [
    'Developing and enhancing web application features with Next.js, TypeScript, and Tailwind CSS.',
    'Improving the UI and UX of student dashboards, practice modules, and leaderboard interfaces.',
    'Debugging frontend issues and performing functional testing to improve reliability and usability.',
  ] },
  { company: 'Achyuta Software Pvt. Ltd.', date: 'Aug 2025 — Aug 2026', url: 'https://achyutagroup.com/', points: [
    'Built modular, reusable React components and reduced initial page load time by approximately 30% through lazy loading.',
    'Integrated RESTful APIs supporting 100+ concurrent requests and improved data-fetching efficiency by 25%.',
    'Collaborated in a distributed team on modular architecture, API testing, functional testing, and debugging.',
  ] },
];
const certificates = [
  { name: 'Oracle Certified AI Foundation Associate', issuer: 'Oracle', date: 'Apr 2026', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=EDC4517D60765017E456279637194A66579406427EC9324CF88A26FBD2C18E8B' },
  { name: 'MongoDB Certified Developer', issuer: 'MongoDB University', date: 'Mar 2026', url: 'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/0bc09883-5bc3-400f-a500-f298bc027ba5-ritika-kaushik-6012c0db-a39f-4287-93fb-7eefeac7e5d7-certificate.pdf' },
  { name: 'Data Structure Algorithms', issuer: 'CipherSchools', date: 'Jul 2025', url: 'https://www.cipherschools.com/certificate/preview?id=689a095d94c24c5a4c609b1e' },
  { name: 'Privacy and Security in Social Media', issuer: 'NPTEL', date: 'Apr 2025', url: 'https://drive.google.com/file/d/1f6QkWKOYQTKdZLHo51OFAmSKL9IxlfxV/view' },
];
function SocialLinks() {
  return <div className="social-links"><a href={links.github} target="_blank" rel="noreferrer" aria-label="Ritika on GitHub"><Github size={19} /></a><a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="Ritika on LinkedIn"><Linkedin size={19} /></a><a href={`mailto:${links.email}`} aria-label="Email Ritika"><Mail size={19} /></a></div>;
}
function ResearchPreview() {
  return <div className="project-visual research-visual" aria-label="Illustrative investment research interface"><div className="browser-frame"><div className="browser-bar"><span /><span /><span /><small>Investment research</small></div><div className="research-ui"><div className="mock-sidebar"><Layers size={20} /><span className="mock-active" /><span /><span /><span /></div><div className="mock-main"><div className="mock-overline">RESEARCH WORKSPACE</div><h4>From data to perspective.</h4><div className="mock-search">Explore a company <span>⌕</span></div><div className="mock-panels"><div><span>Company analysis</span><div className="mock-chart">{[25,45,33,60,43,70,58,85,73,96].map((h,i) => <i key={i} style={{height:`${h}%`}} />)}</div></div><div><span>Research report</span><div className="mock-lines"><i /><i /><i /><i /><i /></div><b>AI-assisted insights</b></div></div><div className="mock-bottom"><span>Public data</span><span>Financial analysis</span><span>Risk assessment</span></div></div></div></div><p className="visual-caption">Interface concept · AI-powered research</p></div>;
}
function QueuePreview() {
  return <div className="project-visual queue-visual" aria-label="Illustrative ServeQ queue interface"><div className="queue-ticket"><div className="ticket-top">ServeQ <span>LIVE QUEUE</span></div><p>A little less waiting.</p><h4>A better<br />experience.</h4><div className="ticket-number"><small>YOUR TOKEN</small><strong>A–024</strong><span>You're in the queue</span></div><div className="ticket-bottom"><span>Live updates</span><span>Seamless service</span></div></div><div className="queue-phone"><div className="phone-speaker" /><strong>ServeQ</strong><span>Queue overview</span><div className="queue-status"><Check size={18} /><span>Connected in real time</span></div><div className="queue-rows">{['Now serving','Up next','In queue'].map((text,i) => <div key={text}><span>{text}</span><b>A–0{22+i}</b></div>)}</div><div className="phone-action">Live queue tracking</div></div><p className="visual-caption">Interface concept · Real-time queue management</p></div>;
}
function ContactForm() {
  const [status,setStatus] = useState('');
  const [sending,setSending] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const configured = [serviceId,templateId,publicKey].every(value => value && !value.startsWith('your_'));
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!configured) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`);
      window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
      setStatus('Your email app will open with a draft. Send it there to get in touch, or use the email address alongside.');
      return;
    }
    setSending(true);setStatus('');
    try {
      await emailjs.send(serviceId,templateId,{from_name:data.get('name'),from_email:data.get('email'),message:data.get('message'),to_name:'Ritika Kaushik'},publicKey);
      setStatus('Thank you! Your message has been sent.');form.reset();
    } catch { setStatus('Your message could not be sent. Please email me directly using the address alongside.'); }
    finally { setSending(false); }
  }
  return <form onSubmit={handleSubmit} className="contact-form"><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Name" maxLength={120} required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label></div><label>What do you have in mind?<textarea name="message" rows={4} placeholder="Tell me about your project or opportunity…" maxLength={5000} required /></label><div className="form-bottom"><span>{configured?'Let’s make something meaningful.':'Prepare a message in your email app.'}</span><button className="button button-dark" disabled={sending} type="submit">{sending?'Sending…':configured?'Send message':'Prepare email'}<Mail size={16} /></button></div><p className="form-status" role="status">{status}</p></form>;
}
function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [copied,setCopied] = useState(false);
  const navItems = [['about','Profile'],['projects','Projects'],['experience','Experience'],['contact','Contact']];
  async function copyEmail() {
    try { await navigator.clipboard.writeText(links.email);setCopied(true);window.setTimeout(()=>setCopied(false),2500); }
    catch { setCopied(false); }
  }
  return <><a className="skip-link" href="#about">Skip to content</a><main>
    <section className="hero" id="home" aria-labelledby="hero-heading"><header className="site-header wrap"><a href="#home" className="wordmark" aria-label="Ritika Kaushik home">Ritika Kaushik<span>Full Stack Developer</span></a><button className="menu-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X />:<Menu />}</button><nav id="main-navigation" className={menuOpen?'navigation is-open':'navigation'} aria-label="Main navigation">{navItems.map(([id,text])=><a href={`#${id}`} key={id} onClick={()=>setMenuOpen(false)}>{text}</a>)}<a href="/Ritika_Kaushik.pdf" download="Ritika_Kaushik_CV.pdf" className="nav-resume">Résumé <Download size={14} /></a></nav></header><div className="hero-center wrap"><p className="hero-eyebrow">Full Stack Development <span>·</span> Thoughtful Interfaces <span>·</span> AI Applications</p><h1 id="hero-heading">WEB DEVELOPER</h1><p className="hero-byline">Ritika Kaushik <span /> Building ideas into experiences.</p><a className="button button-light" href="#projects">Explore my work</a></div><span className="spark spark-one" aria-hidden="true">✳</span><span className="spark spark-two" aria-hidden="true">✳</span><div className="hero-footer wrap"><span>Code with purpose. Build with care.</span><a href="#about">Scroll to discover <span className="scroll-line" /></a></div></section>
    <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="wrap about-layout"><div className="about-copy"><p className="eyebrow">THE PERSON BEHIND THE CODE</p><h2 id="about-heading">About Me<span className="heading-star" aria-hidden="true">✳</span></h2><p className="lead">I build thoughtful interfaces.<br />And the systems behind them.</p><p>I’m Ritika, a Computer Science and Engineering student at Lovely Professional University and a Full Stack Developer Intern at PBNC Private Limited (Pragati Bharati).</p><p>My work brings together responsive frontend experiences, reliable backend services, and AI-powered applications. I enjoy turning complex problems into clear, useful digital products.</p><div className="about-specialties"><span>Full stack development</span><span>API integration</span><span>AI applications</span><span>Problem-solving</span></div><a href="/Ritika_Kaushik.pdf" download="Ritika_Kaushik_CV.pdf" className="text-link">Download my résumé <Download size={17} /></a></div><figure className="portrait-block"><div className="portrait-decoration" aria-hidden="true" /><div className="portrait-frame"><img src="/profile.jpeg" alt="Illustrated portrait of Ritika Kaushik" width="1024" height="1536" /></div><figcaption><strong>Ritika Kaushik</strong><span>Developer. Learner. Problem-solver.</span></figcaption></figure></div></section>
    <section className="section dark-section" id="skills" aria-labelledby="skills-heading"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">WHAT I BRING TO THE TABLE</p><h2 id="skills-heading">Skills & Expertise<span className="heading-star" aria-hidden="true">✳</span></h2></div><p>From the first interaction to the last API call,<br />I care about how it all comes together.</p></div><div className="skills-grid">{skills.map(({title,Icon,items})=><article className="skill-group" key={title}><Icon size={30} strokeWidth={1.2} /><h3>{title}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><div className="section-footnote"><span>A practical toolkit. A curious mindset.</span><span>Always learning, always building.</span></div></div></section>
    <section className="projects-section" id="projects" aria-labelledby="projects-heading"><div className="wrap projects-heading"><p className="eyebrow">A SELECTION OF MY RECENT WORK</p><h2 id="projects-heading">Selected Projects</h2></div><article className="project-row wrap"><div className="project-copy"><p className="eyebrow">FEATURED PROJECT · AUG 2026</p><h3>AI-Powered<br />Investment Research</h3><p>A full-stack platform that turns public company data into structured research, helping automate analysis and accelerate investment research.</p><h4>Built to bring clarity.</h4><ul className="project-points"><li>Secure authentication and Firebase integration</li><li>AI agents, large language models, and web search</li><li>Financial analysis and risk assessment reports</li></ul><div className="tech-tags"><span>Next.js</span><span>Firebase</span><span>LLMs</span><span>AI agents</span></div><a className="text-link" href="https://github.com/Ritika2484/ai-trade-agent" target="_blank" rel="noreferrer">View source on GitHub <Github size={17} /></a></div><ResearchPreview /></article><div className="dark-section"><article className="project-row project-reverse wrap"><div className="project-copy"><p className="eyebrow">FEATURED PROJECT · APR 2026</p><h3>ServeQ<br />Less waiting.<br />Better flow.</h3><p>A real-time smart queue management platform designed to streamline customer flow for service-based systems.</p><h4>Built for the moment.</h4><ul className="project-points"><li>Live queue tracking with Socket.IO</li><li>Authentication and role-based access control</li><li>Approximately 20% lower average wait times</li></ul><div className="tech-tags"><span>MERN stack</span><span>Socket.IO</span><span>MongoDB Atlas</span><span>AWS</span></div><a className="text-link" href="https://www.serveq.tech/" target="_blank" rel="noreferrer">Visit ServeQ <ExternalLink size={17} /></a></div><QueuePreview /></article></div></section>
    <section className="section" id="experience" aria-labelledby="experience-heading"><div className="wrap experience-layout"><div className="sticky-heading"><p className="eyebrow">LEARNING THROUGH BUILDING</p><h2 id="experience-heading">Real work.<br />Real growth.</h2><p>Hands-on experience creating, improving, and shipping web applications with collaborative teams.</p></div><div className="experience-list">{experience.map(job=><article className="experience-item" key={job.company}><div className="job-meta"><span>Full Stack Developer Intern</span><time>{job.date}</time></div><h3><a href={job.url} target="_blank" rel="noreferrer">{job.company}<ExternalLink size={17} /></a></h3>{job.subtitle&&<p className="job-subtitle">{job.subtitle}</p>}<ul>{job.points.map(point=><li key={point}>{point}</li>)}</ul></article>)}</div></div></section>
    <section className="section dark-section achievements-section" id="achievements" aria-labelledby="achievements-heading"><div className="wrap"><p className="eyebrow">CONSISTENCY, ONE PROBLEM AT A TIME</p><h2 id="achievements-heading">A problem-solving mindset.</h2><div className="achievement-grid"><div><strong>300<span>+</span></strong><h3>DSA problems solved</h3><p>LeetCode & HackerRank · Apr 2026</p></div><div><strong>5<span> / 5</span></strong><h3>C++ on HackerRank</h3><p>Five-star rating · Feb 2026</p></div><div><strong>5<span> / 5</span></strong><h3>Problem Solving on HackerRank</h3><p>Five-star rating · Feb 2026</p></div></div><a className="text-link" href="https://leetcode.com/u/ritika_2484/" target="_blank" rel="noreferrer">Explore my LeetCode profile <ExternalLink size={16} /></a></div></section>
    <section className="section credentials-section" id="education" aria-labelledby="education-heading"><div className="wrap credentials-grid"><div><p className="eyebrow">THE FOUNDATION</p><h2 id="education-heading">Education</h2><div className="education-list"><article><time>Aug 2023 — Present</time><h3>Lovely Professional University</h3><p>B.Tech in Computer Science and Engineering</p><div><span>Phagwara, Punjab</span><strong>CGPA 6.9</strong></div></article><article><time>Apr 2021 — Mar 2022</time><h3>Madhav Public School</h3><p>Higher Secondary · Gorakhpur, UP</p><strong>84%</strong></article><article><time>Apr 2019 — Mar 2020</time><h3>Saraswati Balika Vidyalaya</h3><p>Matriculation · Gorakhpur, UP</p><strong>94%</strong></article></div></div><div><p className="eyebrow">KEEPING MY CURIOSITY ALIVE</p><h2>Certifications</h2><div className="certificate-list">{certificates.map(cert=><a key={cert.name} href={cert.url} target="_blank" rel="noreferrer"><div><span>{cert.issuer} · {cert.date}</span><h3>{cert.name}</h3></div><ExternalLink size={18} /></a>)}</div></div></div></section>
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">LET’S CREATE SOMETHING THAT MATTERS</p><h2 id="contact-heading">Have an idea?<br />Let’s talk<span className="heading-star" aria-hidden="true">✳</span></h2></div><p>For projects, opportunities,<br />or a good conversation about building.</p></div><div className="contact-layout"><div className="contact-details"><a className="contact-email" href={`mailto:${links.email}`}>{links.email}</a><button className="copy-email" type="button" onClick={copyEmail}>{copied?<Check size={15} />:<Copy size={15} />}<span role="status">{copied?'Email copied':'Copy email address'}</span></button><SocialLinks /></div><ContactForm /></div></div></section>
    </main><footer className="site-footer dark-section"><div className="wrap"><a href="#home" className="footer-name">Ritika Kaushik</a><p>Thoughtful code. Meaningful experiences.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Ritika Kaushik</span><SocialLinks /><a href="#home">Back to top</a></div></div></footer></>;
}
export default App;
