/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      
      backgroundImage:{
        "home": "url('/assets/jonathan-borba-8l8Yl2ruUsg-unsplash.jpg')"
      },

      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins'],
      },

      fontWeight: {
        'mligth': 500,
        'mregular': 600,
        'mbold': 700
        
      },

      boxShadow: {
        'black': '0 0 60px -40px rgba(0, 0, 0, 0.1)', // Configura a sombra branca
      },

      colors: {
        'preto': 'black',
        'laranja' : '#ff441f', // Defina sua cor personalizada
      }

    },
  },
  plugins: [],
}

