import React, { useState } from 'react';
import { generateStoryFromGemini } from './gemini';

const MagicGenerator = ({ treasures, onStoryGenerated, onBack }) => {
  const [selectedChars, setSelectedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const kaitiStyle = {
    fontFamily: '"KaiTi", "STKaiti", "楷体", "SimSun", "宋体", serif'
  };

  // 切换选中状态
  const toggleSelect = (char) => {
    if (selectedChars.includes(char)) {
      setSelectedChars(prev => prev.filter(c => c !== char));
    } else {
      if (selectedChars.length >= 4) return; // 最多选4个
      setSelectedChars(prev => [...prev, char]);
    }
  };

  // ✨ 核心：调用 AI
  const handleGenerate = async () => {
    if (selectedChars.length < 2) return;
    
    setIsLoading(true);
    const story = await generateStoryFromGemini(selectedChars);
    setIsLoading(false);
    
    // 把生成的故事传回给 App
    onStoryGenerated(story);
  };

  // --- 🔮 加载中的魔法动画界面 ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
        <div className="w-40 h-40 bg-purple-500 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="text-8xl mb-8 animate-bounce">🧙‍♂️</div>
        <h2 className="text-3xl font-bold mb-4 animate-pulse" style={kaitiStyle}>
          魔法师 Gemini 正在写故事...
        </h2>
        <p className="text-xl text-purple-200" style={kaitiStyle}>
          正在把【{selectedChars.join(' ')}】变成魔法...
        </p>
        
        {/* 进度条动画 */}
        <div className="w-64 h-2 bg-indigo-800 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 animate-[widthChange_3s_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col items-center p-6 relative overflow-hidden">
      {/* 装饰圆 */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-50"></div>

      {/* 顶部 */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        <button onClick={onBack} className="bg-white text-gray-500 px-6 py-2 rounded-full font-bold shadow-sm" style={kaitiStyle}>
          退出
        </button>
        <h1 className="text-4xl font-bold text-indigo-600" style={kaitiStyle}>✨ 魔法造句工厂</h1>
        <div className="w-20"></div>
      </div>

      {/* 选字区域 */}
      <div className="flex-1 w-full max-w-4xl flex flex-col items-center z-10">
        <p className="text-xl text-gray-600 mb-8" style={kaitiStyle}>
          请从宝藏箱里挑 <span className="text-indigo-600 font-bold text-2xl">2 到 4</span> 个字，交给魔法师！
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {treasures.map((data, index) => {
            const isSelected = selectedChars.includes(data.char);
            return (
              <div
                key={index}
                onClick={() => toggleSelect(data.char)}
                className={`
                  w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-bold cursor-pointer transition-all duration-300 select-none shadow-md border-4
                  ${isSelected 
                    ? 'bg-indigo-500 text-white border-indigo-300 scale-110 rotate-3 shadow-indigo-300' 
                    : 'bg-white text-gray-700 border-white hover:border-indigo-200 hover:-translate-y-1'}
                `}
                style={kaitiStyle}
              >
                {data.char}
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-6 border-t border-indigo-100 flex flex-col items-center z-50">
         <button 
            onClick={handleGenerate}
            disabled={selectedChars.length < 2}
            className={`
              text-2xl font-bold py-4 px-16 rounded-full shadow-xl border-4 transition-all
              ${selectedChars.length >= 2
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-white hover:scale-105 animate-pulse cursor-pointer'
                : 'bg-gray-200 text-gray-400 border-gray-100 cursor-not-allowed'}
            `}
            style={kaitiStyle}
          >
            {selectedChars.length < 2 ? '请至少选 2 个字' : '✨ 变身！生成故事'}
          </button>
      </div>

    </div>
  );
};

export default MagicGenerator;