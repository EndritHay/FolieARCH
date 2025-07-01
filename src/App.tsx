import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowDownIcon,
  Square3Stack3DIcon,
  CubeIcon,
  BuildingOffice2Icon,
  HomeIcon
} from '@heroicons/react/24/outline';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedLayers, setSelectedLayers] = useState(['foundation', 'structure', 'interior', 'facade']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  const generateArchitecturalElements = () => {
    const elements = [
      "M10 80 L90 80 L50 20 Z",  // Triangle
      "M20 20 L80 20 L80 80 L20 80 Z", // Square
      "M15 50 L85 50 M50 15 L50 85", // Cross
      "M20 20 L80 20 L80 80 L20 80 L20 20 M35 35 L65 35 L65 65 L35 65 L35 35", // Frame
      "M50 20 L80 80 L20 80 Z", // Triangle 2
      "M20 20 L80 20 L50 80 Z", // Triangle 3
    ];

    const positions = [
      { x: '10%', y: '20%' },
      { x: '85%', y: '15%' },
      { x: '25%', y: '75%' },
      { x: '75%', y: '65%' },
      { x: '50%', y: '30%' },
      { x: '15%', y: '50%' },
      { x: '90%', y: '45%' },
      { x: '60%', y: '85%' },
    ];

    return Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          width: '120px',
          height: '120px',
          left: positions[i].x,
          top: positions[i].y,
          transform: `rotate(${45 * i}deg)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        >
          <path d={elements[i % elements.length]} />
        </svg>
      </div>
    ));
  };

  const toggleLayer = (layerId: string) => {
    setSelectedLayers(prev => 
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const architecturalStyles = [
    {
      name: "Modern Minimalism",
      description: "Clean lines and simplified forms that emphasize functionality and spatial clarity, creating an elegant and uncluttered aesthetic.",
      pattern: "M10 10h40v40h-40z",
      patternSize: "50px 50px",
      features: ["Clean Lines", "Open Space", "Natural Light"]
    },
    {
      name: "Organic Architecture",
      description: "Harmonious integration with nature, using curved forms and sustainable materials to create buildings that feel alive and connected to their environment.",
      pattern: "M30 30c0-15 30-15 30 0s-30 15-30 0z",
      features: ["Biophilic Design", "Curved Forms", "Sustainable"]
    },
    {
      name: "Industrial Chic",
      description: "Raw materials and exposed structural elements combine to create spaces that celebrate engineering and architectural honesty.",
      pattern: "M0 0h10v10H0zm20 0h10v10H20zm20 0h10v10H40zM10 10h10v10H10zm20 0h10v10H30z",
      features: ["Exposed Elements", "Raw Materials", "High Ceilings"]
    },
    {
      name: "Contemporary Classic",
      description: "A sophisticated blend of traditional architectural principles with modern amenities and design sensibilities.",
      pattern: "M0 0l30 30m0-30L0 30",
      features: ["Timeless", "Balanced", "Refined Details"]
    },
    {
      name: "Sustainable Innovation",
      description: "Forward-thinking designs that prioritize environmental responsibility while pushing the boundaries of architectural possibility.",
      pattern: "M15 0l30 30m0-30L15 30",
      patternSize: "45px 45px",
      features: ["Eco-friendly", "Smart Systems", "Energy Efficient"]
    },
    {
      name: "Urban Fusion",
      description: "Blending city dynamics with human-centric design to create vibrant spaces that respond to modern urban life.",
      pattern: "M20 20h20v20H20z",
      features: ["Mixed-Use", "Adaptable", "Community-Focused"]
    },
    {
      name: "Nordic Simplicity",
      description: "Embracing natural materials and light to create warm, minimalist spaces that exude calm and functionality.",
      pattern: "M0 0h20v20H0z",
      patternSize: "40px 40px",
      features: ["Light Woods", "Natural Light", "Cozy Minimalism"]
    },
    {
      name: "Tech-Integrated",
      description: "Seamlessly incorporating smart technology and innovative materials to create future-ready architectural solutions.",
      pattern: "M10 10h10v10H10z M30 30h10v10H30z",
      features: ["Smart Home", "IoT Ready", "Automated Systems"]
    }
  ];

  const processSteps = [
    {
      title: "Discovery & Vision",
      description: "We begin by understanding your aspirations, requirements, and unique vision for the project. This phase sets the foundation for our creative journey together.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      features: [
        "Client Consultation",
        "Site Analysis",
        "Budget Planning",
        "Initial Sketches"
      ]
    },
    {
      title: "Concept Development",
      description: "Transforming ideas into tangible concepts through detailed sketches, 3D visualizations, and innovative architectural solutions that align with your vision.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      features: [
        "Design Exploration",
        "3D Modeling",
        "Material Selection",
        "Spatial Planning"
      ]
    },
    {
      title: "Technical Design",
      description: "Developing comprehensive technical drawings and specifications that ensure your project meets all regulatory requirements while maintaining design integrity.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      features: [
        "Detailed Drawings",
        "Building Codes",
        "Specifications",
        "Coordination"
      ]
    },
    {
      title: "Project Realization",
      description: "Bringing your vision to life through meticulous execution, quality control, and continuous communication to ensure every detail meets our high standards.",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      features: [
        "Construction Support",
        "Quality Assurance",
        "Timeline Management",
        "Final Delivery"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-dark via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625')] bg-cover bg-center opacity-10"></div>
        
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 pattern-grid opacity-30"></div>
        
        {/* Architectural Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {generateArchitecturalElements()}
        </div>

        {/* 3D Rotating Cube */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40"
          animate={{
            rotateX: mousePosition.y * 45,
            rotateY: mousePosition.x * 45,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="relative w-full h-full [transform-style:preserve-3d]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full bg-primary/30 backdrop-blur-sm border border-white/20"
                style={{
                  transform: `rotateY(${i * 90}deg) translateZ(80px)${i >= 4 ? ' rotateX(90deg)' : ''}`,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="container relative text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="relative inline-block mb-12"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white [text-shadow:0_0_30px_rgba(0,0,0,0.5)]">
              Folie's ARCH
            </h1>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: 0.5
              }}
            />
          </motion.div>
          
          <motion.p
            className="text-2xl md:text-3xl text-accent/90 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                color: ["#e94560", "#ffffff", "#e94560"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Transforming
            </motion.span>{" "}
            spaces through innovative architectural design
          </motion.p>

          <motion.div
            className="flex gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="btn btn-secondary group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent opacity-20"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <Square3Stack3DIcon className="w-6 h-6 mr-2" />
              View Projects
            </motion.button>
            
            <motion.button
              className="btn bg-white/10 text-white border border-white/20 backdrop-blur-sm group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(233, 69, 96, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <CubeIcon className="w-6 h-6 mr-2" />
              </motion.div>
              Explore More
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 z-10 w-full text-center"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="inline-block"
            whileHover={{
              y: -5,
              scale: 1.1
            }}
          >
            <motion.div
              className="mt-2 text-accent/80"
              animate={{
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section with 3D Cards */}
      <section className="section bg-dark relative overflow-hidden" id="projects">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark"></div>
          {generateArchitecturalElements()}
        </div>
        
        <div className="container relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 text-white"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Villa",
                description: "Contemporary design meets sustainable living",
                icon: HomeIcon,
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              },
              {
                title: "Urban Complex",
                description: "Redefining urban living spaces",
                icon: BuildingOffice2Icon,
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              },
              {
                title: "Cultural Center",
                description: "Bridging art and architecture",
                icon: Square3Stack3DIcon,
                image: "https://images.unsplash.com/photo-1600607687644-aac4c3eab3c4"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group relative perspective"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="relative h-[400px] rounded-2xl overflow-hidden bg-dark/50 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
                  </div>
                  
                  <div className="relative h-full flex flex-col justify-end">
                    <project.icon className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-3 font-serif tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-lg font-light mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <motion.button
                      className="mt-6 px-6 py-3 bg-white/10 rounded-lg border-2 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 font-medium tracking-wide"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section className="section bg-gradient-to-br from-primary to-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-dark/50"></div>
          {generateArchitecturalElements()}
        </div>
        
        <div className="container relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 text-white"
          >
            Our Process
          </motion.h2>

          {/* Interactive Process Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-accent/20">
              <motion.div
                className="absolute top-0 left-0 w-full bg-accent"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>

            {/* Process Steps */}
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`relative flex items-center gap-8 mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Content Box */}
                <motion.div
                  className="flex-1 p-6 rounded-2xl bg-dark/30 backdrop-blur-sm border-2 border-accent/20 group hover:border-accent/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-accent/80">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>

                  <p className="text-white/70 mb-4">{step.description}</p>

                  {/* Interactive Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {step.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-sm text-white/60"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover Effect Decoration */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-1 bg-accent/40 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Timeline Node */}
                <div className="relative flex-none w-16 h-16">
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-accent/30 bg-dark/50 backdrop-blur-sm group-hover:border-accent/60 transition-colors duration-300"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Pulse Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-accent/20"
                        animate={{
                          scale: [1, 1.5, 2],
                          opacity: [0.5, 0.2, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Blueprint Section */}
      <section className="section relative overflow-hidden">
        <div className="container">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Design Philosophy
          </motion.h2>

          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-dark/50 backdrop-blur-sm border border-white/10">
            {/* Blueprint Grid Background */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '20px 20px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Architectural Elements */}
            <div className="relative h-full">
              {/* 3D Building Sketch */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Building Base */}
                <motion.svg
                  width="300"
                  height="300"
                  viewBox="0 0 300 300"
                  className="absolute top-0 left-0"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <motion.path
                    d="M50,250 L250,250 L250,100 L150,50 L50,100 Z"
                    fill="none"
                    stroke="rgba(233, 69, 96, 0.5)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M150,50 L150,200 M50,100 L250,100"
                    fill="none"
                    stroke="rgba(233, 69, 96, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                </motion.svg>

                {/* Floating Measurement Points */}
                {[
                  { x: 50, y: 250 },
                  { x: 250, y: 250 },
                  { x: 150, y: 50 }
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-accent rounded-full"
                    style={{ left: point.x, top: point.y }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(233, 69, 96, 0.4)',
                        '0 0 0 10px rgba(233, 69, 96, 0)',
                        '0 0 0 0 rgba(233, 69, 96, 0.4)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>

              {/* Rotating Compass */}
              <motion.div
                className="absolute right-10 top-10 w-20 h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative w-full h-full">
                  <motion.div
                    className="absolute w-1 h-full bg-accent/50 left-1/2 -translate-x-1/2 origin-bottom"
                    style={{ transformOrigin: 'bottom' }}
                  />
                  <div className="absolute w-4 h-4 bg-accent rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute inset-0 border-2 border-accent/30 rounded-full" />
                </div>
              </motion.div>

              {/* Dynamic Dimension Lines */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 h-[1px] bg-accent/30 flex items-center"
                  style={{
                    top: `${30 + i * 20}%`,
                    width: '100%',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.2 * i }}
                >
                  <motion.div
                    className="absolute -top-3 left-4 px-2 py-1 bg-dark/80 rounded text-accent/80 text-sm backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 + 0.2 * i }}
                  >
                    {i * 200} cm
                    <div className="absolute h-3 w-[1px] bg-accent/30 bottom-full left-1/2" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Animated Info Cards */}
              <motion.div
                className="absolute left-[10%] bottom-[20%] w-[25%]"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="border-2 border-accent p-6 rounded-xl backdrop-blur-md bg-dark/30"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">Innovation</h3>
                  <p className="text-white/80">Pushing boundaries through creative architectural solutions</p>
                  <motion.div
                    className="absolute -right-4 top-1/2 w-8 h-[2px] bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '2rem' }}
                    transition={{ duration: 0.4, delay: 1 }}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute right-[10%] bottom-[20%] w-[25%]"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  className="border-2 border-accent p-6 rounded-xl backdrop-blur-md bg-dark/30"
                  whileHover={{ scale: 1.05, rotateY: -10 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">Sustainability</h3>
                  <p className="text-white/80">Harmonizing design with environmental consciousness</p>
                  <motion.div
                    className="absolute -left-4 top-1/2 w-8 h-[2px] bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '2rem' }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  />
                </motion.div>
              </motion.div>

              {/* Drawing Lines Effect */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="100"
                  fill="none"
                  stroke="rgba(233, 69, 96, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {[...Array(4)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos(i * Math.PI / 2) * 30}%`}
                    y2={`${50 + Math.sin(i * Math.PI / 2) * 30}%`}
                    stroke="rgba(233, 69, 96, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  />
                ))}
              </svg>
            </div>

            {/* Architectural Layers Explorer */}
            <div className="mt-16 relative">
              <motion.h3
                className="text-2xl font-serif text-center mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Explore Building Layers
              </motion.h3>

              <div className="flex flex-wrap justify-center gap-8 items-start">
                {/* 3D Building Layers Visualization */}
                <div className="relative w-[400px] h-[400px] perspective-1000">
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateY: [-20, -10, -20],
                      rotateX: [15, 20, 15]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Foundation Layer */}
                    <motion.div
                      className="absolute inset-0 border-2 border-accent/30 bg-dark/20 backdrop-blur-sm"
                      style={{
                        transform: 'translateZ(0px)',
                        opacity: selectedLayers.includes('foundation') ? 1 : 0.3
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <path
                          d="M50,350 L350,350 L350,300 L50,300 Z"
                          fill="none"
                          stroke="rgba(233, 69, 96, 0.5)"
                          strokeWidth="2"
                        />
                        <text x="200" y="325" fill="rgba(233, 69, 96, 0.8)" textAnchor="middle">Foundation</text>
                      </svg>
                    </motion.div>

                    {/* Structure Layer */}
                    <motion.div
                      className="absolute inset-0 border-2 border-accent/30 bg-dark/20 backdrop-blur-sm"
                      style={{
                        transform: 'translateZ(50px)',
                        opacity: selectedLayers.includes('structure') ? 1 : 0.3
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <path
                          d="M75,300 L325,300 L325,100 L200,50 L75,100 Z"
                          fill="none"
                          stroke="rgba(233, 69, 96, 0.5)"
                          strokeWidth="2"
                        />
                        <text x="200" y="175" fill="rgba(233, 69, 96, 0.8)" textAnchor="middle">Structure</text>
                      </svg>
                    </motion.div>

                    {/* Interior Layer */}
                    <motion.div
                      className="absolute inset-0 border-2 border-accent/30 bg-dark/20 backdrop-blur-sm"
                      style={{
                        transform: 'translateZ(100px)',
                        opacity: selectedLayers.includes('interior') ? 1 : 0.3
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <path
                          d="M100,275 L300,275 L300,125 L200,75 L100,125 Z"
                          fill="none"
                          stroke="rgba(233, 69, 96, 0.5)"
                          strokeWidth="2"
                        />
                        <text x="200" y="175" fill="rgba(233, 69, 96, 0.8)" textAnchor="middle">Interior</text>
                      </svg>
                    </motion.div>

                    {/* Facade Layer */}
                    <motion.div
                      className="absolute inset-0 border-2 border-accent/30 bg-dark/20 backdrop-blur-sm"
                      style={{
                        transform: 'translateZ(150px)',
                        opacity: selectedLayers.includes('facade') ? 1 : 0.3
                      }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 400 400">
                        <path
                          d="M125,250 L275,250 L275,150 L200,100 L125,150 Z"
                          fill="none"
                          stroke="rgba(233, 69, 96, 0.5)"
                          strokeWidth="2"
                        />
                        <text x="200" y="175" fill="rgba(233, 69, 96, 0.8)" textAnchor="middle">Facade</text>
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Layer Controls */}
                <div className="flex flex-col gap-4 min-w-[250px]">
                  {[
                    { id: 'foundation', label: 'Foundation', description: 'The base that supports the entire structure' },
                    { id: 'structure', label: 'Structure', description: 'Main framework and load-bearing elements' },
                    { id: 'interior', label: 'Interior', description: 'Internal spaces and room layouts' },
                    { id: 'facade', label: 'Facade', description: 'External appearance and finishing' }
                  ].map(layer => (
                    <motion.div
                      key={layer.id}
                      className={`p-4 rounded-xl backdrop-blur-sm cursor-pointer transition-all
                        ${selectedLayers.includes(layer.id) ? 'bg-accent/20 border-2 border-accent' : 'bg-dark/20 border-2 border-white/10'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleLayer(layer.id)}
                    >
                      <h4 className="text-lg font-semibold mb-1">{layer.label}</h4>
                      <p className="text-sm text-white/70">{layer.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Inspiration Mosaic */}
      <section className="section relative overflow-hidden py-20">
        <div className="container">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Design Inspiration
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {architecturalStyles.map((style, index) => (
              <motion.div
                key={style.name}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Style Background Pattern */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-accent/20 to-dark/40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${style.pattern}' fill='rgba(233, 69, 96, 0.1)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: style.patternSize || '60px 60px'
                  }}
                />

                {/* Interactive Elements */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent transform transition-transform duration-300 group-hover:translate-y-0 translate-y-[60%]">
                  <motion.h3 
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {style.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-white/80 mb-4 line-clamp-3"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {style.description}
                  </motion.p>

                  {/* Key Features */}
                  <div className="flex flex-wrap gap-2">
                    {style.features.map((feature, i) => (
                      <motion.span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover Decoration */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-accent/50"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Interactive Corner Decorations */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Floating Elements */}
      <section className="section bg-dark text-white relative overflow-hidden" id="contact">
        <div className="absolute inset-0">
          {generateArchitecturalElements()}
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-accent/80">
                Let's create something extraordinary together
              </p>
            </div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="space-y-6">
                <div className="group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input group-hover:bg-white/20 transition-all duration-300"
                  />
                  <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300"></div>
                </div>

                <div className="group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input group-hover:bg-white/20 transition-all duration-300"
                  />
                  <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300"></div>
                </div>

                <div className="group">
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="input resize-none group-hover:bg-white/20 transition-all duration-300"
                  />
                  <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300"></div>
                </div>

                <motion.button
                  className="btn btn-secondary w-full group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative inline-flex items-center">
                    Send Message
                    <span className="absolute -right-6 group-hover:right-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      →
                    </span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="container relative">
          <div className="text-center">
            <motion.div
              className="inline-block"
              animate={{
                rotateX: mousePosition.y * 20,
                rotateY: mousePosition.x * 20,
              }}
            >
              <h3 className="text-2xl font-bold mb-2"> Folie's Architectural Masterpiece </h3>
            </motion.div>
            <p className="text-accent/60">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
