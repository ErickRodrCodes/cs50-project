const { join } = require('path');
console.log(join(__dirname, 'tailwind.config.js'));

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
