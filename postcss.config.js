const rege = [
  /el-.+$/,
  /::-webkit/,
  /v-/,
  /^!/,
  /class/,
  /-(leave|enter|appear)(|-(to|from|active))$/,
  /^(?!(|.*?:)cursor-move).+-move$/,
  /^router-link(|-exact)-active$/,
  /data-v-.*/
]

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],

  rejected: true,
  // https://github.com/FullHuman/purgecss/issues/439
  safelist: {
      standard: rege,
      deep: rege,
      greedy: [],
      keyframes: [],
      variables: []
  },
  // This is the function used to extract class names from your templates
  defaultExtractor: content => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  }
})
// https://github.com/tailwindlabs/discuss/issues/71
const atImport = require('postcss-import')
module.exports = {
  plugins: [
    atImport(),
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
    ? [purgecss]
    : []
  ]
}