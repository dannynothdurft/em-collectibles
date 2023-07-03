import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./loader.scss";

function Loader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1 + 1;
      const opacity = Math.random() * 0.5 + 0.5;
      const speed = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      };

      particles.push({ x, y, radius, opacity, speed });
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speed.x;
        particle.y += particle.speed.y;

        if (
          particle.x + particle.radius < 0 ||
          particle.x - particle.radius > canvas.width ||
          particle.y + particle.radius < 0 ||
          particle.y - particle.radius > canvas.height
        ) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animateParticles);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initialize = () => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      animateParticles();
      setInterval(createParticle, 100);
    };

    initialize();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="loader--container">
      <canvas ref={canvasRef} className="background-particles" />
      <div className="vertical-centered-box">
        <div className="content">
          <Image
            src="/logo192.png"
            alt="logo"
            width={70}
            height={70}
            className="logo"
          />
          <div className="loader-circle"></div>
          <div className="loader-line-mask">
            <div className="loader-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
