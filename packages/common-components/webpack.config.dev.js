const path = require('path');

module.exports = {
  entry: './src/lib/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              },
              sourceMap: true,
            },
          },
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js',],
  },
  externals: {
    "react": "react",
    "react-dom": "react-dom",
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'common-components',
      type: 'umd',
      umdNamedDefine: true
    }
  },
};