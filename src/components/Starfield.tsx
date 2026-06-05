'use client';

import { useEffect, useRef } from 'react';

interface Planet {
    name: string;
    a: number;           // semi-major axis (orbit radius, scaled)
    sizeR: number;       // planet radius in px
    color: string;       // base hex/rgb
    haloColor?: string;  // halo glow rgb triplet
    period: number;      // seconds per orbit
    phase: number;       // starting angle
    hasRing?: boolean;
}

interface BgStar {
    x: number;
    y: number;
    r: number;
    alpha: number;
    twinkles: boolean;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface Shooter {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
}

const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = 0;
        let h = 0;
        let centerX = 0;
        let centerY = 0;
        let scale = 1;          // overall solar-system scale
        let tiltY = 0.42;       // y-axis compression for tilted perspective

        const setSize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            centerX = w * 0.5;
            centerY = h * 0.58;   // slightly below middle, so upper portion has clear sky for content
            // scale so the outermost orbit just fits the shorter dimension comfortably
            const shorter = Math.min(w, h);
            scale = shorter / 1100; // 1.0 at ~1100px viewport
            if (scale < 0.55) scale = 0.55;
        };
        setSize();

        // Background stars — mostly dim, very few twinkle
        const bgStars: BgStar[] = [];
        const bgCount = Math.round((w * h) / 3200);
        for (let i = 0; i < bgCount; i++) {
            bgStars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.3 + Math.random() * 0.9,
                alpha: 0.25 + Math.random() * 0.55,
                twinkles: Math.random() < 0.08,
                twinkleSpeed: 0.4 + Math.random() * 1.4,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }

        // Planets — distances and periods are stylised (Apple-watch-like), not to scale
        const planets: Planet[] = [
            { name: 'Mercury', a: 80,  sizeR: 1.6, color: '#a8a29e', period: 14,  phase: Math.random() * Math.PI * 2 },
            { name: 'Venus',   a: 120, sizeR: 3.4, color: '#e0c08a', haloColor: '224, 192, 138', period: 22, phase: Math.random() * Math.PI * 2 },
            { name: 'Earth',   a: 165, sizeR: 3.8, color: '#5aa9e6', haloColor: '90, 169, 230',  period: 30, phase: Math.random() * Math.PI * 2 },
            { name: 'Mars',    a: 210, sizeR: 2.6, color: '#c45a3a', period: 44,  phase: Math.random() * Math.PI * 2 },
            { name: 'Jupiter', a: 290, sizeR: 10,  color: '#c8a47a', haloColor: '200, 164, 122', period: 96, phase: Math.random() * Math.PI * 2 },
            { name: 'Saturn',  a: 360, sizeR: 8.5, color: '#e2c97a', haloColor: '226, 201, 122', period: 150, phase: Math.random() * Math.PI * 2, hasRing: true },
            { name: 'Uranus',  a: 425, sizeR: 5.5, color: '#88d4d8', period: 230, phase: Math.random() * Math.PI * 2 },
            { name: 'Neptune', a: 485, sizeR: 5.2, color: '#3c5aa6', haloColor: '60, 90, 166',   period: 320, phase: Math.random() * Math.PI * 2 },
        ];

        // Shooting stars
        const shooters: Shooter[] = [];
        let nextShooterAt = performance.now() + 12000 + Math.random() * 18000;
        const spawnShooter = () => {
            const angle = (Math.random() * 0.3 + 0.5) * Math.PI;
            const speed = 7 + Math.random() * 5;
            shooters.push({
                x: Math.random() * w * 0.9,
                y: -20,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 35 + Math.random() * 15,
            });
        };

        const start = performance.now();
        let raf = 0;

        const drawOrbit = (rx: number, ry: number) => {
            ctx.strokeStyle = 'rgba(170, 200, 255, 0.06)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
        };

        const drawSun = (time: number) => {
            const pulse = 1 + Math.sin(time * 0.6) * 0.04;
            const r = 18 * scale * pulse;

            // Far halo
            const farR = r * 9;
            const g1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, farR);
            g1.addColorStop(0, 'rgba(255, 210, 130, 0.35)');
            g1.addColorStop(0.25, 'rgba(255, 180, 90, 0.12)');
            g1.addColorStop(1, 'rgba(255, 180, 90, 0)');
            ctx.fillStyle = g1;
            ctx.fillRect(centerX - farR, centerY - farR, farR * 2, farR * 2);

            // Inner halo
            const innR = r * 3.5;
            const g2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innR);
            g2.addColorStop(0, 'rgba(255, 230, 170, 1)');
            g2.addColorStop(0.5, 'rgba(255, 200, 120, 0.6)');
            g2.addColorStop(1, 'rgba(255, 200, 120, 0)');
            ctx.fillStyle = g2;
            ctx.fillRect(centerX - innR, centerY - innR, innR * 2, innR * 2);

            // Sun disc
            const g3 = ctx.createRadialGradient(centerX - r * 0.2, centerY - r * 0.2, 0, centerX, centerY, r);
            g3.addColorStop(0, '#fff6d8');
            g3.addColorStop(0.6, '#ffd47a');
            g3.addColorStop(1, '#f59e0b');
            ctx.fillStyle = g3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.fill();
        };

        const draw = (now: number) => {
            const time = (now - start) / 1000;

            // Background fill (semi-transparent so any deep nebula gradient from CSS shows through)
            ctx.clearRect(0, 0, w, h);

            // Background stars
            for (const s of bgStars) {
                let a = s.alpha;
                if (s.twinkles) {
                    const t = (Math.sin(time * s.twinkleSpeed + s.twinklePhase) + 1) / 2;
                    a *= 0.5 + t * 0.5;
                }
                ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // Orbits
            for (const p of planets) {
                const rx = p.a * scale;
                const ry = rx * tiltY;
                drawOrbit(rx, ry);
            }

            // Sun
            drawSun(time);

            // Planets
            for (const p of planets) {
                const rx = p.a * scale;
                const ry = rx * tiltY;
                const theta = p.phase + (time / p.period) * Math.PI * 2;
                const px = centerX + rx * Math.cos(theta);
                const py = centerY + ry * Math.sin(theta);

                // Halo
                if (p.haloColor) {
                    const haloR = p.sizeR * scale * 5;
                    const grad = ctx.createRadialGradient(px, py, 0, px, py, haloR);
                    grad.addColorStop(0, `rgba(${p.haloColor}, 0.55)`);
                    grad.addColorStop(0.35, `rgba(${p.haloColor}, 0.15)`);
                    grad.addColorStop(1, `rgba(${p.haloColor}, 0)`);
                    ctx.fillStyle = grad;
                    ctx.fillRect(px - haloR, py - haloR, haloR * 2, haloR * 2);
                }

                // Saturn ring
                if (p.hasRing) {
                    const ringRX = p.sizeR * scale * 2.1;
                    const ringRY = ringRX * 0.35;
                    ctx.strokeStyle = 'rgba(230, 210, 160, 0.55)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.ellipse(px, py, ringRX, ringRY, -0.25, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Disc
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(px, py, p.sizeR * scale, 0, Math.PI * 2);
                ctx.fill();
            }

            // Shooting stars
            if (now > nextShooterAt) {
                spawnShooter();
                nextShooterAt = now + 18000 + Math.random() * 22000;
            }
            for (let i = shooters.length - 1; i >= 0; i--) {
                const s = shooters[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life += 1;
                const k = 1 - s.life / s.maxLife;
                if (k <= 0 || s.x > w + 60 || s.y > h + 60) {
                    shooters.splice(i, 1);
                    continue;
                }
                const tailX = s.x - s.vx * 5;
                const tailY = s.y - s.vy * 5;
                const lg = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
                lg.addColorStop(0, 'rgba(255, 255, 255, 0)');
                lg.addColorStop(1, `rgba(255, 255, 255, ${0.85 * k})`);
                ctx.strokeStyle = lg;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.stroke();
            }

            raf = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            const oldW = w;
            const oldH = h;
            setSize();
            const xR = w / oldW;
            const yR = h / oldH;
            bgStars.forEach((s) => {
                s.x *= xR;
                s.y *= yR;
            });
        };

        window.addEventListener('resize', handleResize);
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default Starfield;
