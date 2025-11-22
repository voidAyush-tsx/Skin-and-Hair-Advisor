import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, X } from 'lucide-react';

interface WebcamCaptureProps {
    onCapture: (imageSrc: string, file: File) => void;
    onClose: () => void;
}

export function WebcamCapture({ onCapture, onClose }: WebcamCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [faceDetected, setFaceDetected] = useState(false);
    const animationRef = useRef<number>();

    // Simulated face detection (for the visual effect)
    useEffect(() => {
        // Simulate face detection after a short delay
        const timer = setTimeout(() => {
            setFaceDetected(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Draw face mesh overlay (sci-fi effect)
    useEffect(() => {
        if (!faceDetected || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let pulse = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid pattern
            ctx.strokeStyle = `rgba(2, 132, 199, ${0.3 + Math.sin(pulse) * 0.2})`;
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < canvas.width; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw face outline (simplified rectangle for now)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const faceWidth = 200;
            const faceHeight = 260;

            ctx.strokeStyle = `rgba(2, 132, 199, ${0.8 + Math.sin(pulse) * 0.2})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(
                centerX - faceWidth / 2,
                centerY - faceHeight / 2,
                faceWidth,
                faceHeight
            );

            // Corner markers
            const markerSize = 20;
            const corners = [
                [centerX - faceWidth / 2, centerY - faceHeight / 2], // Top-left
                [centerX + faceWidth / 2, centerY - faceHeight / 2], // Top-right
                [centerX - faceWidth / 2, centerY + faceHeight / 2], // Bottom-left
                [centerX + faceWidth / 2, centerY + faceHeight / 2], // Bottom-right
            ];

            ctx.strokeStyle = `rgba(3, 255, 166, ${0.9 + Math.sin(pulse * 2) * 0.1})`;
            ctx.lineWidth = 3;
            corners.forEach(([x, y]) => {
                // Horizontal lines
                ctx.beginPath();
                ctx.moveTo(x - markerSize, y);
                ctx.lineTo(x + markerSize, y);
                ctx.stroke();

                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(x, y - markerSize);
                ctx.lineTo(x, y + markerSize);
                ctx.stroke();
            });

            // Scanning line effect
            const scanY = ((pulse * 50) % canvas.height);
            ctx.strokeStyle = `rgba(3, 255, 166, ${0.5 + Math.sin(pulse * 3) * 0.3})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(canvas.width, scanY);
            ctx.stroke();

            pulse += 0.05;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [faceDetected]);

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // Convert base64 to file
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
                    onCapture(imageSrc, file);
                });
        }
    }, [onCapture]);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                    <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Camera className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Facial Scan Mode</h3>
                                <p className="text-xs text-slate-400">
                                    {faceDetected ? 'Face detected - Ready to capture' : 'Initializing scanner...'}
                                </p>
                            </div>
                        </div>
                        {faceDetected && (
                            <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                                Locked
                            </div>
                        )}
                    </div>

                    <div className="relative aspect-[4/3] bg-black">
                        {/* Webcam feed */}
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 1280,
                                height: 960,
                                facingMode: 'user'
                            }}
                            onUserMedia={() => setIsLoading(false)}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Canvas overlay for face mesh */}
                        <canvas
                            ref={canvasRef}
                            width={640}
                            height={480}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        />

                        {/* Loading state */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-3" />
                                    <p className="text-white text-sm">Initializing camera...</p>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        {!isLoading && !faceDetected && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm border border-slate-700">
                                Position your face in the center
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-slate-900 flex justify-center gap-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCapture}
                            disabled={!faceDetected}
                            className="bg-primary hover:bg-primary/90 min-w-[140px]"
                        >
                            <Camera className="h-4 w-4 mr-2" />
                            Capture Image
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
