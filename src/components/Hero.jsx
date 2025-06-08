const Hero = () => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple mb-4 animate-pulse">
          CIPHER STUDIOS
        </h1>
        <p className="text-xl md:text-2xl text-cyber-blue font-light tracking-wider opacity-80">
          Decoding the Future of Digital Innovation
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-black font-bold text-lg rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-cyber-blue/50">
            Enter the Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;