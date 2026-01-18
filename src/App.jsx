import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import FlashCard from './FlashCard';
import StoryReader from './StoryReader';
import MagicGenerator from './MagicGenerator';
import MagicWriter from './MagicWriter'; // 🔥 引入写字板
import { levels } from './data';

// --- 🎵 音效工具 (保持不变) ---
const playSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  if (type === 'correct') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1); gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5); osc.start(); osc.stop(now + 0.5);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now); osc.frequency.linearRampToValueAtTime(100, now + 0.2); gain.gain.setValueAtTime(0.3, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.2); osc.start(); osc.stop(now + 0.2);
  } else if (type === 'victory') {
    osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now); osc.frequency.linearRampToValueAtTime(554, now + 0.2); osc.frequency.linearRampToValueAtTime(659, now + 0.4); gain.gain.setValueAtTime(0.5, now); gain.gain.linearRampToValueAtTime(0.01, now + 1.0); osc.start(); osc.stop(now + 1.0);
  }
};

function App() {
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const saved = localStorage.getItem('unlockedLevels');
    return saved ? JSON.parse(saved) : [1];
  });

  const [myTreasures, setMyTreasures] = useState(() => {
    const saved = localStorage.getItem('myTreasures');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedStories, setSavedStories] = useState(() => {
    const saved = localStorage.getItem('savedStories');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentLevel, setCurrentLevel] = useState(null);
  const [stage, setStage] = useState('learn'); // learn | game | story | collection | magic
  const [learnedIds, setLearnedIds] = useState([]);

  // 🎮 游戏状态
  const [gameTarget, setGameTarget] = useState(null);
  const [gameQueue, setGameQueue] = useState([]);
  const [gameCards, setGameCards] = useState([]);
  const [feedback, setFeedback] = useState({ id: null, type: null });
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const confettiTimer = useRef(null);

  // 🪄 AI & 魔法状态
  const [aiStory, setAiStory] = useState(null);
  const [writingChar, setWritingChar] = useState(null); // 🔥 当前正在写的字

  useEffect(() => { localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels)); }, [unlockedLevels]);
  useEffect(() => { localStorage.setItem('myTreasures', JSON.stringify(myTreasures)); }, [myTreasures]);
  useEffect(() => { localStorage.setItem('savedStories', JSON.stringify(savedStories)); }, [savedStories]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN'; u.rate = 1.0;
    window.currentUtterance = u; window.speechSynthesis.speak(u);
  };

  const kaitiStyle = { fontFamily: '"KaiTi", "STKaiti", "楷体", "SimSun", "宋体", serif' };

  // ==========================================
  // 🗺️ 逻辑控制
  // ==========================================
  
  const toggleLearned = (char) => {
    if (learnedIds.includes(char.id)) {
      setLearnedIds(prev => prev.filter(i => i !== char.id));
      setMyTreasures(prev => prev.filter(item => item.id !== char.id));
    } else {
      setLearnedIds(prev => [...prev, char.id]);
      setMyTreasures(prev => {
        if (prev.find(item => item.id === char.id)) return prev;
        return [...prev, char];
      });
    }
  };

  const handleSelectLevel = (level) => {
    if (!unlockedLevels.includes(level.id)) { speak("这一关还没解锁哦"); return; }
    setCurrentLevel(level);
    setStage('learn');
    const learnedInLevel = level.characters.filter(c => myTreasures.find(t => t.id === c.id)).map(c => c.id);
    setLearnedIds(learnedInLevel);
    setLevelComplete(false);
    speak(`${level.title}，开始学习！`);
  };

  const startChallenge = () => {
    setStage('game');
    const shuffledCards = [...currentLevel.characters].sort(() => Math.random() - 0.5);
    setGameCards(shuffledCards);
    const shuffledQuestions = [...currentLevel.characters].sort(() => Math.random() - 0.5);
    setGameQueue(shuffledQuestions.slice(1));
    setGameTarget(shuffledQuestions[0]);
    setTimeout(() => { speak(`挑战开始！请找出。。。${shuffledQuestions[0].char}`); }, 500);
  };

  const handleGameClick = (char) => {
    if (feedback.type) return;
    if (char.id === gameTarget.id) {
      playSound('correct');
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      setShowConfetti(false);
      setTimeout(() => {
        setShowConfetti(true);
        confettiTimer.current = setTimeout(() => setShowConfetti(false), 4000);
      }, 10);

      if (gameQueue.length > 0) {
        const next = gameQueue[0];
        setGameQueue(gameQueue.slice(1));
        setTimeout(() => { setGameTarget(next); speak(`请找出。。。${next.char}`); }, 1200);
      } else {
        setTimeout(() => { playSound('victory'); speak("挑战成功！奖励读绘本！"); setStage('story'); }, 1000);
      }
    } else {
      playSound('wrong');
      setFeedback({ id: char.id, type: 'wrong' });
      setTimeout(() => setFeedback({ id: null, type: null }), 500);
    }
  };

  const handleStoryFinish = () => {
    if (aiStory) {
      setAiStory(null);
      setStage('collection');
      return;
    }
    setLevelComplete(true); setShowConfetti(true); playSound('victory');
    const nextLevelId = currentLevel.id + 1;
    const hasNextLevel = levels.find(l => l.id === nextLevelId);
    if (hasNextLevel && !unlockedLevels.includes(nextLevelId)) {
      setUnlockedLevels(prev => [...prev, nextLevelId]);
    }
  };

  const backToMap = () => {
    setCurrentLevel(null); setShowConfetti(false); setLevelComplete(false); setStage('learn'); setAiStory(null);
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
  };

  const openCollection = () => {
    setStage('collection');
    speak("欢迎来到你的汉字宝藏！");
  };

  const handleAiStoryGenerated = (story) => {
    const newStory = { ...story, id: Date.now(), date: new Date().toLocaleDateString() };
    setSavedStories(prev => [newStory, ...prev]);
    setAiStory(newStory);
    setStage('story'); 
  };

  const openSavedStory = (story) => {
    setAiStory(story);
    setStage('story');
  };

  const handleDeleteStory = (e, id) => {
    e.stopPropagation();
    if(window.confirm("确定要删掉这本魔法书吗？")) {
      setSavedStories(prev => prev.filter(s => s.id !== id));
    }
  };

  // 🔥 打开写字板
  const openMagicWriter = (charData) => {
    setWritingChar(charData);
  };

  // ==========================================
  // 🖥️ 渲染判断
  // ==========================================

  // 0. 🔥 写字板 (全局覆盖)
  // 放在最外面，这样无论在哪个页面打开都能覆盖
  const MagicWriterOverlay = writingChar ? (
    <MagicWriter charData={writingChar} onClose={() => setWritingChar(null)} />
  ) : null;

  // 1. 魔法造句页
  if (stage === 'magic') {
    return <>{MagicWriterOverlay}<MagicGenerator treasures={myTreasures} onStoryGenerated={handleAiStoryGenerated} onBack={openCollection} /></>;
  }

  // 2. 宝藏页
  if (stage === 'collection') {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center p-4 relative overflow-y-auto">
        {MagicWriterOverlay}
        <div className="w-full max-w-5xl flex justify-between items-center mb-6 pt-4 sticky top-0 z-50 bg-[#FFF5F7]/90 backdrop-blur-sm py-4">
           <button onClick={backToMap} className="bg-white text-gray-500 hover:text-pink-500 font-bold py-2 px-6 rounded-full shadow-sm border border-gray-200" style={kaitiStyle}>🔙 返回地图</button>
           <h1 className="text-3xl font-bold text-yellow-500" style={kaitiStyle}>💎 我的宝藏</h1>
           <button onClick={() => setStage('magic')} disabled={myTreasures.length < 2} className={`px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 border-2 ${myTreasures.length < 2 ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' : 'bg-indigo-500 text-white border-indigo-300 hover:bg-indigo-600 animate-pulse'}`} style={kaitiStyle}><span>🧙‍♂️</span> 变个故事</button>
        </div>
        
        <div className="w-full max-w-5xl mb-12">
           <h2 className="text-2xl text-pink-400 font-bold mb-6 pl-4 border-l-4 border-pink-300" style={kaitiStyle}>✨ 我学会的字 ({myTreasures.length})</h2>
           {myTreasures.length === 0 ? (
              <p className="text-center text-gray-400 py-10" style={kaitiStyle}>宝藏箱是空的，快去闯关吧！</p>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {myTreasures.map(char => (
                  <FlashCard 
                    key={char.id} 
                    data={char} 
                    isLearned={true} 
                    onToggleLearn={() => toggleLearned(char)} 
                    showMic={true} 
                    onOpenWriter={openMagicWriter} // 🔥 传入打开写字板的函数
                  />
                ))}
              </div>
           )}
        </div>

        <div className="w-full max-w-5xl pb-20">
           <h2 className="text-2xl text-indigo-500 font-bold mb-6 pl-4 border-l-4 border-indigo-400" style={kaitiStyle}>🧚‍♀️ 我的魔法绘本 ({savedStories.length})</h2>
           {savedStories.length === 0 ? (
             <div className="bg-indigo-50 rounded-3xl p-8 text-center border-2 border-dashed border-indigo-200"><p className="text-indigo-300 text-xl" style={kaitiStyle}>还没有魔法故事哦，快点击右上角去变一个吧！</p></div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {savedStories.map(story => (
                 <div key={story.id} onClick={() => openSavedStory(story)} className="bg-white rounded-2xl shadow-md border-4 border-indigo-100 p-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all relative group">
                   <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden mb-3"><img src={story.pages[0].image} className="w-full h-full object-cover" alt="cover" /></div>
                   <h3 className="text-xl font-bold text-gray-800 mb-1 truncate" style={kaitiStyle}>{story.title}</h3>
                   <p className="text-sm text-gray-400" style={kaitiStyle}>{story.date} 生成</p>
                   <button onClick={(e) => handleDeleteStory(e, story.id)} className="absolute top-2 right-2 bg-white/80 p-2 rounded-full text-red-400 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100" title="删除这本">🗑️</button>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    );
  }

  // 3. 绘本页 (Story)
  if (stage === 'story') {
    const storyToShow = aiStory || currentLevel?.story;
    if (levelComplete && !aiStory) {
      return (
        <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center relative">
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }} />
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center transform transition-all scale-100 border-b-8 border-gray-100 z-10"> 
            <div className="text-8xl mb-4">🏆</div>
            <h2 className="text-5xl font-bold text-yellow-500 mb-6" style={kaitiStyle}>关卡通过！</h2>
            <button onClick={backToMap} className="bg-blue-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-600 border-b-4 border-blue-700 active:scale-95 transition-all" style={kaitiStyle}>返回地图</button>
          </div>
        </div>
      );
    }
    return <div className="min-h-screen bg-[#FFF5F7] pt-4">{MagicWriterOverlay}<StoryReader story={storyToShow} onBack={handleStoryFinish} onExit={backToMap} /></div>;
  }

  // 4. 地图页 & 学习页 (需要注入 MagicWriterOverlay，以防在学习模式也可以加入口)
  // ... 省略地图代码，但在返回时记得加上 {MagicWriterOverlay}
  // 简便起见，我们在最外层的 div 里放 Overlay，但是因为 return 很多分支，建议把 Overlay 放在每个 return 的最上面。
  // 上面的 return 都加了，下面是最后一个（地图和学习页）：

  if (!currentLevel) {
     // 地图代码... 
     // (此处省略地图渲染代码，你可以直接用上面的代码，只要记得如果有 MagicWriterOverlay 需求的话。但目前入口只在宝藏页和FlashCard里，只要FlashCard能触发就行)
     // 为防万一，我们在地图的 return 里也加一下
     return (
        <div className="min-h-screen w-full bg-[#FFF5F7] relative overflow-y-auto overflow-x-hidden">
          {MagicWriterOverlay}
          {/* ... 原地图代码 ... */}
          {/* 这里为了节省篇幅，请保留你之前的地图代码，只要在最外层 div 内部第一行加上 {MagicWriterOverlay} 即可 */}
          
          {/* 这里我把之前的地图代码完整贴回来，防止你替换出错 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
              <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-4xl flex justify-between items-center mb-10">
               <div className="w-20"></div> 
               <h1 className="text-5xl text-pink-500 drop-shadow-sm font-bold" style={{fontFamily: '"ZCOOL KuaiLe", cursive'}}>识字大冒险</h1>
               <button onClick={openCollection} className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl border-4 border-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                 <span className="text-3xl">💎</span>
                 <div className="flex flex-col items-start"><span className="text-xs font-bold opacity-80" style={kaitiStyle}>我的宝藏</span><span className="text-xl font-black leading-none">{myTreasures.length}</span></div>
               </button>
            </div>
            <p className="text-gray-500 mb-10 text-lg" style={kaitiStyle}>当前进度：第 {unlockedLevels.length} 关</p>
            {/* ... Grid Cells 代码 ... */}
            {/* 为了简洁，这里假设你保留了之前的 Grid 渲染代码，如果需要我完整再贴一遍请告诉我。核心就是 return 的最外层要包含 MagicWriterOverlay */}
            {/* 实际上，为了让你直接复制能跑，我还是得把 Grid 渲染逻辑写上 */}
             <div className="grid grid-cols-4 gap-x-8 gap-y-20 max-w-4xl w-full p-4 justify-items-center">
              {(() => {
                const COLS = 4;
                const totalSlots = Math.ceil(levels.length / COLS) * COLS;
                return Array.from({ length: totalSlots }, (_, index) => {
                  const row = Math.floor(index / COLS);
                  const col = index % COLS;
                  const isOddRow = row % 2 !== 0;
                  const logicalIndex = isOddRow ? row * COLS + (COLS - 1 - col) : row * COLS + col;
                  const level = levels[logicalIndex] || null;
                  const cell = { gridKey: index, level, row, col, isOddRow, isLastInRow: col === COLS - 1, isFirstInRow: col === 0, isTheVeryLastLevel: logicalIndex === levels.length - 1 };
                  
                  if (!cell.level) return <div key={cell.gridKey} className="w-32 h-32"></div>;
                  const isUnlocked = unlockedLevels.includes(level.id);
                  const isCompleted = unlockedLevels.includes(level.id + 1); 
                  const isCurrentPlaying = isUnlocked && !isCompleted;
                  const pipeColorClass = isCompleted ? 'bg-blue-400 border-blue-600' : 'bg-gray-300 border-gray-400';
                  const pipeBase = `absolute -z-10 h-6 border-2 box-border transition-colors duration-300 ${pipeColorClass}`;
                  const showPipe = !cell.isTheVeryLastLevel;
                  
                  return (
                    <div key={cell.gridKey} className="relative w-32 h-32 flex justify-center items-center">
                      {showPipe && (
                        <>
                          {!cell.isOddRow && !cell.isLastInRow && <div className={`${pipeBase} left-1/2 top-1/2 -translate-y-1/2`} style={{ width: 'calc(100% + 2.5rem)' }}></div>}
                          {cell.isOddRow && !cell.isFirstInRow && <div className={`${pipeBase} right-1/2 top-1/2 -translate-y-1/2`} style={{ width: 'calc(100% + 2.5rem)' }}></div>}
                          {!cell.isOddRow && cell.isLastInRow && <><div className={`${pipeBase} w-1/2 left-1/2 top-1/2 -translate-y-1/2 border-r-0 rounded-tr-lg`}></div><div className={`${pipeBase} w-6 top-1/2 right-0 translate-x-[-1.6rem] border-t-0 rounded-b-lg`} style={{ height: 'calc(100% + 5rem)', right: '50%', transform: 'translateX(50%)' }}></div></>}
                          {cell.isOddRow && cell.isFirstInRow && <><div className={`${pipeBase} w-1/2 right-1/2 top-1/2 -translate-y-1/2 border-l-0 rounded-tl-lg`}></div><div className={`${pipeBase} w-6 top-1/2 left-0 border-t-0 rounded-b-lg`} style={{ height: 'calc(100% + 5rem)', left: '50%', transform: 'translateX(-50%)' }}></div></>}
                        </>
                      )}
                      <div onClick={() => handleSelectLevel(level)} className={`relative w-full h-full rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 border-b-8 cursor-pointer z-20 select-none ${isUnlocked ? 'bg-white border-blue-200 shadow-xl active:translate-y-2 active:shadow-none hover:-translate-y-1' : 'bg-gray-100 border-gray-300 text-gray-400 grayscale'} ${isCurrentPlaying ? 'ring-4 ring-yellow-400 ring-offset-4 animate-breathe' : ''}`}>
                        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl rotate-[-10deg] flex items-center justify-center font-black text-xl shadow-md border-2 border-white z-30 ${isUnlocked ? 'bg-pink-500 text-white' : 'bg-gray-400 text-white'}`}>{level.id}</div>
                        <div className="text-4xl mb-1 filter drop-shadow-sm transform transition-transform group-hover:scale-110">{isUnlocked ? level.icon : '🔒'}</div>
                        <div className="font-bold text-sm text-gray-700 px-1 text-center leading-tight w-full truncate" style={kaitiStyle}>{isUnlocked ? level.title : '???'}</div>
                        {isCompleted && <div className="absolute -bottom-3 flex space-x-0.5 bg-yellow-400 px-2 py-0.5 rounded-full shadow-sm border-2 border-white text-white z-30"><span className="text-xs">⭐️</span><span className="text-xs">⭐️</span><span className="text-xs">⭐️</span></div>}
                      </div>
                    </div>
                  );
                })
              })()}
            </div>
          </div>
        </div>
     );
  }

  // 5. 学习模式
  const isGame = stage === 'game';
  // 计算总题数 = 当前关卡的汉字数量
  const totalQuestions = currentLevel ? currentLevel.characters.length : 0;
  const displayCards = isGame ? gameCards : currentLevel.characters;
  const currentQuestionIndex = totalQuestions - gameQueue.length;

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center p-4 relative overflow-hidden overflow-y-auto">
      {MagicWriterOverlay} {/* 🔥 确保学习模式下也能弹出 */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} gravity={0.15} style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }} />}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 pt-4 sticky top-0 z-50">
        <button onClick={() => setCurrentLevel(null)} className="bg-white text-gray-500 hover:text-pink-500 font-bold py-2 px-6 rounded-full shadow-sm border border-gray-200 flex items-center transition-colors" style={kaitiStyle}><span className="text-xl mr-1">✕</span> 退出</button>
        <h1 className="text-3xl font-bold text-pink-500" style={kaitiStyle}>{isGame ? `👂 请找出: "${gameTarget?.char}"` : currentLevel.title}</h1>
        <div className="w-32 flex justify-end">{isGame ? <div className="bg-white border-2 border-pink-200 text-pink-500 px-4 py-1 rounded-full font-bold shadow-sm" style={kaitiStyle}>进度: {currentQuestionIndex} / {totalQuestions}</div> : <div className="w-20"></div>}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 z-10">
        {displayCards.map(char => (
          <FlashCard 
             key={`${char.id}-${stage}`} 
             data={char} 
             isLearned={learnedIds.includes(char.id)} 
             onToggleLearn={() => toggleLearned(char)} 
             onClick={isGame ? () => handleGameClick(char) : undefined} 
             feedbackType={feedback.id === char.id ? feedback.type : null} 
             showMic={false} 
             onOpenWriter={openMagicWriter} // 🔥 传入
          />
        ))}
      </div>
      {!isGame && (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-6 border-t border-pink-100 flex flex-col items-center z-50 animate-[slideUp_0.5s_ease-out]">
          <p className="text-gray-500 mb-3 text-lg font-bold" style={kaitiStyle}>先点击卡片听声音，熟悉之后再挑战哦！</p>
          <button onClick={startChallenge} className="bg-yellow-400 text-yellow-900 text-3xl font-black py-4 px-16 rounded-full shadow-xl border-4 border-white transform transition-all hover:bg-yellow-300 hover:scale-105 hover:shadow-2xl active:scale-95 active:translate-y-1" style={kaitiStyle}>我记住了，开始挑战！🎮</button>
        </div>
      )}
    </div>
  );
}
export default App;