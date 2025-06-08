import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ContactSection = () => {
  // Refs for Three.js
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const laptopRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing content
    mountRef.current.innerHTML = '';

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f23);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0f0f23, 1);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ffaa, 0.6);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xaa00ff, 0.4);
    pointLight2.position.set(3, -2, 2);
    scene.add(pointLight2);

    // Create laptop model
    const laptopGroup = new THREE.Group();

    // Laptop base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 100 
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Laptop screen back
    const screenBackGeometry = new THREE.BoxGeometry(2.8, 2, 0.1);
    const screenBackMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e,
      shininess: 100 
    });
    const laptopScreenBack = new THREE.Mesh(screenBackGeometry, screenBackMaterial);
    laptopScreenBack.position.set(0, 1, -0.9);
    laptopScreenBack.rotation.x = -0.1;
    laptopScreenBack.castShadow = true;
    laptopGroup.add(laptopScreenBack);

    // Screen content (glowing part)
    const screenGeometry = new THREE.PlaneGeometry(2.4, 1.6);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.8
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1, -0.85);
    screen.rotation.x = -0.1;
    laptopGroup.add(screen);

    // Keyboard area
    const keyboardGeometry = new THREE.PlaneGeometry(2.6, 1.8);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e,
      shininess: 50 
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.11, 0);
    keyboard.rotation.x = -Math.PI / 2;
    laptopGroup.add(keyboard);

    // Individual keys
    const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x95a5a6 });
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 12; j++) {
        const keyGeometry = new THREE.BoxGeometry(0.12, 0.05, 0.12);
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -1.3 + (j * 0.22),
          0.125,
          -0.6 + (i * 0.15)
        );
        key.castShadow = true;
        laptopGroup.add(key);
      }
    }

    // Trackpad
    const trackpadGeometry = new THREE.PlaneGeometry(1, 0.6);
    const trackpadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 100 
    });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, 0.12, 0.5);
    trackpad.rotation.x = -Math.PI / 2;
    laptopGroup.add(trackpad);

    // Position the laptop group
    laptopGroup.position.y = -0.5;
    scene.add(laptopGroup);
    laptopRef.current = laptopGroup;

    // Mouse movement handler
    const handleMouseMove = (event) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Calculate target rotation
      targetRotationRef.current.y = mouseRef.current.x * 0.3;
      targetRotationRef.current.x = mouseRef.current.y * 0.2;
    };

    // Add event listener
    if (mountRef.current) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Smooth rotation interpolation
      if (laptopRef.current) {
        laptopRef.current.rotation.y += (targetRotationRef.current.y - laptopRef.current.rotation.y) * 0.05;
        laptopRef.current.rotation.x += (targetRotationRef.current.x - laptopRef.current.rotation.x) * 0.05;
        
        // Subtle floating animation
        laptopRef.current.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.05;
      }

      // Animate screen glow
      const time = Date.now() * 0.002;
      if (screen) {
        screen.material.opacity = 0.6 + Math.sin(time) * 0.2;
      }

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current && camera && renderer) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to start your project? Let's discuss your ideas and bring them to life.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-8">Send us a message</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Three.js Canvas */}
          <div className="relative">
            <div
              ref={mountRef}
              className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
              style={{ cursor: 'grab' }}
            />
            <div className="absolute bottom-4 left-4 text-white/70 text-sm bg-black/30 px-3 py-1 rounded">
              Move your mouse to interact with the model
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;