"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code, Briefcase, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const skills = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "JavaScript", level: 90 },

  { name: "Next.js", level: 85 },
  { name: "TailwindCSS", level: 90 },
  { name: "MongoDB", level: 80 },
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
    title: "Alumni Portal",
    description: "A platform connecting alumni with their alma mater, featuring event management and networking capabilities.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(361)-u4RG3NfZgcfvSZ0mHfx5htQ0Stk6gh.png",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/anishiit/alumniportal",
    demo: "https://aluminiportal.vercel.app/"
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

const BackgroundAnimation = () => {
  return (
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
}

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

  const handleIntersection = (section) => (inView) => {
    if (inView) {
      setActiveSection(section)
    }
  }

  return (
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
              {["home", "about", "skills", "projects", "contact"].map((section) => (
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
                  {["home", "about", "skills", "projects", "contact"].map((section) => (
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
              src="https://res.cloudinary.com/dcqgytpzz/image/upload/v1730562849/PROFILE_oarys0.jpg"
              alt="Anish Kumar Singh"
              fill
              className="rounded-full object-cover border-4 border-purple-500"
              priority
            />
          </div>
          <AnimatedText text="Anish Kumar Singh" className="text-4xl md:text-6xl font-bold" />
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Full-Stack Innovator
          </h1>
          <AnimatedText 
            text="Crafting cutting-edge solutions at the intersection of AI and web technologies" 
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
          <ChevronDown className="w-8 h-8 animate-bounce text-purple-500" />
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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
  <p className="text-lg text-slate-300">
    I am a Pre-Final year student at IIT (ISM) Dhanbad, pursuing Engineering. With a deep-seated passion for full-stack development, I have honed my skills in the MERN stack, and my expertise extends across Next.js and Node.js, reinforced by a solid foundation in C, C++, Data Structures and Algorithms.
  </p>
  <p className="text-lg text-slate-300">
    My journey has been marked by impactful projects like the SESE Website, where I led a team to build a dynamic platform, and achievements such as winning the Internal Smart India Hackathon. I am also building a startup platform, Connecting Generations, a virtual campus bridging college, alumni, and students. I am driven by innovation, constantly seeking new challenges and ways to create meaningful tech solutions.
  </p>
</div>

          <InteractiveCard>
            <Card className="bg-slate-800 border-purple-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Quick Facts</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>🎓 Student at IIT Dhanbad</li>
                  <li>🌱 Founder of SESE tech, leading tech initiatives</li>
                  <li>🏆 Multiple hackathon winner</li>
                  <li>🌟 1500+ contributions on GitHub</li>
                  <li>📚 Continuous learner and tech enthusiast</li>
                </ul>
              </CardContent>
            </Card>
          </InteractiveCard>
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
            I am always open to new opportunities, collaborations, or just a friendly chat about tech. 
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
          <p>© 2024 Anish Kumar Singh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}