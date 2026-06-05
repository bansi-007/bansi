'use client';

import { useEffect, useRef } from 'react';

interface Planet {
    name: string;
    a: number;
    sizeR: number;
    color: string;
    haloColor?: string;
    period: number;
    phase: number;
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

interface Asteroid {
    a: number;        // orbit radius
    phase: number;
    period: number;
    size: number;
    alpha: number;
}

interface Comet {
    a: number;        // semi-major axis (px)
    e: number;        // eccentricity (0..1)
    argP: number;     // rotation of the orbit ellipse
    period: number;   // seconds per orbit
    phase: number;    // starting mean angle
    size: number;
    tailColor: string;  // rgb triplet
}

interface Galaxy {
    x: number;
    y: number;
    rx: number;          // semi-major axis of the glow
    ry: number;          // semi-minor
    rot: number;         // rotation
    hue: string;         // base rgb
    coreHue: string;     // brighter core rgb
    type: 'spiral' | 'elliptical';
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
        let scale = 1;
        const tiltY = 0.42;

        const setSize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            centerX = w * 0.5;
            centerY = h * 0.58;
            const shorter = Math.min(w, h);
            scale = shorter / 1100;
            if (scale < 0.55) scale = 0.55;
        };
        setSize();

        // Background stars (deep field)
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

        // Distant galaxies — placed in viewport margins, static, soft glow
        const galaxies: Galaxy[] = [
            {
                x: w * 0.08, y: h * 0.18,
                rx: 110, ry: 42, rot: -0.5,
                hue: '170, 130, 220', coreHue: '230, 220, 255',
                type: 'spiral',
            },
            {
                x: w * 0.92, y: h * 0.12,
                rx: 70, ry: 55, rot: 0.4,
                hue: '255, 180, 200', coreHue: '255, 230, 230',
                type: 'elliptical',
            },
            {
                x: w * 0.88, y: h * 0.88,
                rx: 95, ry: 36, rot: 0.9,
                hue: '130, 200, 255', coreHue: '220, 240, 255',
                type: 'spiral',
            },
        ];

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

        // Asteroid belt — between Mars (210) and Jupiter (290)
        const asteroids: Asteroid[] = [];
        const beltCount = 130;
        for (let i = 0; i < beltCount; i++) {
            const a = 232 + Math.random() * 36;     // 232 .. 268
            asteroids.push({
                a,
                phase: Math.random() * Math.PI * 2,
                period: 60 + a * 0.18 + Math.random() * 10,
                size: 0.35 + Math.random() * 0.55,
                alpha: 0.45 + Math.random() * 0.45,
            });
        }

        // Comets — highly elliptical
        const comets: Comet[] = [
            { a: 360, e: 0.78, argP: 0.6,  period: 180, phase: Math.random() * Math.PI * 2, size: 1.6, tailColor: '210, 230, 255' },
            { a: 470, e: 0.86, argP: -1.1, period: 260, phase: Math.random() * Math.PI * 2, size: 1.4, tailColor: '255, 230, 200' },
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

        // Static galaxy buffer — pre-render to offscreen so animation is cheap
        const galaxyCanvas = document.createElement('canvas');
        galaxyCanvas.width = canvas.width;
        galaxyCanvas.height = canvas.height;
        const gctx = galaxyCanvas.getContext('2d');

        const renderGalaxies = () => {
            if (!gctx) return;
            gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            gctx.clearRect(0, 0, w, h);
            for (const g of galaxies) {
                gctx.save();
                gctx.translate(g.x, g.y);
                gctx.rotate(g.rot);

                // Outer halo
                const outer = gctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(g.rx, g.ry));
                outer.addColorStop(0, `rgba(${g.coreHue}, 0.42)`);
                outer.addColorStop(0.25, `rgba(${g.hue}, 0.18)`);
                outer.addColorStop(0.7, `rgba(${g.hue}, 0.05)`);
                outer.addColorStop(1, `rgba(${g.hue}, 0)`);
                gctx.fillStyle = outer;
                gctx.beginPath();
                gctx.ellipse(0, 0, g.rx, g.ry, 0, 0, Math.PI * 2);
                gctx.fill();

                if (g.type === 'spiral') {
                    // Two faint arms — slightly offset ellipses
                    gctx.globalAlpha = 0.35;
                    for (let arm = 0; arm < 2; arm++) {
                        gctx.rotate(Math.PI);
                        const arc = gctx.createLinearGradient(-g.rx, 0, g.rx, 0);
                        arc.addColorStop(0, `rgba(${g.hue}, 0)`);
                        arc.addColorStop(0.5, `rgba(${g.coreHue}, 0.35)`);
                        arc.addColorStop(1, `rgba(${g.hue}, 0)`);
                        gctx.strokeStyle = arc;
                        gctx.lineWidth = 4;
                        gctx.beginPath();
                        gctx.ellipse(0, 0, g.rx * 0.7, g.ry * 0.8, 0.3, 0, Math.PI * 2);
                        gctx.stroke();
                    }
                    gctx.globalAlpha = 1;
                }

                // Bright core
                const core = gctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(g.rx, g.ry) * 0.35);
                core.addColorStop(0, `rgba(${g.coreHue}, 0.85)`);
                core.addColorStop(1, `rgba(${g.coreHue}, 0)`);
                gctx.fillStyle = core;
                gctx.beginPath();
                gctx.ellipse(0, 0, Math.min(g.rx, g.ry) * 0.4, Math.min(g.rx, g.ry) * 0.3, 0, 0, Math.PI * 2);
                gctx.fill();

                gctx.restore();
            }
        };
        renderGalaxies();

        const start = performance.now();
        let raf = 0;

        const drawOrbit = (rx: number, ry: number, alpha = 0.06) => {
            ctx.strokeStyle = `rgba(170, 200, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
        };

        const drawSun = (time: number) => {
            const pulse = 1 + Math.sin(time * 0.6) * 0.04;
            const r = 18 * scale * pulse;

            const farR = r * 9;
            const g1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, farR);
            g1.addColorStop(0, 'rgba(255, 210, 130, 0.35)');
            g1.addColorStop(0.25, 'rgba(255, 180, 90, 0.12)');
            g1.addColorStop(1, 'rgba(255, 180, 90, 0)');
            ctx.fillStyle = g1;
            ctx.fillRect(centerX - farR, centerY - farR, farR * 2, farR * 2);

            const innR = r * 3.5;
            const g2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innR);
            g2.addColorStop(0, 'rgba(255, 230, 170, 1)');
            g2.addColorStop(0.5, 'rgba(255, 200, 120, 0.6)');
            g2.addColorStop(1, 'rgba(255, 200, 120, 0)');
            ctx.fillStyle = g2;
            ctx.fillRect(centerX - innR, centerY - innR, innR * 2, innR * 2);

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

            ctx.clearRect(0, 0, w, h);

            // Distant galaxies (deep background, pre-rendered)
            ctx.drawImage(galaxyCanvas, 0, 0, w, h);

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

            // Planet orbits
            for (const p of planets) {
                const rx = p.a * scale;
                const ry = rx * tiltY;
                drawOrbit(rx, ry);
            }

            // Asteroid belt — faint ring band hint
            drawOrbit(250 * scale, 250 * scale * tiltY, 0.03);

            // Sun
            drawSun(time);

            // Asteroids
            for (const ast of asteroids) {
                const rx = ast.a * scale;
                const ry = rx * tiltY;
                const theta = ast.phase + (time / ast.period) * Math.PI * 2;
                const px = centerX + rx * Math.cos(theta);
                const py = centerY + ry * Math.sin(theta);
                ctx.fillStyle = `rgba(220, 210, 200, ${ast.alpha})`;
                ctx.beginPath();
                ctx.arc(px, py, ast.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Planets
            for (const p of planets) {
                const rx = p.a * scale;
                const ry = rx * tiltY;
                const theta = p.phase + (time / p.period) * Math.PI * 2;
                const px = centerX + rx * Math.cos(theta);
                const py = centerY + ry * Math.sin(theta);

                if (p.haloColor) {
                    const haloR = p.sizeR * scale * 5;
                    const grad = ctx.createRadialGradient(px, py, 0, px, py, haloR);
                    grad.addColorStop(0, `rgba(${p.haloColor}, 0.55)`);
                    grad.addColorStop(0.35, `rgba(${p.haloColor}, 0.15)`);
                    grad.addColorStop(1, `rgba(${p.haloColor}, 0)`);
                    ctx.fillStyle = grad;
                    ctx.fillRect(px - haloR, py - haloR, haloR * 2, haloR * 2);
                }

                if (p.hasRing) {
                    const ringRX = p.sizeR * scale * 2.1;
                    const ringRY = ringRX * 0.35;
                    ctx.strokeStyle = 'rgba(230, 210, 160, 0.55)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.ellipse(px, py, ringRX, ringRY, -0.25, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(px, py, p.sizeR * scale, 0, Math.PI * 2);
                ctx.fill();
            }

            // Comets — elliptical orbit with Sun at one focus, tail points away from Sun
            for (const c of comets) {
                const rx = c.a * scale;
                const ry = rx * Math.sqrt(1 - c.e * c.e);
                const cx = -c.a * c.e * scale; // ellipse-center offset from Sun (along orbit-local x)

                const theta = c.phase + (time / c.period) * Math.PI * 2;
                const ex = cx + rx * Math.cos(theta);
                const ey = ry * Math.sin(theta);

                // Apply argument-of-perihelion rotation, then tilt
                const cosA = Math.cos(c.argP);
                const sinA = Math.sin(c.argP);
                const localX = ex * cosA - ey * sinA;
                const localY = (ex * sinA + ey * cosA) * tiltY;
                const px = centerX + localX;
                const py = centerY + localY;

                // Distance to Sun → tail brightness/length
                const dx = px - centerX;
                const dy = py - centerY;
                const dist = Math.hypot(dx, dy);
                const closeness = Math.max(0, 1 - dist / (c.a * scale * 1.4));
                const tailLen = 70 * scale * (0.3 + closeness * 1.4);
                const tailAlpha = 0.15 + closeness * 0.6;

                if (dist > 0.001) {
                    const ux = dx / dist;
                    const uy = dy / dist;
                    const tx = px + ux * tailLen;
                    const ty = py + uy * tailLen;

                    const grad = ctx.createLinearGradient(px, py, tx, ty);
                    grad.addColorStop(0, `rgba(${c.tailColor}, ${tailAlpha})`);
                    grad.addColorStop(0.45, `rgba(${c.tailColor}, ${tailAlpha * 0.35})`);
                    grad.addColorStop(1, `rgba(${c.tailColor}, 0)`);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 2.2;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(tx, ty);
                    ctx.stroke();
                }

                // Comet head (bright core + small halo)
                const headR = c.size * scale * 6;
                const headGrad = ctx.createRadialGradient(px, py, 0, px, py, headR);
                headGrad.addColorStop(0, `rgba(${c.tailColor}, 0.85)`);
                headGrad.addColorStop(0.4, `rgba(${c.tailColor}, 0.2)`);
                headGrad.addColorStop(1, `rgba(${c.tailColor}, 0)`);
                ctx.fillStyle = headGrad;
                ctx.fillRect(px - headR, py - headR, headR * 2, headR * 2);

                ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
                ctx.beginPath();
                ctx.arc(px, py, c.size * scale, 0, Math.PI * 2);
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
            galaxies.forEach((g) => {
                g.x *= xR;
                g.y *= yR;
            });
            galaxyCanvas.width = canvas.width;
            galaxyCanvas.height = canvas.height;
            renderGalaxies();
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
