'use client';

import { useEffect, useRef } from 'react';

const SpacetimeGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const gap = 40; // Distance between points
        const cols = Math.ceil(width / gap);
        const rows = Math.ceil(height / gap);

        // Grid points
        const points: { x: number, y: number, basePathX: number, basePathY: number }[] = [];

        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                points.push({
                    x: i * gap,
                    y: j * gap,
                    basePathX: i * gap,
                    basePathY: j * gap
                });
            }
        }

        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dotColor = isDark ? 'rgba(96, 165, 250, 0.45)' : 'rgba(37, 99, 235, 0.35)';
        const lineColor = isDark ? 'rgba(96, 165, 250, 0.18)' : 'rgba(37, 99, 235, 0.13)';

        let mouseX = -1000;
        let mouseY = -1000;
        let time = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            time += 0.01;

            points.forEach(p => {
                // Distance to mouse
                const dx = p.basePathX - mouseX;
                const dy = p.basePathY - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 250;

                // Gravitational Warp Effect (General Relativity style)
                let targetX = p.basePathX;
                let targetY = p.basePathY;

                if (dist < maxDist) {
                    const angle = Math.atan2(dy, dx);
                    const force = (maxDist - dist) / maxDist;
                    const displacement = force * force * 40;

                    targetX -= Math.cos(angle) * displacement;
                    targetY -= Math.sin(angle) * displacement;
                }

                // Subtle floating wave (quantum fluctuations)
                targetX += Math.sin(time + p.basePathY * 0.05) * 2;
                targetY += Math.cos(time + p.basePathX * 0.05) * 2;

                // Lerp for smooth motion
                p.x += (targetX - p.x) * 0.1;
                p.y += (targetY - p.y) * 0.1;

                // Draw Point
                ctx.fillStyle = dotColor;
                ctx.fillRect(p.x, p.y, 2, 2);
            });

            // Draw Grid Lines
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const idx = i * (rows + 1) + j;
                    const p = points[idx];

                    if (!p) continue;

                    // Right neighbor
                    if (i < cols) {
                        const rightIdx = (i + 1) * (rows + 1) + j;
                        const rightP = points[rightIdx];
                        if (rightP) {
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(rightP.x, rightP.y);
                        }
                    }

                    // Bottom neighbor
                    if (j < rows) {
                        const bottomIdx = i * (rows + 1) + (j + 1);
                        const bottomP = points[bottomIdx];
                        if (bottomP) {
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(bottomP.x, bottomP.y);
                        }
                    }
                }
            }
            ctx.stroke();

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
            window.removeEventListener('mousemove', handleMouseMove);
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
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 1
            }}
        />
    );
};

export default SpacetimeGrid;
