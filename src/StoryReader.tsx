// 移除未使用的 React 引用，或者保留但忽略
import { useState, useMemo, useEffect, useRef } from 'react';

// 给 props 加上 : any
const StoryReader = ({ story, onBack, onExit }: any) => {
  const [readIds, setReadIds] = useState(new Set());
  const [pageIndex, setPageIndex] = useState(0);
  
  // 修复：使用 any 解决 null 和 number 类型冲突
  const playTimer = useRef<any>(null);

  const kaitiStyle = {
    fontFamily: '"KaiTi", "STKaiti", "楷体", "SimSun", "宋体", serif'
  };

  const validStory = story && story.pages ? story : {
    title: "未找到故事",
    pages: [{ image: "", text: "暂无内容" }]
  };

  const currentPage = validStory.pages[pageIndex];
  const totalPages = validStory.pages.length;
  const isLastPage = pageIndex === totalPages - 1;

  // 修复：reduce 参数加 any
  const totalChars = useMemo(() => {
    return validStory.pages.reduce((acc: any, page: any) => acc + page.text.length, 0);
  }, [validStory]);

  const progress = totalChars > 0 ? Math.round((readIds.size / totalChars) * 100) : 0;

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (playTimer.current) clearTimeout(playTimer.current);
    };
  }, []);

  const speak = (text: any) => {
    if (['，', '。', '！', '？', '“', '”', '：', ' '].includes(text)) return;
    
    window.speechSynthesis.cancel();
    if (playTimer.current) {
      clearTimeout(playTimer.current);
    }

    playTimer.current = setTimeout(() => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      u.rate = 1.0; 
      
      // 修复：window 强转 any
      (window as any).currentUtterance = u; 
      window.speechSynthesis.speak(u);
    }, 50);
  };

  const handleCharClick = (char: any, cIndex: any) => {
    speak(char);

    const uniqueId = `${pageIndex}-${cIndex}`;
    setReadIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(uniqueId);
      return newSet;
    });
  };

  const handlePrev = (e: any) => {
    e.stopPropagation(); 
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleNext = (e: any) => {
    e.stopPropagation();
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] flex flex-col items-center py-6 px-4">
      
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={onExit}
          className="bg-white text-gray-500 hover:text-pink-500 px-5 py-2 rounded-full shadow-sm border border-gray-200 font-bold transition-all"
          style={kaitiStyle}
        >
          退出
        </button>
        
        <div className="bg-white px-4 py-2 rounded-full text-pink-500 shadow-sm border border-pink-100 font-bold flex items-center gap-2" style={kaitiStyle}>
          <span>📖</span>
          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-pink-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl flex-1 flex flex-col mb-4">
        
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white flex flex-col flex-1 relative animate-[fadeIn_0.3s_ease-out]">
            
            <div className="w-full h-1/2 bg-gray-100 relative group">
              <img 
                src={currentPage.image} 
                alt={`第${pageIndex + 1}页`}
                className="w-full h-full object-cover"
                // 修复：e 强转 any 以解决 e.target.onerror 报错
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/800x600/ffe4e6/ec4899?text=绘本插图-${pageIndex + 1}&font=serif`;
                }}
              />
              
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-pink-500 font-bold shadow-sm z-10" style={kaitiStyle}>
                 第 {pageIndex + 1} / {totalPages} 页
              </div>

              {pageIndex > 0 && (
                <button 
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-pink-500 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 z-20 backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}

              <button 
                onClick={handleNext}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 z-20 backdrop-blur-sm
                  ${isLastPage 
                    ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 animate-bounce-slow' 
                    : 'bg-white/80 hover:bg-white text-pink-500'} 
                `}
              >
                {isLastPage ? (
                  <span className="text-2xl">🏆</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </button>

            </div>

            <div className="w-full h-1/2 bg-[#FFFDF5] p-6 md:p-10 flex flex-col items-center justify-center">
              
              <div className="flex flex-wrap justify-center gap-4 content-center">
                {currentPage.text.split('').map((char: any, cIndex: any) => {
                  const uniqueId = `${pageIndex}-${cIndex}`;
                  const isRead = readIds.has(uniqueId);
                  
                  return (
                    <span
                      key={cIndex}
                      onClick={() => handleCharClick(char, cIndex)}
                      className={`
                        inline-flex items-center justify-center
                        w-16 h-16 md:w-20 md:h-20 rounded-2xl 
                        text-5xl md:text-6xl cursor-pointer select-none transition-all duration-200
                        ${isRead 
                          ? 'bg-pink-500 text-white shadow-lg scale-110 -translate-y-2' 
                          : 'bg-pink-50 text-gray-700 hover:bg-pink-100 hover:-translate-y-1' 
                        }
                      `}
                      style={kaitiStyle}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>

            </div>
            
        </div>

      </div>

    </div>
  );
};

export default StoryReader;