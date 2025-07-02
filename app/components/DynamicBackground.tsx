import React, { useEffect, useRef } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulsePhase: number;
      connections: number[];

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connections = [];
        
        // Different particle colors for variety
        const colors = ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Pulse animation
        this.pulsePhase += 0.02;
      }

      draw() {
        if (!ctx) return;

        // Draw glowing particle
        const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.3;
        const currentRadius = this.radius * pulseFactor;

        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius * 4);
        gradient.addColorStop(0, this.color + '40');
        gradient.addColorStop(0.5, this.color + '20');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      setTimeout(() => { isMouseMoving = false; }, 100);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!ctx) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Mouse interaction - particles attracted to mouse
        if (isMouseMoving) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const force = (200 - distance) / 200;
            particle.vx += (dx / distance) * force * 0.02;
            particle.vy += (dy / distance) * force * 0.02;

            // Draw connection to mouse
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * force})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }

        particle.update();
        particle.draw();
      });

      // Floating code elements
      time += 0.01;
      const codeElements = ['</', '{}', '()', '[]', '=>', '&&', '||', '==='];
      
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(129, 140, 248, 0.1)';
      
      codeElements.forEach((code, i) => {
        const x = (canvas.width * 0.1) + (i * canvas.width * 0.1) + Math.sin(time + i) * 20;
        const y = canvas.height * 0.8 + Math.sin(time * 0.5 + i * 0.5) * 50;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 0.3 + i) * 0.2);
        ctx.fillText(code, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/50 via-transparent to-blue-900/50 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-800/30 via-transparent to-purple-800/30 animate-gradient-shift-reverse" />
      </div>
      
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Hexagon */}
        <div className="absolute top-20 right-20 w-32 h-32 animate-float-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Circle grid */}
        <div className="absolute bottom-20 left-20 w-40 h-40 animate-float-medium">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            {[0, 1, 2].map(row => 
              [0, 1, 2].map(col => (
                <circle
                  key={`${row}-${col}`}
                  cx={20 + col * 30}
                  cy={20 + row * 30}
                  r="8"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="1"
                />
              ))
            )}
          </svg>
        </div>

        {/* Code brackets */}
        <div className="absolute top-1/2 left-10 text-6xl text-blue-400/10 font-mono animate-pulse-slow">
          {'</>'}
        </div>
        
        <div className="absolute top-1/3 right-1/4 text-4xl text-purple-400/10 font-mono animate-float-slow">
          {'{ }'}
        </div>

        {/* Rotating square */}
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 animate-spin-slow">
          <div className="w-full h-full border-2 border-blue-400/20 rotate-45" />
        </div>
      </div>

      {/* Light streaks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-slide-down" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-slide-down-delay" />
      </div>
    </>
  );
};

export default DynamicBackground;