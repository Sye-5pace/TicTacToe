/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'outfit':["Outfit", "sans-serif"]
    },
    colors:{
      'mirage':'#1A2A33',
      'tepapagreen':'#1F3641',
      'casper':'#A8BFC9',
      'casper':'#A8BFC9',
      'botticelli':'#DBE8ED',
      'goldentainoi':'#FFC860',
      'saffron':'#F2B137',
      'turquoiseblue':'#65E9E4',
      'turquoiseblue':'#65E9E4',
      'turquoise':'#31C3BD',
      'btnoffset_color':'#CC8B13',
    },
    screens:{
      'mobile': {'min':'200px','max':'427px'},
      'tablet': {'min':'427px','max':'782px'},
      'laptop': {'min':'782.1px'}
    },
    extend: {},
  },
  plugins: [],
}

