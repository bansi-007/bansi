'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

const NeuroPhysicsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 60; // Adjust for density
        const connectionDistance = 150;
        const speed = 0.5;

        // Init particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;


                // Mouse interaction (Attraction & Connection)
                const dxMouse = p.x - mouseX;
                const dyMouse = p.y - mouseY;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                // Gentle Attraction (Gravity)
                if (distMouse < 250) {
                    const force = (250 - distMouse) / 250;
                    // Negative for attraction. Small factor for subtle pull.
                    const attractionX = (dxMouse / distMouse) * force * -0.5;
                    const attractionY = (dyMouse / distMouse) * force * -0.5;
                    p.x += attractionX;
                    p.y += attractionY;

                    // Draw connection to mouse (Interactive Synapse)
                    if (distMouse < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouseX, mouseY);
                        const alpha = (1 - (distMouse / connectionDistance)) * 0.5; // Slightly stronger
                        ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
                        ctx.stroke();
                    }
                }

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle (Neuron)
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 65, 0.5)'; // Terminal green, semi-transparent
                ctx.fill();

                // Connect (Synapse)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Opacity based on distance
                        const alpha = 1 - (dist / connectionDistance);
                        ctx.strokeStyle = `rgba(0, 255, 65, ${alpha * 0.2})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Ensure it is not behind the body background 
                pointerEvents: 'none',
                opacity: 0.4
            }}
        />
    );
};

export default NeuroPhysicsBackground;
