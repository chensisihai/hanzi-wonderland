import React, { useRef, useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const MagicWriter = ({ charData, onClose }) => {
  const writerRef = useRef(null);
  const divRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const kaitiStyle = {
    fontFamily: '"KaiTi", "STKaiti", "楷体", "SimSun", "宋体", serif'
  };

  useEffect(() => {
    if (window.HanziWriter) {
      initWriter();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
      script.onload = () => initWriter();
      document.head.appendChild(script);
    }
  }, [charData]);

  const initWriter = () => {
    if (!divRef.current) return;
    divRef.current.innerHTML = '';

    const writer = window.HanziWriter.create(divRef.current, charData.char, {
      width: 320,
      height: 320,
      padding: 20,
      showOutline: true,
      outlineColor: '#E6E6E6', // 极淡底色
      strokeColor: '#333333',
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200,
      drawingWidth: 25,
      showHintAfterMisses: 1,
      highlightOnVariation: true,
    });

    writerRef.current = writer;
    setIsLoaded(true);
    startQuiz(writer);
  };

  const startQuiz = (writer) => {
    writer.quiz({
      onMistake: function() {
        if (navigator.vibrate) navigator.vibrate(50);
      },
      onCorrectStroke: function() {
        playSound('stroke');
      },
      onComplete: function() {
        writer.hideOutline(); // 写完去底
        castMagic();
      }
    });
  };

  const playSound = (type) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'stroke') {
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'magic') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0, now + 1.5);
      osc.start();
      osc.stop(now + 1.5);
    }
  };

  const castMagic = () => {
    setShowMagic(true);
    playSound('magic');
    
    if (divRef.current) {
        const svg = divRef.current.querySelector('svg');
        if (svg) {
            svg.style.transition = 'all 0.8s ease-out';
            svg.style.filter = 'drop-shadow(0 0 10px gold) sepia(100%) saturate(1000%) hue-rotate(0deg)';
            svg.style.transform = 'scale(1.1)';
        }
    }

    setTimeout(() => {
        setIsClosing(true);
        setTimeout(onClose, 500);
    }, 2000);
  };

  const handleAnimate = () => {
    if (writerRef.current) {
      writerRef.current.showOutline();
      writerRef.current.animateCharacter({
        onComplete: () => {
          startQuiz(writerRef.current);
        }
      });
    }
  };

  return (
    <div 
      className={`
        fixed inset-0 bg-black/80 flex flex-col items-center justify-center p-4 backdrop-blur-sm 
        transition-opacity duration-500
        z-[200] 
        ${isClosing ? 'opacity-0' : 'animate-[fadeIn_0.3s_ease-out] opacity-100'}
      `}
    >
      {/* 👆 注意上面的 z-[200]，这确保它盖住一切 */}
      
      {showMagic && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="w-full max-w-md flex justify-between items-center mb-6 text-white">
        <h2 className="text-3xl font-bold" style={kaitiStyle}>写写看：{charData.char}</h2>
        <button onClick={onClose} className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all">
          ❌
        </button>
      </div>

      <div 
        className={`
          relative w-[320px] h-[320px] bg-[#FFFDF5] rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-200
          transition-all duration-500
          ${showMagic ? 'border-yellow-400 shadow-[0_0_50px_gold]' : ''}
        `}
      >
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-400 border-t border-red-400 border-dashed"></div>
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-400 border-l border-red-400 border-dashed"></div>
          <div className="absolute inset-0 border-4 border-red-400"></div>
        </div>

        <div ref={divRef} className="absolute inset-0 z-10 cursor-crosshair"></div>
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-20">
            准备笔墨中...
          </div>
        )}
      </div>

      {!showMagic && (
        <div className="flex gap-6 mt-8 animate-[slideUp_0.3s_ease-out]">
          <button 
            onClick={handleAnimate}
            className="bg-blue-500 text-white w-32 h-14 rounded-full text-xl font-bold shadow-lg border-b-4 border-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            👀 教我写
          </button>
          
          <button 
            onClick={() => {
                writerRef.current.showOutline();
                startQuiz(writerRef.current);
            }}
            className="bg-white text-gray-500 w-16 h-14 rounded-full text-3xl shadow-lg border-b-4 border-gray-300 active:scale-95 transition-all flex items-center justify-center"
            title="重写"
          >
            🧹
          </button>
        </div>
      )}

      {showMagic && (
        <div className="mt-8 text-3xl font-bold text-yellow-400 animate-bounce" style={kaitiStyle}>
          太棒了！
        </div>
      )}

    </div>
  );
};

export default MagicWriter;