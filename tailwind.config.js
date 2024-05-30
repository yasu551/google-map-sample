import daisyui from "daisyui";
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  plugins: [
      daisyui,
  ],
  daisyui: {
    themes: ['retro'],
  },
}
