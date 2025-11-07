import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const gradientStyles = {
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  color: '#1f2937',
  fontFamily: '"Poppins","Inter",sans-serif',
  background: 'radial-gradient(1000px 800px at 30% 20%, #fff, #e8f1ff), linear-gradient(135deg, #f9fbff, #ffffff 60%)'
};

const baseBlobStyles = {
  position: 'absolute',
  width: '35vmax',
  height: '35vmax',
  borderRadius: '50%',
  filter: 'blur(60px)',
  opacity: 0.3
};

const NotFound = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (a, b) => a + Math.random() * (b - a);
    const STAR_COUNT = 120;
    let animationId;
    let width;
    let height;

    const resize = () => {
      width = canvas.width = window.innerWidth * DPR;
      height = canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', resize);
    resize();

    if (!stars.length) {
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          x: rand(0, width),
          y: rand(0, height),
          r: rand(0.5, 1.6) * DPR,
          a: rand(0.2, 0.9),
          vx: rand(-0.02, 0.02) * DPR,
          vy: rand(-0.02, 0.02) * DPR
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const nextStar = star;
        nextStar.x += nextStar.vx;
        nextStar.y += nextStar.vy;

        if (nextStar.x < 0) nextStar.x = width;
        if (nextStar.x > width) nextStar.x = 0;
        if (nextStar.y < 0) nextStar.y = height;
        if (nextStar.y > height) nextStar.y = 0;

        ctx.globalAlpha = nextStar.a;
        ctx.beginPath();
        ctx.arc(nextStar.x, nextStar.y, nextStar.r, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          nextStar.x,
          nextStar.y,
          0,
          nextStar.x,
          nextStar.y,
          nextStar.r * 2
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={gradientStyles}>
      <SEO
        title="404 — Lost in Space"
        description="This page seems to have drifted off into space."
        noIndex
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      <div
        style={{
          ...baseBlobStyles,
          background: 'radial-gradient(circle at 30% 30%, #60a5fa66, transparent 70%)',
          left: '10%',
          top: '40%',
          animation: 'float 20s ease-in-out infinite alternate'
        }}
      />
      <div
        style={{
          ...baseBlobStyles,
          background: 'radial-gradient(circle at 70% 30%, #a78bfa66, transparent 70%)',
          right: '10%',
          top: '20%',
          animation: 'float 20s ease-in-out infinite alternate',
          animationDelay: '3s'
        }}
      />

      <style>
        {`@keyframes glow {from {filter: drop-shadow(0 0 5px #a78bfa80);}to {filter: drop-shadow(0 0 10px #60a5fa80);}}
          @keyframes float {from {transform: translateY(0px) scale(1);}to {transform: translateY(-40px) scale(1.05);}}`}
      </style>

      <div className="pointer-events-none absolute top-4 left-6 text-sm font-semibold tracking-[0.2em] text-gray-500 z-10">
        ProjectMentorHub
      </div>

      <div className="relative z-10 grid h-screen place-items-center px-6 text-center">
        <div className="space-y-6">
          <div
            className="text-[15vw] font-black leading-none tracking-tight sm:text-[10vw]"
            style={{
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 4s ease-in-out infinite alternate'
            }}
          >
            404
          </div>
          <p className="text-lg text-gray-500 md:text-xl">You’ve drifted into the wrong orbit 🚀</p>
          <div className="flex flex-col items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:-translate-y-0.5 hover:shadow-blue-300/80"
            >
              Return to Earth (Home)
            </Link>
            <p className="text-sm text-gray-400">Or check if the URL’s typed correctly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
