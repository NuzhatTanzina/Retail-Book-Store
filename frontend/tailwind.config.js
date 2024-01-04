// tailwind.config.js
module.exports = {
  content: [
    // './src/**/*.{js,ts,jsx,tsx}', // Adjust this to match your project structure
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    // Other plugins...
  ],
}
