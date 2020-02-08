module.exports = {
  entry: 'blackbox_plus_basics.js',
  output: {
    path: 'dist',
    filename: 'blackbox_plus.js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [
          'babel'
        ],
        include: 'blackbox_plus_basics.js',
        query: {
          presets: [
            'es2015'
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      }
    ]
  }
}