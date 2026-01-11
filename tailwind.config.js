/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 保留快乐体用于标题（Title），因为它确实可爱
        cute: ['"ZCOOL KuaiLe"', 'cursive'],
        // 新增：正文/识字字体，优先使用楷体，没有则用宋体
        serif: ['"KaiTi"', '"STKaiti"', '"SimSun"', 'serif'],
      },
      colors: {
        candy: {
          bg: '#FFF5F7',
          pink: '#FF6B8B',
          pinkHover: '#FF476E',
          yellow: '#FFD93D',
          green: '#6BCB77',
          blue: '#4D96FF',
          purple: '#A685E2',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        // 新增：圆角正方形
        squircle: '1.5rem',
      },
      boxShadow: {
        'candy': '0 6px 0 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite', // 让它跳得慢一点
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
