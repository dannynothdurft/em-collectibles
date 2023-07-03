"use client";
import "@/styles/notfound.scss";
import React, { useRef, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
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
    <div id="notfound">
      <canvas ref={canvasRef} />
      <div class="notfound">
        <div class="notfound-404">
          <h1>404</h1>
          <h2>Seite nicht gefunden</h2>
        </div>
        <Link href="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
}
