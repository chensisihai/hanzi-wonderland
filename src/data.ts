// src/data.ts

export interface CharacterData {
  id: number;
  char: string;
  pinyin: string;
  group: string;
  words: string[];
  color: string;
  image: string;
}

export interface StoryPage {
  image: string;
  text: string;
}

export interface StoryData {
  title: string;
  pages: StoryPage[];
}

export interface Level {
  id: number;
  title: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
  characters: CharacterData[];
  story: StoryData;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "第一关：神奇数字",
    icon: "1️⃣",
    status: "unlocked",
    characters: [
      { id: 101, char: "一", pinyin: "yī", group: "数字与方位", words: ["一个", "一同"], color: "bg-blue-100", image: "/images/1.png" },
      { id: 102, char: "二", pinyin: "èr", group: "数字与方位", words: ["二人", "独一无二"], color: "bg-green-100", image: "/images/2.png" },
      { id: 103, char: "三", pinyin: "sān", group: "数字与方位", words: ["三天", "三心二意"], color: "bg-yellow-100", image: "/images/3.png" },
      { id: 104, char: "四", pinyin: "sì", group: "数字与方位", words: ["四季", "四面八方"], color: "bg-pink-100", image: "/images/4.png" },
    ],
    story: {
      title: "数字王国的派对",
      pages: [
        { image: "/images/1.png", text: "一只小猫戴皇冠。" },
        { image: "/images/2.png", text: "二只小鸟在歌唱。" },
        { image: "/images/3.png", text: "三个气球飞上天。" },
        { image: "/images/4.png", text: "四朵雪花飘下来。" }
      ]
    }
  },
  {
    id: 2,
    title: "第二关：自然奥秘",
    icon: "🌳",
    status: "locked",
    characters: [
      { id: 201, char: "天", pinyin: "tiān", group: "自然现象", words: ["天空", "白天"], color: "bg-blue-200", image: "/images/1.png" },
      { id: 202, char: "地", pinyin: "dì", group: "自然现象", words: ["土地", "种地"], color: "bg-yellow-200", image: "/images/2.png" },
      { id: 203, char: "人", pinyin: "rén", group: "人物称呼", words: ["大人", "好人"], color: "bg-red-200", image: "/images/3.png" },
      { id: 204, char: "火", pinyin: "huǒ", group: "自然现象", words: ["大火", "火山"], color: "bg-orange-200", image: "/images/4.png" },
    ],
    story: {
      title: "天地人火",
      pages: [
        { image: "/images/1.png", text: "蓝蓝的天空。" },
        { image: "/images/2.png", text: "宽宽的大地。" },
        { image: "/images/3.png", text: "勤劳的人们。" },
        { image: "/images/4.png", text: "红红的火焰。" }
      ]
    }
  },
  {
    id: 3,
    title: "日月星云",
    icon: "🌤️",
    status: "locked",
    characters: [
      { id: 301, char: "日", pinyin: "rì", group: "自然现象", words: ["日子", "红日"], color: "bg-red-100", image: "/images/L3_1.jpg" },
      { id: 302, char: "月", pinyin: "yuè", group: "自然现象", words: ["月亮", "一月"], color: "bg-yellow-100", image: "/images/L3_2.jpg" },
      { id: 303, char: "星", pinyin: "xīng", group: "自然现象", words: ["星星", "火星"], color: "bg-purple-100", image: "/images/L3_3.jpg" },
      { id: 304, char: "云", pinyin: "yún", group: "自然现象", words: ["白云", "云朵"], color: "bg-blue-100", image: "/images/L3_4.jpg" },
    ],
    story: {
      title: "天空的样子",
      pages: [
        { image: "/images/L3_1.jpg", text: "红红的日头挂天上。" },
        { image: "/images/L3_2.jpg", text: "弯弯的月亮像小船。" },
        { image: "/images/L3_3.jpg", text: "闪闪的星星眨眼睛。" },
        { image: "/images/L3_4.jpg", text: "白白的云朵飘啊飘。" }
      ]
    }
  },
  {
    id: 4,
    title: "风雨雷电",
    icon: "⛈️",
    status: "locked",
    characters: [
      { id: 401, char: "风", pinyin: "fēng", group: "自然现象", words: ["大风", "风车"], color: "bg-gray-100", image: "/images/L4_1.jpg" },
      { id: 402, char: "雨", pinyin: "yǔ", group: "自然现象", words: ["下雨", "雨衣"], color: "bg-blue-200", image: "/images/L4_2.jpg" },
      { id: 403, char: "雷", pinyin: "léi", group: "自然现象", words: ["打雷", "雷电"], color: "bg-purple-200", image: "/images/L4_3.jpg" },
      { id: 404, char: "电", pinyin: "diàn", group: "自然现象", words: ["电视", "电话"], color: "bg-yellow-200", image: "/images/L4_4.jpg" },
    ],
    story: {
      title: "天气变变变",
      pages: [
        { image: "/images/L4_1.jpg", text: "呼呼的大风吹树叶。" },
        { image: "/images/L4_2.jpg", text: "哗哗的大雨落下来。" },
        { image: "/images/L4_3.jpg", text: "轰隆隆打雷真吓人。" },
        { image: "/images/L4_4.jpg", text: "天上的闪电亮晶晶。" }
      ]
    }
  },
  {
    "id": 5,
    "title": "冬日雪山",
    "icon": "🏔️",
    "status": "locked",
    "characters": [
      {
        "id": 501,
        "char": "雪",
        "pinyin": "xuě",
        group: "自然现象",
        "words": ["雪花", "下雪"],
        "color": "bg-blue-100",
        "image": "/images/L5_1.jpg"
      },
      {
        "id": 502,
        "char": "霜",
        "pinyin": "shuāng",
        group: "自然现象",
        "words": ["冰霜", "霜降"],
        "color": "bg-cyan-100",
        "image": "/images/L5_2.jpg"
      },
      {
        "id": 503,
        "char": "雾",
        "pinyin": "wù",
        group: "自然现象",
        "words": ["大雾", "云雾"],
        "color": "bg-gray-100",
        "image": "/images/L5_3.jpg"
      },
      {
        "id": 504,
        "char": "山",
        "pinyin": "shān",
        group: "自然现象",
        "words": ["大山", "爬山"],
        "color": "bg-emerald-100",
        "image": "/images/L5_4.jpg"
      }
    ],
    "story": {
      "title": "白白的世界",
      "pages": [
        {
          "image": "/images/L5_1.jpg",
          "text": "天空飘下一朵小雪。"
        },
        {
          "image": "/images/L5_2.jpg",
          "text": "地上结了薄薄的霜。"
        },
        {
          "image": "/images/L5_3.jpg",
          "text": "树林里起了一层雾。"
        },
        {
          "image": "/images/L5_4.jpg",
          "text": "藏住了那座高高山。"
        }
      ]
    }
  },
  {
    "id": 6,
    "title": "田野江边",
    "icon": "🚜",
    "status": "locked",
    "characters": [
      {
        "id": 601,
        "char": "石",
        "pinyin": "shí",
        group: "自然现象",
        "words": ["石头", "岩石"],
        "color": "bg-stone-200",
        "image": "/images/L6_1.jpg"
      },
      {
        "id": 602,
        "char": "田",
        "pinyin": "tián",
        group: "自然现象",
        "words": ["种田", "稻田"],
        "color": "bg-lime-100",
        "image": "/images/L6_2.jpg"
      },
      {
        "id": 603,
        "char": "土",
        "pinyin": "tǔ",
        group: "自然现象",
        "words": ["泥土", "土地"],
        "color": "bg-amber-100",
        "image": "/images/L6_3.jpg"
      },
      {
        "id": 604,
        "char": "江",
        "pinyin": "jiāng",
        group: "自然现象",
        "words": ["长江", "江水"],
        "color": "bg-sky-200",
        "image": "/images/L6_4.jpg"
      }
    ],
    "story": {
      "title": "快乐的农夫",
      "pages": [
        {
          "image": "/images/L6_1.jpg",
          "text": "路边躺着大石头，圆圆像皮球。"
        },
        {
          "image": "/images/L6_2.jpg",
          "text": "旁边一块大农田，苗儿绿油油。"
        },
        {
          "image": "/images/L6_3.jpg",
          "text": "种子睡在泥土里，慢慢伸出头。"
        },
        {
          "image": "/images/L6_4.jpg",
          "text": "你看前方大江水，哗哗向东流。"
        }
      ]
    }
  },
  {
    "id": 7,
    "title": "水的世界",
    "icon": "🌊",
    "status": "locked",
    "characters": [
      {
        "id": 701,
        "char": "河",
        "pinyin": "hé",
        group: "自然现象",
        "words": ["小河", "河马"],
        "color": "bg-teal-100",
        "image": "/images/L7_1.jpg"
      },
      {
        "id": 702,
        "char": "湖",
        "pinyin": "hú",
        group: "自然现象",
        "words": ["湖水", "西湖"],
        "color": "bg-cyan-100",
        "image": "/images/L7_2.jpg"
      },
      {
        "id": 703,
        "char": "海",
        "pinyin": "hǎi",
        group: "自然现象",
        "words": ["大海", "海豚"],
        "color": "bg-blue-200",
        "image": "/images/L7_3.jpg"
      },
      {
        "id": 704,
        "char": "水",
        "pinyin": "shuǐ",
        group: "自然现象",
        "words": ["喝水", "口水"],
        "color": "bg-indigo-100",
        "image": "/images/L7_4.jpg"
      }
    ],
    "story": {
      "title": "小水滴旅行",
      "pages": [
        {
          "image": "/images/L7_1.jpg",
          "text": "弯弯曲曲是小河，唱着快乐歌。"
        },
        {
          "image": "/images/L7_2.jpg",
          "text": "跑进平静的大湖，洗个香香澡。"
        },
        {
          "image": "/images/L7_3.jpg",
          "text": "游向蓝色的大海，这里真热闹。"
        },
        {
          "image": "/images/L7_4.jpg",
          "text": "它们都是小水滴，到处飘呀飘。"
        }
      ]
    }
  },
  {
    "id": 8,
    "title": "五官小手",
    "icon": "👶",
    "status": "locked",
    "characters": [
      {
        "id": 801,
        "char": "口",
        "pinyin": "kǒu",
        group: "人体动作",
        "words": ["口水", "大口"],
        "color": "bg-red-100",
        "image": "/images/L8_1.jpg"
      },
      {
        "id": 802,
        "char": "耳",
        "pinyin": "ěr",
        group: "人体动作",
        "words": ["耳朵", "木耳"],
        "color": "bg-orange-100",
        "image": "/images/L8_2.jpg"
      },
      {
        "id": 803,
        "char": "目",
        "pinyin": "mù",
        group: "人体动作",
        "words": ["目光", "注目"],
        "color": "bg-blue-100",
        "image": "/images/L8_3.jpg"
      },
      {
        "id": 804,
        "char": "手",
        "pinyin": "shǒu",
        group: "人体动作",
        "words": ["小手", "拍手"],
        "color": "bg-yellow-100",
        "image": "/images/L8_4.jpg"
      }
    ],
    "story": {
      "title": "乖乖宝贝",
      "pages": [
        {
          "image": "/images/L8_1.jpg",
          "text": "张开大口吃西瓜。"
        },
        {
          "image": "/images/L8_2.jpg",
          "text": "竖起耳朵听青蛙。"
        },
        {
          "image": "/images/L8_3.jpg",
          "text": "目光亮亮找妈妈。"
        },
        {
          "image": "/images/L8_4.jpg",
          "text": "拍拍小手笑哈哈。"
        }
      ]
    }
  },
  {
    "id": 9,
    "title": "身体奥秘",
    "icon": "🏃",
    "status": "locked",
    "characters": [
      {
        "id": 901,
        "char": "足",
        "pinyin": "zú",
        group: "人体动作",
        "words": ["足球", "手足"],
        "color": "bg-green-100",
        "image": "/images/L9_1.jpg"
      },
      {
        "id": 902,
        "char": "头",
        "pinyin": "tóu",
        group: "人体动作",
        "words": ["头发", "大头"],
        "color": "bg-purple-100",
        "image": "/images/L9_2.jpg"
      },
      {
        "id": 903,
        "char": "发",
        "pinyin": "fà",
        group: "人体动作",
        "words": ["长发", "理发"],
        "color": "bg-slate-200",
        "image": "/images/L9_3.jpg"
      },
      {
        "id": 904,
        "char": "牙",
        "pinyin": "yá",
        group: "人体动作",
        "words": ["牙齿", "门牙"],
        "color": "bg-gray-100",
        "image": "/images/L9_4.jpg"
      }
    ],
    "story": {
      "title": "我要长高",
      "pages": [
        {
          "image": "/images/L9_1.jpg",
          "text": "踢踢足球有力气。"
        },
        {
          "image": "/images/L9_2.jpg",
          "text": "抬起头来笑嘻嘻。"
        },
        {
          "image": "/images/L9_3.jpg",
          "text": "黑色头发真整齐。"
        },
        {
          "image": "/images/L9_4.jpg",
          "text": "保护牙齿要牢记。"
        }
      ]
    }
  },
  {
    "id": 10,
    "title": "可爱的脸",
    "icon": "😊",
    "status": "locked",
    "characters": [
      {
        "id": 1001,
        "char": "舌",
        "pinyin": "shé",
        group: "人体动作",
        "words": ["舌头", "学舌"],
        "color": "bg-rose-100",
        "image": "/images/L10_1.jpg"
      },
      {
        "id": 1002,
        "char": "眉",
        "pinyin": "méi",
        group: "人体动作",
        "words": ["眉毛", "皱眉"],
        "color": "bg-stone-200",
        "image": "/images/L10_2.jpg"
      },
      {
        "id": 1003,
        "char": "鼻",
        "pinyin": "bí",
        group: "人体动作",
        "words": ["鼻子", "鼻孔"],
        "color": "bg-orange-50",
        "image": "/images/L10_3.jpg"
      },
      {
        "id": 1004,
        "char": "唇",
        "pinyin": "chún",
        group: "人体动作",
        "words": ["嘴唇", "红唇"],
        "color": "bg-red-200",
        "image": "/images/L10_4.jpg"
      }
    ],
    "story": {
      "title": "表情包",
      "pages": [
        {
          "image": "/images/L10_1.jpg",
          "text": "伸出舌头舔冰棒。"
        },
        {
          "image": "/images/L10_2.jpg",
          "text": "弯弯眉毛像月亮。"
        },
        {
          "image": "/images/L10_3.jpg",
          "text": "捏捏鼻子不要晃。"
        },
        {
          "image": "/images/L10_4.jpg",
          "text": "动动嘴唇歌声唱。"
        }
      ]
    }
  },
  {
    "id": 11,
    "title": "快乐身心",
    "icon": "🥰",
    "status": "locked",
    "characters": [
      {
        "id": 1101,
        "char": "脸",
        "pinyin": "liǎn",
        "group": "身体",
        "words": ["洗脸", "笑脸"],
        "color": "bg-rose-100",
        "image": "/images/L11_1.jpg"
      },
      {
        "id": 1102,
        "char": "心",
        "pinyin": "xīn",
        "group": "身体",
        "words": ["开心", "爱心"],
        "color": "bg-pink-100",
        "image": "/images/L11_2.jpg"
      },
      {
        "id": 1103,
        "char": "身",
        "pinyin": "shēn",
        "group": "身体",
        "words": ["身体", "转身"],
        "color": "bg-orange-100",
        "image": "/images/L11_3.jpg"
      },
      {
        "id": 1104,
        "char": "走",
        "pinyin": "zǒu",
        "group": "动作",
        "words": ["走路", "走开"],
        "color": "bg-amber-100",
        "image": "/images/L11_4.jpg"
      }
    ],
    "story": {
      "title": "乖娃娃",
      "pages": [
        {
          "image": "/images/L11_1.jpg",
          "text": "胖胖嘟嘟一张脸。"
        },
        {
          "image": "/images/L11_2.jpg",
          "text": "每天都有好奇心。"
        },
        {
          "image": "/images/L11_3.jpg",
          "text": "摇摇晃晃转过身。"
        },
        {
          "image": "/images/L11_4.jpg",
          "text": "就像鸭子慢慢走。"
        }
      ]
    }
  },
  {
    "id": 12,
    "title": "跑跑跳跳",
    "icon": "🏃",
    "status": "locked",
    "characters": [
      {
        "id": 1201,
        "char": "跑",
        "pinyin": "pǎo",
        "group": "动作",
        "words": ["跑步", "赛跑"],
        "color": "bg-red-100",
        "image": "/images/L12_1.jpg"
      },
      {
        "id": 1202,
        "char": "跳",
        "pinyin": "tiào",
        "group": "动作",
        "words": ["跳高", "跳绳"],
        "color": "bg-green-100",
        "image": "/images/L12_2.jpg"
      },
      {
        "id": 1203,
        "char": "飞",
        "pinyin": "fēi",
        "group": "动作",
        "words": ["飞机", "飞鸟"],
        "color": "bg-sky-100",
        "image": "/images/L12_3.jpg"
      },
      {
        "id": 1204,
        "char": "站",
        "pinyin": "zhàn",
        "group": "动作",
        "words": ["站立", "车站"],
        "color": "bg-indigo-100",
        "image": "/images/L12_4.jpg"
      }
    ],
    "story": {
      "title": "运动会",
      "pages": [
        {
          "image": "/images/L12_1.jpg",
          "text": "穿上鞋子用力跑。"
        },
        {
          "image": "/images/L12_2.jpg",
          "text": "跟着兔子蹦蹦跳。"
        },
        {
          "image": "/images/L12_3.jpg",
          "text": "看着蝴蝶天上飞。"
        },
        {
          "image": "/images/L12_4.jpg",
          "text": "听见铃声站直了。"
        }
      ]
    }
  },
  {
    "id": 13,
    "title": "亲密伙伴",
    "icon": "🤝",
    "status": "locked",
    "characters": [
      {
        "id": 1301,
        "char": "你",
        "pinyin": "nǐ",
        "group": "代词",
        "words": ["你好", "你们"],
        "color": "bg-blue-100",
        "image": "/images/L13_1.jpg"
      },
      {
        "id": 1302,
        "char": "我",
        "pinyin": "wǒ",
        "group": "代词",
        "words": ["我们", "自我"],
        "color": "bg-green-100",
        "image": "/images/L13_2.jpg"
      },
      {
        "id": 1303,
        "char": "他",
        "pinyin": "tā",
        "group": "代词",
        "words": ["他们", "他人"],
        "color": "bg-indigo-100",
        "image": "/images/L13_3.jpg"
      },
      {
        "id": 1304,
        "char": "她",
        "pinyin": "tā",
        "group": "代词",
        "words": ["她们", "她的"],
        "color": "bg-pink-100",
        "image": "/images/L13_4.jpg"
      }
    ],
    "story": {
      "title": "大家来玩",
      "pages": [
        {
          "image": "/images/L13_1.jpg",
          "text": "伸出手来你好呀。"
        },
        {
          "image": "/images/L13_2.jpg",
          "text": "我们一起玩过家家。"
        },
        {
          "image": "/images/L13_3.jpg",
          "text": "他搭积木笑哈哈。"
        },
        {
          "image": "/images/L13_4.jpg",
          "text": "她画一朵大红花。"
        }
      ]
    }
  },
  {
    "id": 14,
    "title": "幸福一家",
    "icon": "👨‍👩‍👧‍👦",
    "status": "locked",
    "characters": [
      {
        "id": 1401,
        "char": "爸",
        "pinyin": "bà",
        "group": "家庭",
        "words": ["爸爸", "老爸"],
        "color": "bg-blue-200",
        "image": "/images/L14_1.jpg"
      },
      {
        "id": 1402,
        "char": "妈",
        "pinyin": "mā",
        "group": "家庭",
        "words": ["妈妈", "姨妈"],
        "color": "bg-rose-200",
        "image": "/images/L14_2.jpg"
      },
      {
        "id": 1403,
        "char": "爷",
        "pinyin": "yé",
        "group": "家庭",
        "words": ["爷爷", "大爷"],
        "color": "bg-slate-200",
        "image": "/images/L14_3.jpg"
      },
      {
        "id": 1404,
        "char": "奶",
        "pinyin": "nǎi",
        "group": "家庭",
        "words": ["奶奶", "牛奶"],
        "color": "bg-orange-100",
        "image": "/images/L14_4.jpg"
      }
    ],
    "story": {
      "title": "爱的礼物",
      "pages": [
        {
          "image": "/images/L14_1.jpg",
          "text": "爸爸力气真的大。"
        },
        {
          "image": "/images/L14_2.jpg",
          "text": "妈妈带我回老家。"
        },
        {
          "image": "/images/L14_3.jpg",
          "text": "爷爷胡子白花花。"
        },
        {
          "image": "/images/L14_4.jpg",
          "text": "奶奶给我糖果拿。"
        }
      ]
    }
  },
  {
    "id": 15,
    "title": "兄弟姐妹",
    "icon": "👯",
    "status": "locked",
    "characters": [
      {
        "id": 1501,
        "char": "哥",
        "pinyin": "gē",
        "group": "家庭",
        "words": ["哥哥", "大哥"],
        "color": "bg-sky-200",
        "image": "/images/L15_1.jpg"
      },
      {
        "id": 1502,
        "char": "弟",
        "pinyin": "dì",
        "group": "家庭",
        "words": ["弟弟", "小弟"],
        "color": "bg-teal-100",
        "image": "/images/L15_2.jpg"
      },
      {
        "id": 1503,
        "char": "姐",
        "pinyin": "jiě",
        "group": "家庭",
        "words": ["姐姐", "大姐"],
        "color": "bg-pink-200",
        "image": "/images/L15_3.jpg"
      },
      {
        "id": 1504,
        "char": "妹",
        "pinyin": "mèi",
        "group": "家庭",
        "words": ["妹妹", "姐妹"],
        "color": "bg-fuchsia-100",
        "image": "/images/L15_4.jpg"
      }
    ],
    "story": {
      "title": "比比谁快",
      "pages": [
        {
          "image": "/images/L15_1.jpg",
          "text": "哥哥前面跑得快。"
        },
        {
          "image": "/images/L15_2.jpg",
          "text": "弟弟后面真可爱。"
        },
        {
          "image": "/images/L15_3.jpg",
          "text": "姐姐跳绳多厉害。"
        },
        {
          "image": "/images/L15_4.jpg",
          "text": "妹妹拍手笑起来。"
        }
      ]
    }
  },
  {
    "id": 16,
    "title": "亲戚朋友",
    "icon": "👫",
    "status": "locked",
    "characters": [
      {
        "id": 1601,
        "char": "叔",
        "pinyin": "shū",
        "group": "称呼",
        "words": ["叔叔", "大叔"],
        "color": "bg-cyan-100",
        "image": "/images/L16_1.jpg"
      },
      {
        "id": 1602,
        "char": "姨",
        "pinyin": "yí",
        "group": "称呼",
        "words": ["阿姨", "姨妈"],
        "color": "bg-rose-100",
        "image": "/images/L16_2.jpg"
      },
      {
        "id": 1603,
        "char": "男",
        "pinyin": "nán",
        "group": "人物",
        "words": ["男生", "男孩"],
        "color": "bg-blue-300",
        "image": "/images/L16_3.jpg"
      },
      {
        "id": 1604,
        "char": "女",
        "pinyin": "nǚ",
        "group": "人物",
        "words": ["女生", "女儿"],
        "color": "bg-pink-300",
        "image": "/images/L16_4.jpg"
      }
    ],
    "story": {
      "title": "社区客人",
      "pages": [
        {
          "image": "/images/L16_1.jpg",
          "text": "警察叔叔本领大。"
        },
        {
          "image": "/images/L16_2.jpg",
          "text": "邻居阿姨笑哈哈。"
        },
        {
          "image": "/images/L16_3.jpg",
          "text": "这是勇敢小男娃。"
        },
        {
          "image": "/images/L16_4.jpg",
          "text": "那是漂亮女娃娃。"
        }
      ]
    }
  },
  {
    "id": 17,
    "title": "快乐成长",
    "icon": "🏫",
    "status": "locked",
    "characters": [
      {
        "id": 1701,
        "char": "老",
        "pinyin": "lǎo",
        "group": "人物",
        "words": ["老人", "老师"],
        "color": "bg-gray-200",
        "image": "/images/L17_1.jpg"
      },
      {
        "id": 1702,
        "char": "幼",
        "pinyin": "yòu",
        "group": "人物",
        "words": ["幼儿", "幼小"],
        "color": "bg-lime-100",
        "image": "/images/L17_2.jpg"
      },
      {
        "id": 1703,
        "char": "生",
        "pinyin": "shēng",
        "group": "人物",
        "words": ["学生", "生日"],
        "color": "bg-yellow-100",
        "image": "/images/L17_3.jpg"
      },
      {
        "id": 1704,
        "char": "师",
        "pinyin": "shī",
        "group": "职业",
        "words": ["老师", "医师"],
        "color": "bg-violet-100",
        "image": "/images/L17_4.jpg"
      }
    ],
    "story": {
      "title": "上学歌",
      "pages": [
        {
          "image": "/images/L17_1.jpg",
          "text": "乌龟爷爷真的很老。"
        },
        {
          "image": "/images/L17_2.jpg",
          "text": "幼儿园里起得早。"
        },
        {
          "image": "/images/L17_3.jpg",
          "text": "快乐生活没烦恼。"
        },
        {
          "image": "/images/L17_4.jpg",
          "text": "见到老师问声好。"
        }
      ]
    }
  }
];

export const achievements = [
  { 
    id: 1, 
    threshold: 4,
    name: "冰雪皇冠", 
    icon: "👑", 
    description: "学会前4个字",
    bg: "bg-blue-100"
  },
  { 
    id: 2, 
    threshold: 8, 
    name: "魔法雪花", 
    icon: "❄️", 
    description: "学会8个字",
    bg: "bg-purple-100"
  },
  { 
    id: 3, 
    threshold: 12, 
    name: "雪宝的好朋友", 
    icon: "☃️", 
    description: "学会12个字",
    bg: "bg-teal-100"
  },
];

// 兼容旧代码：提供 dailyCharacters 引用
export const dailyCharacters: CharacterData[] = levels[0].characters;
