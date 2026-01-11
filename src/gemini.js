// ⚠️ 请在这里填入你的 Google Gemini API Key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_FALLBACK_KEY";

export const generateStoryFromGemini = async (chars) => {
  // 使用稳定的 Gemini 1.5 Flash
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // 🔥 核心修改：Prompt 极简化，只求一个关键词
  const prompt = `
    CRITICAL INSTRUCTION: You are writing a story for a 6-year-old's app.
    Mandatory characters: 【${chars.join('、')}】
    
    Task: Write a 4-page story.
    
    Requirements:
    1. Include ALL mandatory characters naturally in the Chinese text.
    2. Each page: 1 simple Chinese sentence.
    3. 'image_keyword': Provide EXACTLY ONE English noun that describes the main subject of the page. Do NOT use adjectives or phrases.
       - BAD: "cute cartoon cat", "running dog"
       - GOOD: "cat", "dog", "forest", "sky"
    4. Return pure JSON.
    
    JSON Structure:
    {
      "title": "Title",
      "pages": [
        {
          "text": "Chinese text.",
          "image_keyword": "cat"
        }
      ]
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("No content returned");
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonStr = textResponse.replace(/```json|```/g, "").trim();
    const storyData = JSON.parse(jsonStr);

    // 🔥 核心修改：回归最稳的 LoremFlickr 关键词配图
    const processedPages = storyData.pages.map(page => {
      // 使用单个关键词去图库搜图
      // 加随机数防止缓存
      const imageUrl = `https://loremflickr.com/800/600/${page.image_keyword}?lock=${Math.floor(Math.random() * 10000)}`;
      
      return {
        text: page.text,
        image: imageUrl
      };
    });

    return {
      title: storyData.title,
      pages: processedPages
    };

  } catch (error) {
    console.error("生成失败:", error);
    return {
      title: "魔法信号弱",
      pages: [
        { text: "哎呀，图片加载失败了。", image: "https://placehold.co/800x600/e2e8f0/ffffff?text=Image+Error" },
        { text: "但是故事还在哦！", image: "https://placehold.co/800x600/e2e8f0/ffffff?text=Keep+Reading" }
      ]
    };
  }
};