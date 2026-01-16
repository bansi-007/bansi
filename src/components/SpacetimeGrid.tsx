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

            // Physics settings
            const dampening = 0.1; // Restoring force
            const tension = 0.05; // Stiffness

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
                    // Push away or Pull in? Let's do a "Mass" effect (Pull in/Warp)
                    // Actually, a ripple push is often more visually detectable
                    const force = (maxDist - dist) / maxDist;
                    const displacement = force * force * 40;

                    targetX -= Math.cos(angle) * displacement;
                    targetY -= Math.sin(angle) * displacement;
                }

                // Add sublte floating wave (Quantum fluctuations)
                targetX += Math.sin(time + p.basePathY * 0.05) * 2;
                targetY += Math.cos(time + p.basePathX * 0.05) * 2;

                // Simple Lerp (Linear Interpolation) for smoothness
                p.x += (targetX - p.x) * 0.1;
                p.y += (targetY - p.y) * 0.1;

                // Draw Point
                ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
                ctx.fillRect(p.x, p.y, 2, 2);
            });

            // Draw Grid Lines
            // Note: Drawing full lines each frame is expensive. We'll draw only connections to neighbors.
            // Optimization: Only draw lines if we can handle it. 800x600 grid is manageable.

            ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
            ctx.beginPath();

            // Since points array is flat, we need to index correctly.
            // i = col, j = row. index = i * (rows + 1) + j

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
            // Ideally we re-init points here, but for simplicity we'll just let it be or reload page
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
                opacity: 0.6
            }}
        />
    );
};

export default SpacetimeGrid;
