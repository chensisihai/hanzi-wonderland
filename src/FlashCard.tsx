import React, { useState, useRef } from 'react';

// 🔥 新增 prop: showMic (是否显示麦克风)
const FlashCard = ({ data, isLearned, onToggleLearn, onClick, feedbackType, showMic = false, onOpenWriter }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const [activeCharId, setActiveCharId] = useState(null);

  const recognitionRef = useRef(null);

  const kaitiStyle = {
    fontFamily: '"KaiTi", "STKaiti", "楷体", "SimSun", "宋体", serif'
  };

  const speak = (text) => {
    if (isListening) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 1.0; 
    window.currentUtterance = u; 
    window.speechSynthesis.speak(u);
  };

  // --- 🎙️ 语音识别 ---
  const startListening = (e) => {
    e.stopPropagation();
    
    // 检查浏览器支持
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("请使用 Chrome 浏览器体验语音功能哦");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN'; 
      recognition.continuous = false; 
      recognition.interimResults = false; 

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.includes(data.char)) {
          handleCorrectPronunciation();
        } else {
          speak("好像不对哦，再试一次");
        }
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        speak("没听清，请大声一点");
      };

      recognitionRef.current = recognition;
    }
    recognitionRef.current.start();
  };

  const handleCorrectPronunciation = () => {
    speak("读对啦！真棒！");
    setTimeout(() => {
      setIsFlipped(true); // 读对自动翻面奖励
    }, 500);
  };

  // --- 交互 ---
  const handleFlip = (e) => {
    if (onClick) { onClick(); return; }
    if (isListening) return; 
    if (!isFlipped) speak(data.char);
    setIsFlipped(!isFlipped);
  };

  const handleCharClick = (e, char, id) => {
    e.stopPropagation(); 
    e.preventDefault();
    setActiveCharId(id);
    speak(char);
    setTimeout(() => setActiveCharId(null), 2000); 
  };

  const stopPropagation = (e) => e.stopPropagation();

  const handleLearnClick = (e) => {
    e.stopPropagation();
    onToggleLearn();
    if (!isLearned) speak("太棒了！放入宝藏箱！");
  };

  const shakeClass = feedbackType === 'wrong' ? 'animate-[shake_0.5s_ease-in-out]' : '';
  const borderClass = feedbackType === 'wrong' 
    ? 'border-red-400 ring-4 ring-red-200' 
    : 'border-white shadow-xl hover:shadow-2xl hover:-translate-y-1';

  return (
    <div className={`group h-96 w-64 cursor-pointer [perspective:1000px] transition-all duration-300 ${shakeClass}`}>
      <div className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* 正面 */}
        <div onClick={handleFlip} className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-[6px] bg-[#FFFDF5] z-20 ${borderClass} [backface-visibility:hidden]`}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] rounded-2xl pointer-events-none"></div>
          
          <span className="text-3xl text-gray-400 mb-2 font-medium tracking-widest" style={kaitiStyle}>{data.pinyin}</span>
          <span className="text-9xl font-bold text-gray-800 drop-shadow-sm select-none" style={kaitiStyle}>{data.char}</span>
          
          {/* 🔥 关键修改：只有 showMic 为 true 时才显示麦克风 */}
          {/* 底部工具栏：麦克风 + 写字笔 */}
          {showMic && !onClick && (
            <div className="absolute bottom-8 flex gap-4">
              {/* 麦克风 */}
              <button
                onClick={startListening}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all border-2
                  ${isListening 
                    ? 'bg-red-500 text-white border-red-500 animate-pulse' 
                    : 'bg-white text-blue-500 border-blue-100 hover:bg-blue-50'}
                `}
              >
                {isListening ? (
                   <div className="flex gap-1 h-4 items-center"><div className="w-1 bg-white animate-wave h-full"></div><div className="w-1 bg-white animate-wave h-4"></div><div className="w-1 bg-white animate-wave h-6"></div></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
                )}
              </button>

              {/* 🔥 新增：魔法写字笔 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // 这里的 onOpenWriter 需要从 props 里解构出来
                  // 所以请确保组件开头是： const FlashCard = ({ ..., onOpenWriter }) => {
                  if (onOpenWriter) onOpenWriter(data);
                }}
                className="w-14 h-14 bg-white text-indigo-500 rounded-full border-2 border-indigo-100 flex items-center justify-center shadow-md hover:bg-indigo-50 hover:scale-110 transition-all"
              >
                <span className="text-2xl">🖌️</span>
              </button>
            </div>
          )}

          {isLearned && !feedbackType && <div className="absolute top-2 right-2 text-3xl animate-bounce-slow">🌟</div>}
          {feedbackType === 'wrong' && <div className="absolute inset-0 flex items-center justify-center bg-red-100/80 rounded-2xl"><span className="text-8xl">❌</span></div>}
        </div>

        {/* 背面 (保持不变) */}
        <div className="absolute inset-0 flex flex-col rounded-3xl border-[6px] border-white bg-white shadow-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] z-10">
           <div onClick={handleFlip} className="h-[45%] w-full relative bg-gray-100 cursor-pointer">
              <img src={data.image} alt={data.char} className="object-cover w-full h-full pointer-events-none" onError={(e) => {e.target.onerror = null; e.target.src = `https://placehold.co/400x300/e2e8f0/1e293b?text=${encodeURIComponent(data.char)}&font=serif`;}}/>
              <div className="absolute bottom-2 left-3 text-white pointer-events-none"><span className="text-6xl font-bold mr-2 drop-shadow-md" style={kaitiStyle}>{data.char}</span></div>
           </div>
           <div className="flex-1 flex flex-col justify-between px-2 py-3 bg-[#FFF5F7] cursor-default" onClick={stopPropagation}> 
              <div className="flex-1 flex flex-col gap-2 items-center justify-center overflow-y-auto">
                {data.words.map((word, wIndex) => (
                  <div key={wIndex} className="flex items-center bg-white rounded-xl px-2 py-1 shadow-sm border border-pink-100 shrink-0">
                    {word.split('').map((char, cIndex) => {
                      const uniqueId = `${data.id}-${wIndex}-${cIndex}`;
                      const isActive = activeCharId === uniqueId;
                      return <div key={cIndex} onClick={(e) => handleCharClick(e, char, uniqueId)} className={`mx-1 px-2 py-1 rounded-lg text-2xl cursor-pointer select-none transition-all duration-200 ${isActive ? 'bg-pink-500 text-white scale-110 shadow-md' : 'text-gray-700 hover:text-pink-500 hover:bg-pink-50'}`} style={kaitiStyle}>{char}</div>;
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-2 shrink-0">
                <button onClick={handleLearnClick} className={`flex items-center justify-center space-x-2 px-6 py-2 rounded-full border-2 transition-all active:scale-95 cursor-pointer ${isLearned ? 'bg-yellow-50 border-yellow-400 text-yellow-600 shadow-inner' : 'bg-white border-gray-200 text-gray-400 hover:border-pink-300 hover:text-pink-400 shadow-sm'}`}><span className="text-2xl">{isLearned ? '⭐️' : '☆'}</span><span className="text-lg font-bold" style={kaitiStyle}>{isLearned ? '已学会' : '标记学会'}</span></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
export default FlashCard;