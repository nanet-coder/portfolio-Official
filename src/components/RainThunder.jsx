import { useEffect, useRef } from "react";

export default function RainThunder() {
    const canvasRef = useRef(null);
    const thunderRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const thunder = new Audio("https://freesound.org/data/previews/341/341695_5260871-lq.mp3");
        thunderRef.current = thunder;

        // --- ការកំណត់គ្រាប់ភ្លៀង ---
        const smallDrops = [];
        const bigDrops = [];

        // គ្រាប់ភ្លៀងតូចបំផុត (Tiny Mist) - ចំនួន ៤០០ គ្រាប់
        for (let i = 0; i < 400; i++) {
            smallDrops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 2 + 1, // តូចខ្លាំង (1px - 3px)
                velocity: Math.random() * 8 + 8,
            });
        }

        // គ្រាប់ភ្លៀងធំ (Fat Drops) - ចំនួន ៤០ គ្រាប់
        for (let i = 0; i < 40; i++) {
            bigDrops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 15 + 10,
                velocity: Math.random() * 4 + 4,
                width: 2.5,
                opacity: Math.random() * 0.3 + 0.2
            });
        }

        let lightning = null;

        const drawLightning = () => {
            if (!lightning) return;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "white";
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(lightning.x, lightning.y);
            lightning.segments.forEach(seg => ctx.lineTo(seg.x, seg.y));
            ctx.stroke();
            ctx.shadowBlur = 0;
            lightning.life--;
            if (lightning.life <= 0) lightning = null;
        };

        const generateLightning = () => {
            const startX = Math.random() * width;
            const segments = [];
            let x = startX, y = 0;
            for (let i = 0; i < 12; i++) {
                x += (Math.random() - 0.5) * 100;
                y += Math.random() * 80 + 20;
                segments.push({ x, y });
                if (y > height) break;
            }
            lightning = { x: startX, y: 0, segments, life: 6 };
            setTimeout(() => {
                if (thunderRef.current) {
                    thunderRef.current.currentTime = 0;
                    thunderRef.current.play().catch(() => { });
                }
            }, 100);
        };

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
            ctx.fillRect(0, 0, width, height);

            // ១. គូរគ្រាប់ភ្លៀងតូចៗ (ស្តើងដូចសសៃអំបោះ)
            ctx.strokeStyle = "rgba(174, 194, 224, 0.2)";
            ctx.lineWidth = 0.5; // ស្តើងបំផុត
            smallDrops.forEach(d => {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.length);
                ctx.stroke();
                d.y += d.velocity;
                if (d.y > height) d.y = -d.length;
            });

            // ២. គូរគ្រាប់ភ្លៀងធំ
            bigDrops.forEach(d => {
                ctx.strokeStyle = `rgba(200, 225, 255, ${d.opacity})`;
                ctx.lineWidth = d.width;
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.length);
                ctx.stroke();
                d.y += d.velocity;
                if (d.y > height) {
                    d.y = -d.length;
                    d.x = Math.random() * width;
                }
            });

            if (!lightning && Math.random() < 0.005) generateLightning();
            drawLightning();

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full bg-black pointer-events-none z-0"
        />
    );
}