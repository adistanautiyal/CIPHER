import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  // Refs for DOM elements
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  // Services data
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Creating responsive and modern web applications using cutting-edge technologies.",
      icon: "🌐",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications for iOS and Android devices.",
      icon: "📱",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Designing intuitive and engaging user interfaces with excellent user experience.",
      icon: "🎨",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence.",
      icon: "📈",
      color: "bg-orange-500"
    }
  ];

  useEffect(() => {
    // Initialize GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        pin: false,
        markers: false // Set to true for debugging
      }
    });

    // Animate title first
    tl.fromTo(titleRef.current, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate cards with stacking effect
    cardsRef.current.forEach((card, index) => {
      if (card) {
        // Initial state - cards are hidden and scaled down
        gsap.set(card, {
          y: 100 + (index * 20),
          opacity: 0,
          scale: 0.8,
          rotation: index % 2 === 0 ? -5 : 5
        });

        // Animate each card with a staggered delay
        tl.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, index * 0.2);

        // Add hover animations
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(card, {
          scale: 1.05,
          y: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          duration: 0.3,
          ease: "power2.out"
        });

        // Mouse enter event
        card.addEventListener('mouseenter', () => {
          hoverTl.play();
        });

        // Mouse leave event
        card.addEventListener('mouseleave', () => {
          hoverTl.reverse();
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl font-bold text-white mb-6"
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to help your business thrive in the modern world.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={addToRefs}
              className={`relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 ${service.color} bg-opacity-10`}
            >
              {/* Card Content */}
              <div className="text-center">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;