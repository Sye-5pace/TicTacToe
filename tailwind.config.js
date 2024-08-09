/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'outfit':["Outfit", "sans-serif"],
      'varelaround':["Varela Round", "sans-serif"]
    },
    colors:{
      'mirage':'#1A2A33',
      'tepapagreen':'#1F3641',
      'casper':'#A8BFC9',
      'botticelli':'#DBE8ED',
      'goldentainoi':'#FFC860',
      'saffron':'#F2B137',
      'turquoise':'#31C3BD',
    },
    screens:{
      'mobile': {'min':'200px','max':'427px'},
      'tablet': {'min':'427px','max':'782px'},
      'laptop': {'min':'782.1px'}
    },
    extend: {
      boxShadow: {
        'inner-bottom': 'inset 0 -7.5px 1px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

