"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { motion, useScroll, useSpring, useAnimation } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// --- Data Arrays for Modular Sections ---
const achievements = [
  { icon: "🥇", title: "1st Place – Internal Smart India Hackathon", desc: "Team Leader" },
  { icon: "🥈", title: "2nd Place – IIT (ISM) Hackathon", desc: "" },
  { icon: "💼", title: "10+ Freelance Projects", desc: "Delivered robust web solutions for clients" },
  { icon: "🌍", title: "Student-Alumni Platforms", desc: "Built platforms for networking & communication" },
]

const startups = [
  {
    name: "LinkLum",
    tagline: "Connecting Generations",
    desc: "A platform connecting students, alumni, and institutions for mentorship, opportunities, and collaboration.",
  },
  {
    name: "Aristove",
    tagline: "Aristocrat + Love",
    desc: "Building MVPs for startups and founders, offering tech consulting and full-stack solutions using scalable, modern technologies.",
  },
]

const leadership = [
  {
    role: "Technical Head – Concetto’25",
    desc: "Leading the tech stack for IIT Dhanbad's annual fest website and management tools. Mentoring juniors, setting up pipelines, and ensuring scalable architecture.",
  },
  {
    role: "Core Member – E-Cell, IIT ISM",
    desc: "Developed the official E-Cell website. Assisted in organizing startup events and mentorship programs.",
  },
  {
    role: "Founder – SESE Website",
    desc: "Initiated and executed the society’s digital presence.",
  },
]

const experience = [
  {
    company: "Grull.work",
    role: "Full-Stack Developer Intern",
    duration: "Oct 2024 – Dec 2024",
    points: [
      "Built & optimized responsive web apps using React and Next.js",
      "Developed user dashboards and reusable component libraries",
      "Worked on backend API integration and database interactions",
    ],
  },
  {
    company: "TechMatrix Corp, Japan",
    role: "Full-Stack Developer Intern",
    duration: "Mar 2025 – Present",
    points: [
      "Building enterprise-level features in Spring Boot & Thymeleaf",
      "Responsible for bug fixes, UI adjustments, and backend logic",
      "Exposure to large-scale system architecture and agile workflow",
    ],
  },
]

const skills = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "TypeScript", level: 85 },
  { name: "JavaScript", level: 92 },
  { name: "Next.js", level: 90 },
  { name: "TailwindCSS", level: 90 },
  { name: "MongoDB", level: 85 },
  { name: "Spring Boot", level: 75 },
  { name: "Thymeleaf", level: 70 },
  { name: "AWS", level: 70 },
]

const projects = [
  {
    title: "TheraWin - Mental Health Platform",
    description: "A comprehensive mental health platform featuring video calling, AI-powered chatbot, and community support.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(362)-GrB6vKWIS2ypNrFhO6sEMw6WC7zI7R.png",
    technologies: ["Next.js", "TailwindCSS", "WebRTC", "AI/ML"],
    github: "https://github.com/anishiit/chat-frontend",
    demo: "https://unrivaled-melba-047ef2.netlify.app/"
  },
  {
    title: "Alumni Portal (LinkLum)",
    description: "Connecting students, alumni, and institutions for mentorship, opportunities, and collaboration.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(361)-u4RG3NfZgcfvSZ0mHfx5htQ0Stk6gh.png",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/anishiit/alumniportal",
    demo: "https://www.linklum.in/"
  },
  {
    title: "SESE Website",
    description: "Official website for the Society of Environmental Science and Engineers, featuring academic resources and event management.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(363)-WNf6QE0wMDlNg6aMNn7rkRmE8WovpH.png",
    technologies: ["Next.js", "TailwindCSS", "MongoDB", "Express"],
    github: "https://github.com/anishiit",
    demo: "https://sese-eight.vercel.app/"
  }
]

const BackgroundAnimation = () => (
  <div className="fixed inset-0 -z-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#0f172a", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1e293b", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      <motion.circle
        cx="10%"
        cy="10%"
        r="5"
        fill="#60a5fa"
        animate={{
          scale: [1, 2, 1],
          opacity: [1, 0.5, 1],
          transition: { duration: 5, repeat: Infinity },
        }}
      />
      <motion.circle
        cx="90%"
        cy="90%"
        r="7"
        fill="#f472b6"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.7, 1],
          transition: { duration: 7, repeat: Infinity },
        }}
      />
      <motion.path
        d="M0,50 Q25,25 50,50 T100,50"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="0.5"
        animate={{
          d: [
            "M0,50 Q25,25 50,50 T100,50",
            "M0,50 Q25,75 50,50 T100,50",
            "M0,50 Q25,25 50,50 T100,50",
          ],
          transition: { duration: 10, repeat: Infinity },
        }}
      />
    </svg>
  </div>
)

const AnimatedText = ({ text, className = "" }) => {
  const words = text.split(" ")
  return (
    <motion.div className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

const InteractiveCard = ({ children }) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    const angleX = (e.clientY - cardCenterY) / 25
    const angleY = (cardCenterX - e.clientX) / 25
    setRotateX(angleX)
    setRotateY(angleY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="card-container perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </motion.div>
  )
}

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" style={{ scaleX }} />
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const blogLinks = [
  {
    name: "Dev.to",
    url: "https://dev.to/anishiit", // Replace with your actual Dev.to username
    icon: (
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 50 50"><path d="M7.826 10.083C5.6 10.083 3.75 11.933 3.75 14.159v21.682c0 2.226 1.85 4.076 4.076 4.076h34.348c2.226 0 4.076-1.85 4.076-4.076V14.159c0-2.226-1.85-4.076-4.076-4.076zm3.424 6.25h4.167c2.226 0 4.167 1.941 4.167 4.167v8.333c0 2.226-1.941 4.167-4.167 4.167h-4.167zm10.417 0h3.125c2.226 0 4.167 1.941 4.167 4.167v8.333c0 2.226-1.941 4.167-4.167 4.167h-3.125zm9.375 0h4.167c2.226 0 4.167 1.941 4.167 4.167v8.333c0 2.226-1.941 4.167-4.167 4.167h-4.167z"/></svg>
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@anishiit", // Replace with your actual Medium username
    icon: (
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 50 50"><ellipse cx="13" cy="25" rx="9" ry="15"/><ellipse cx="35" cy="25" rx="5" ry="15"/><ellipse cx="44" cy="25" rx="2" ry="15"/></svg>
    ),
  },
]

export default function Component() {
  const [activeSection, setActiveSection] = useState("home")
  const controls = useAnimation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      let currentSection = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Anish Kumar Singh | Full-Stack Developer | MERN | Product Builder | IIT (ISM) Dhanbad</title>
        <meta name="description" content="Portfolio of Anish Kumar Singh (Anish) – Full-Stack Developer, Product Builder, Startup Tech Lead, and MERN Specialist from IIT (ISM) Dhanbad. Explore projects, blogs, achievements, and more." />
        <meta name="keywords" content="Anish Kumar Singh, Anish, Anish Singh, Full-Stack Developer, MERN, React, Node.js, Next.js, Product Builder, Startup Tech Lead, IIT Dhanbad, ISM Dhanbad, Cloud Engineer, Open Source, UI/UX, Portfolio, LinkLum, Aristove, Concetto, SESE, TechMatrix Japan, Grull.work, freelance developer, web developer, technical head, MVP, alumni portal, mentorship, scalable web apps, environmental engineering" />
        <meta name="author" content="Anish Kumar Singh" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="en" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="copyright" content="Anish Kumar Singh" />
        <meta name="reply-to" content="anishsingh74850@gmail.com" />
        <meta name="google-site-verification" content="google20efde14fbeca7c0.html" />
        <link rel="canonical" href="https://anish-portfolio.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Anish Kumar Singh | Full-Stack Developer | MERN | Product Builder" />
        <meta property="og:description" content="Portfolio of Anish Kumar Singh (Anish) – Full-Stack Developer, Product Builder, Startup Tech Lead, and MERN Specialist from IIT (ISM) Dhanbad." />
        <meta property="og:url" content="https://anish-portfolio.vercel.app/" />
        <meta property="og:image" content="https://res.cloudinary.com/dcqgytpzz/image/upload/v1730562849/PROFILE_oarys0.jpg" />
        <meta property="og:site_name" content="Anish Kumar Singh Portfolio" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anish Kumar Singh | Full-Stack Developer | MERN | Product Builder" />
        <meta name="twitter:description" content="Portfolio of Anish Kumar Singh (Anish) – Full-Stack Developer, Product Builder, Startup Tech Lead, and MERN Specialist from IIT (ISM) Dhanbad." />
        <meta name="twitter:image" content="https://res.cloudinary.com/dcqgytpzz/image/upload/v1730562849/PROFILE_oarys0.jpg" />
        <meta name="twitter:site" content="@anishiit" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anish Kumar Singh",
              "alternateName": ["Anish", "Anish Singh"],
              "url": "https://anish-portfolio.vercel.app/",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "IIT (ISM) Dhanbad",
                "url": "https://www.iitism.ac.in/",
              },
              "jobTitle": [
                "Full-Stack Developer",
                "Product Builder",
                "Startup Tech Lead",
                "MERN Specialist"
              ],
              "worksFor": [
                { "@type": "Organization", "name": "Grull.work" },
                { "@type": "Organization", "name": "TechMatrix Corp, Japan" },
                { "@type": "Organization", "name": "Concetto’25" },
                { "@type": "Organization", "name": "LinkLum" },
                { "@type": "Organization", "name": "Aristove" }
              ],
              "sameAs": [
                "https://github.com/anishiit",
                "https://www.linkedin.com/in/anish-kumar-singh-19091b25b/",
                "https://dev.to/anishiit",
                "https://medium.com/@anishiit",
                "mailto:anishsingh74850@gmail.com"
              ],
              "image": "https://res.cloudinary.com/dcqgytpzz/image/upload/v1730562849/PROFILE_oarys0.jpg",
              "description": "Anish Kumar Singh (Anish) is a Full-Stack Developer, Product Builder, Startup Tech Lead, and MERN Specialist from IIT (ISM) Dhanbad."
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://anish-portfolio.vercel.app/",
              "name": "Anish Kumar Singh Portfolio",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://anish-portfolio.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
        <BackgroundAnimation />
        <ScrollIndicator />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-opacity-80 backdrop-blur-md bg-slate-900">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="#" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">AKS</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:flex space-x-4"
              >
                {["home", "about", "skills", "projects", "blog", "contact"].map((section) => (
                  <Button
                    key={section}
                    variant="ghost"
                    className={`text-lg ${activeSection === section ? "text-purple-400" : "text-slate-300"}`}
                    onClick={() => {
                      scrollToSection(section);
                      setActiveSection(section);
                      if (isMenuOpen) setIsMenuOpen(false);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                ))}
              </motion.div>
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-slate-900 text-slate-100">
                  <nav className="flex flex-col space-y-4">
                    {["home", "about", "skills", "projects", "blog", "contact"].map((section) => (
                      <Button
                        key={section}
                        variant="ghost"
                        className={`text-lg ${activeSection === section ? "text-purple-400" : "text-slate-300"}`}
                        onClick={() => {
                          scrollToSection(section);
                          setActiveSection(section);
                          setIsMenuOpen(false);
                        }}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 pt-32 pb-24 min-h-screen flex flex-col justify-center items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="space-y-6"
          >
            <div className="relative w-48 h-48 mx-auto mb-8">
              <Image
                src="/anishImg.jpg"
                alt="Anish Kumar Singh"
                fill
                className="rounded-full object-cover border-4 border-purple-500"
                priority
              />
            </div>
            <AnimatedText text="Anish Kumar Singh" className="text-4xl md:text-6xl font-bold" />
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Full-Stack Developer & Product Builder
            </h1>
            <AnimatedText
              text="Empowering startups and building scalable digital solutions with MERN, React, Node.js, and modern web technologies."
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto"
            />
            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                <Link href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Link href="#projects">View Projects</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-8"
          >
            <span className="sr-only">Scroll Down</span>
            <svg className="w-8 h-8 animate-bounce text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">About Anish Kumar Singh</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-lg text-slate-300">
              <p>
                Hi, I’m <strong>Anish Kumar Singh</strong> (Anish), a final year B.Tech student in Environmental Engineering at <strong>IIT (ISM) Dhanbad</strong> and a passionate <strong>Full-Stack Developer</strong> specializing in the <strong>MERN stack</strong>, backend systems, and scalable web apps.
              </p>
              <p>
                With 10+ freelance projects, internships at <strong>Grull.work</strong> and <strong>TechMatrix Japan</strong>, and leadership as the <strong>Technical Head of Concetto’25</strong>, I focus on building MVPs and robust digital solutions for startups and organizations.
              </p>
              <p>
                My mission: Empower startups through technology and keep innovating in the product-building space.
              </p>
            </div>
            <InteractiveCard>
              <Card className="bg-slate-800 border-purple-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Quick Facts</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>🎓 Final year at IIT (ISM) Dhanbad</li>
                    <li>🌱 Technical Head, Concetto’25</li>
                    <li>🏆 Multiple hackathon winner</li>
                    <li>💼 10+ freelance projects delivered</li>
                    <li>🌍 Founder of LinkLum & Aristove</li>
                  </ul>
                </CardContent>
              </Card>
            </InteractiveCard>
          </div>
        </motion.section>

        {/* Experience / Internships Section */}
        <motion.section
          id="experience"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Experience & Internships</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {experience.map((exp, idx) => (
              <Card key={exp.company} className="bg-slate-800 border-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{exp.role}</h3>
                  <div className="text-sm text-slate-400 mb-2">{exp.company} | {exp.duration}</div>
                  <ul className="list-disc ml-6 text-slate-300 space-y-1">
                    {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section
          id="leadership"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Leadership & Extracurricular</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((item, idx) => (
              <Card key={item.role} className="bg-slate-800 border-purple-500">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-purple-400">{item.role}</h3>
                  <p className="text-slate-300">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          id="achievements"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Achievements</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((ach, idx) => (
              <Card key={ach.title} className="bg-slate-800 border-pink-500">
                <CardContent className="p-6 flex flex-col items-center">
                  <span className="text-4xl mb-2">{ach.icon}</span>
                  <h3 className="text-lg font-bold mb-1 text-pink-400 text-center">{ach.title}</h3>
                  <p className="text-slate-300 text-center">{ach.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Startups / Initiatives Section */}
        <motion.section
          id="startups"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Startups & Initiatives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {startups.map((startup, idx) => (
              <Card key={startup.name} className="bg-slate-800 border-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-blue-400">{startup.name}</h3>
                  <div className="text-sm text-slate-400 mb-2">{startup.tagline}</div>
                  <p className="text-slate-300">{startup.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <InteractiveCard>
                  <Card className="bg-slate-800 border-purple-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{skill.name}</h3>
                        <span className="text-sm text-slate-300">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <motion.div
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <InteractiveCard>
                  <Card className="bg-slate-800 border-purple-500 overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{project.title}</h3>
                      <p className="text-slate-300 mb-4 flex-grow">{project.description}</p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-slate-700 text-blue-400">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                          <Link href={project.github}>
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                        <Button size="sm" asChild className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                          <Link href={project.demo}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          id="blog"
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
            Blog & Articles
          </h2>
          <div className="max-w-2xl mx-auto text-center text-lg text-slate-300 mb-8">
            <p>
              I regularly share my technical learnings, project insights, and developer tips on <span className="font-semibold text-blue-400">Dev.to</span> and <span className="font-semibold text-purple-400">Medium</span>.
              <br />
              Check out my latest articles and follow me for updates!
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {blogLinks.map((blog) => (
              <Button
                key={blog.name}
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white flex items-center justify-center"
              >
                <Link href={blog.url} target="_blank" rel="noopener noreferrer">
                  {blog.icon}
                  {blog.name}
                </Link>
              </Button>
            ))}
          </div>
        </motion.section>


        {/* Contact Section */}
        <motion.section
          id="contact"
          className="container mx-auto px-4 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">Get In Touch</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-slate-300 mb-8">
              I am always open to new opportunities, collaborations, or just a friendly chat about tech and startups. 
              Feel free to reach out through any of the channels below:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Button variant="outline" size="lg" asChild className="w-full md:w-auto border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Link href="https://github.com/anishiit">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full md:w-auto border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Link href="https://www.linkedin.com/in/anish-kumar-singh-19091b25b/?originalSubdomain=in">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full md:w-auto border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                <Link href="mailto:anishsingh74850@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>


        {/* Footer */}
        <footer className="bg-slate-900 py-8 border-t border-purple-500">
          <div className="container mx-auto px-4 text-center text-slate-300">
            <p>© 2025 Anish Kumar Singh (Anish). All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
