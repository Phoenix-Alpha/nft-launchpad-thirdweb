/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './utils/**/*.ts',
    './styles/**/*.scss'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
