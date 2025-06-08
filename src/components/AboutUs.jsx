import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const missionRef = useRef(null);
  const visualRef = useRef(null);
  const teamRef = useRef(null);
  const teamMembersRef = useRef([]);
  const parallaxRef = useRef(null);

  const teamMembers = [
    {
      name: "Alex Cipher",
      role: "CEO & Founder",
      icon: "👨‍💻",
      description: "Visionary leader with 15+ years in tech innovation"
    },
    {
      name: "Maya Quantum",
      role: "CTO",
      icon: "🚀",
      description: "AI/ML expert specializing in quantum computing"
    },
    {
      name: "Zara Neo",
      role: "Creative Director",
      icon: "🎨",
      description: "Digital artist crafting immersive experiences"
    },
    {
      name: "Rio Matrix",
      role: "Lead Developer",
      icon: "⚡",
      description: "Full-stack architect building the future"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section fade-in animation
      gsap.fromTo(sectionRef.current, 
        { 
          opacity: 0,
          y: 100 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Heading slide from left
      gsap.fromTo(headingRef.current,
        {
          x: -200,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Mission paragraph animation
      gsap.fromTo(missionRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Visual element animation
      gsap.fromTo(visualRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotation: -10
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Team members staggered animation
      gsap.fromTo(teamMembersRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for background elements
      gsap.to(parallaxRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden py-20 px-4 md:px-8"
    >
      {/* Parallax Background Elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyber-blue rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-cyber-purple rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-cyber-blue transform rotate-45"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple mb-6"
          >
            ABOUT CIPHER
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p 
              ref={missionRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              At Cipher Studios, we don't just build software—we architect digital realities. 
              Our mission is to decode the complexities of tomorrow's technology and transform 
              them into seamless, revolutionary experiences that push the boundaries of what's possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                <span className="text-cyber-blue font-semibold">Innovation First</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyber-purple rounded-full"></div>
                <span className="text-cyber-purple font-semibold">Future-Focused</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                <span className="text-cyber-blue font-semibold">Human-Centered</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div 
            ref={visualRef}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyber-blue/30">
                <div className="w-60 h-60 bg-gradient-to-br from-cyber-blue/30 to-cyber-purple/30 rounded-full flex items-center justify-center border border-cyber-purple/40">
                  <div className="text-6xl">🔮</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyber-blue rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyber-purple rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamRef}>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">
            CORE TEAM
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                ref={el => teamMembersRef.current[index] = el}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-cyber-blue/30 hover:border-cyber-purple/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Member Icon */}
                  <div className="text-4xl mb-4 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-full flex items-center justify-center mx-auto border border-cyber-blue/40 group-hover:border-cyber-purple/60 transition-all duration-300">
                      <span className="text-2xl">{member.icon}</span>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <h4 className="text-xl font-bold text-white mb-2 text-center">
                    {member.name}
                  </h4>
                  <p className="text-cyber-blue font-semibold text-center mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-black font-bold text-lg rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-cyber-blue/50">
            Join Our Mission
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-30"></div>
    </section>
  );
};

export default AboutUs;