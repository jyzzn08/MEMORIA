import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, Check, PenTool } from 'lucide-react';

interface SignatureCanvasProps {
  onSaveSignature: (dataUrl: string | null) => void;
  savedSignature: string | null;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onSaveSignature,
  savedSignature,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const hasDrawnRef = useRef(false);

  // Initialize Canvas with proper Retina scaling and dimension preservation
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const newWidth = Math.floor(rect.width * dpr);
    const newHeight = Math.floor(rect.height * dpr);

    // If canvas is already sized correctly, avoid re-clearing
    if (canvas.width === newWidth && canvas.height === newHeight) {
      return;
    }

    // Preserve existing drawing if canvas is being resized
    let prevData: string | null = null;
    if (hasDrawnRef.current) {
      try {
        prevData = canvas.toDataURL();
      } catch (err) {
        // ignore
      }
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#1c1917'; // Charcoal ink

    if (prevData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = prevData;
    }
  }, []);

  // Use ResizeObserver for accurate sizing when modal opens
  useEffect(() => {
    setupCanvas();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setupCanvas();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [setupCanvas]);

  // Synchronize canvas when savedSignature prop is reset to null
  useEffect(() => {
    if (!savedSignature) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        }
      }
      hasDrawnRef.current = false;
      setHasDrawn(false);
    }
  }, [savedSignature]);

  // Coordinates helper for mouse & touch
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Start drawing
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Draw initial dot so single clicks or taps are recorded
    ctx.lineTo(x, y);
    ctx.stroke();

    setIsDrawing(true);
    hasDrawnRef.current = true;
    setHasDrawn(true);
  };

  // Draw move
  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    if (e.cancelable) {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasDrawnRef.current = true;
    setHasDrawn(true);
  };

  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas && hasDrawnRef.current) {
        const dataUrl = canvas.toDataURL('image/png');
        onSaveSignature(dataUrl);
      }
    }
  };

  // Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    hasDrawnRef.current = false;
    setHasDrawn(false);
    onSaveSignature(null);
  };

  // Explicit "Simpan Tanda Tangan" button handler
  const handleExplicitSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawnRef.current) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSaveSignature(dataUrl);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-amber-700" />
          <span>Tanda Tangan Digital (Canvas API)</span>
          <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          {savedSignature && hasDrawn && (
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Tanda tangan tersimpan
            </span>
          )}
        </div>
      </div>

      {/* Canvas Box */}
      <div
        ref={containerRef}
        className="relative w-full h-36 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl overflow-hidden hover:border-stone-400 transition-colors"
      >
        <canvas
          id="digital-signature-canvas"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {/* Guidance watermark if empty */}
        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-stone-400 select-none">
            <p className="font-handwriting text-2xl text-stone-400">
              Goreskan tanda tangan di sini...
            </p>
            <p className="text-[10px] text-stone-400 mt-1">
              (Gunakan kursor mouse atau sentuhan jari / stylus)
            </p>
          </div>
        )}
      </div>

      {/* Canvas Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          id="btn-clear-signature"
          onClick={clearCanvas}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Hapus</span>
        </button>

        <button
          type="button"
          id="btn-save-signature"
          onClick={handleExplicitSave}
          disabled={!hasDrawn}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            hasDrawn
              ? 'bg-stone-800 text-stone-100 hover:bg-stone-900 shadow-2xs'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span>Simpan Tanda Tangan</span>
        </button>
      </div>
    </div>
  );
};
