const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minWidth: {
        '1/6': '16.666667%',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        'screen-1/2': '50vh',
        'screen-1/3': '33vh',
        'screen-2/3': '66vh',
        'screen-1/4': '25vh',
        'screen-3/4': '75vh',
        'screen-1/5': '20vh',
        'screen-2/5': '40vh',
        'screen-3/5': '60vh',
        'screen-4/5': '80vh',
        'screen-1/10': '90vh',
      },

      colors: {
        background: '#14161a',
        primary: {
          default: colors.red['500'],
          dark: colors.red['700'],
          light: colors.red['300'],
          transparent: colors.red['500'] + '60',
        },
        secondary: {
          default: colors.white,
          dark: colors.purple['700'],
          light: colors.purple['300'],
        },
      },
    },
  },
  plugins: [],
}
