import { useEffect, useRef } from "react";

export default function RainThunder() {
    const canvasRef = useRef(null);
    const thunderRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Load thunder sound
        const thunder = new Audio(
            "https://freesound.org/data/previews/341/341695_5260871-lq.mp3"
        );
        thunderRef.current = thunder;

        // Raindrops
        const drops = [];
        const maxDrops = 250;

        for (let i = 0; i < maxDrops; i++) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 20 + 10,
                velocity: Math.random() * 4 + 4,
            });
        }

        // Lightning
        let lightning = null;

        const drawLightning = () => {
            if (!lightning) return;

            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lightning.x, lightning.y);

            lightning.segments.forEach((seg) => {
                ctx.lineTo(seg.x, seg.y);
            });
            ctx.stroke();

            lightning.life--;
            if (lightning.life <= 0) lightning = null;
        };

        const generateLightning = () => {
            const startX = Math.random() * width;
            const startY = 0;
            const segments = [];
            let x = startX;
            let y = startY;

            const segmentCount = Math.floor(Math.random() * 10 + 10);

            for (let i = 0; i < segmentCount; i++) {
                x += (Math.random() - 0.5) * 50; // horizontal wiggle
                y += Math.random() * 50 + 20; // vertical step
                segments.push({ x, y });
                if (y > height) break;
            }

            lightning = { x: startX, y: startY, segments, life: 5 + Math.floor(Math.random() * 5) };

            // Play thunder after short delay to simulate distance
            setTimeout(() => {
                if (thunderRef.current) {
                    thunderRef.current.currentTime = 0;
                    thunderRef.current.play().catch(() => { });
                }
            }, 300 + Math.random() * 1000); // 0.3–1.3s delay
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw raindrops
            ctx.strokeStyle = "rgba(174,194,224,0.5)";
            ctx.lineWidth = 2;
            ctx.lineCap = "round";

            drops.forEach((drop) => {
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.stroke();

                drop.y += drop.velocity;
                if (drop.y > height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * width;
                    drop.velocity = Math.random() * 4 + 4;
                    drop.length = Math.random() * 20 + 10;
                }
            });

            // Random lightning
            if (!lightning && Math.random() < 0.005) {
                generateLightning();
            }

            drawLightning();

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
}
