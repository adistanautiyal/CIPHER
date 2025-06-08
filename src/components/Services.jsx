import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  // Refs for DOM elements
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Enhanced services data
  const services = [
    {
      id: 1,
      title: "Web Development",
      subtitle: "Modern & Responsive Solutions",
      description: "Creating responsive and modern web applications using cutting-edge technologies like React, Next.js, and TypeScript.",
      icon: "🌐",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "Performance Optimization"],
      testimonial: "Transformed our digital presence completely!",
      author: "John Smith, CEO"
    },
    {
      id: 2,
      title: "Mobile Development",
      subtitle: "Cross-Platform Excellence",
      description: "Building cross-platform mobile applications for iOS and Android devices with native performance and beautiful UI.",
      icon: "📱",
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
      testimonial: "Our app downloads increased by 300%!",
      author: "Sarah Johnson, Product Manager"
    },
    {
      id: 3,
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "Designing intuitive and engaging user interfaces with excellent user experience that converts visitors into customers.",
      icon: "🎨",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-pink-500",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      testimonial: "The design exceeded all expectations!",
      author: "Mike Chen, Startup Founder"
    },
    {
      id: 4,
      title: "Digital Marketing",
      subtitle: "Growth-Driven Strategies",
      description: "Comprehensive digital marketing strategies to grow your online presence and reach your target audience effectively.",
      icon: "📈",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
      features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Analytics & Reporting"],
      testimonial: "ROI increased by 250% in 6 months!",
      author: "Lisa Wong, Marketing Director"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles animation
      gsap.to(".particle", {
        y: "random(-100, 100)",
        x: "random(-100, 100)",
        rotation: "random(0, 360)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Enhanced title animation
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      });

      titleTl
        .fromTo(titleRef.current, 
          { 
            y: 80, 
            opacity: 0,
            scale: 0.8
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
          }
        )
        .fromTo(subtitleRef.current,
          {
            y: 40,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          },
          "-=0.6"
        );

      // Enhanced cards animation with sequential reveal
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Set initial state
          gsap.set(card, {
            y: 150,
            opacity: 0,
            scale: 0.7,
            rotation: index % 2 === 0 ? -10 : 10
          });

          // Main reveal animation
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: "back.out(1.4)"
          });

          // Cards remain static after initial animation

          // Enhanced hover animations
          const cardInner = card.querySelector('.card-inner');
          const cardIcon = card.querySelector('.card-icon');
          const cardFeatures = card.querySelector('.card-features');

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl
            .to(card, {
              scale: 1.08,
              y: -15,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              duration: 0.4,
              ease: "power2.out"
            })
            .to(cardIcon, {
              scale: 1.2,
              rotation: 360,
              duration: 0.6,
              ease: "back.out(1.7)"
            }, 0)
            .to(cardInner, {
              background: "rgba(255,255,255,0.15)",
              duration: 0.3
            }, 0)
            .fromTo(cardFeatures, {
              opacity: 0,
              y: 20
            }, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            }, 0.1);

          // Mouse events
          card.addEventListener('mouseenter', () => {
            hoverTl.play();
            setActiveCard(index);
          });

          card.addEventListener('mouseleave', () => {
            hoverTl.reverse();
            setActiveCard(null);
          });

          // Click animation
          card.addEventListener('click', () => {
            gsap.to(card, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Function to add card refs
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20 px-4 overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Section Title */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6"
          >
            Our Services
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We provide comprehensive digital solutions to help your business thrive in the modern world with cutting-edge technology and innovative approaches.
          </p>
        </div>

        {/* Enhanced Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={addToRefs}
              className="group relative cursor-pointer"
            >
              {/* Card Background with Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Main Card */}
              <div className="card-inner relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300">
                
                {/* Card Header */}
                <div className="text-center mb-6">
                  <div className="card-icon text-7xl mb-4 transform transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-lg text-blue-200 font-medium">
                    {service.subtitle}
                  </p>
                </div>

                {/* Card Description */}
                <p className="text-gray-300 leading-relaxed mb-6 text-center">
                  {service.description}
                </p>

                {/* Features List (Hidden by default, shown on hover) */}
                <div className="card-features opacity-0 mb-6">
                  <h4 className="text-white font-semibold mb-3 text-center">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="border-t border-white/20 pt-4 text-center">
                  <p className="text-green-300 italic text-sm mb-2">
                    "{service.testimonial}"
                  </p>
                  <p className="text-gray-400 text-xs">
                    - {service.author}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-6 text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400/30 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-0 w-1 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team of experts and let's discuss how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
              Get Started Now
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
          <div className="mt-8 flex justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;