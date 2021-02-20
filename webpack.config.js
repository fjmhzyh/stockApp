'use strict';
// https://yuque.com/easy-team/egg-react
module.exports = {
  devtool: 'source-map',
  entry: {
    intro: 'app/web/page/intro/index.jsx',
    collection: 'app/web/page/collection/index.jsx',
  },
  plugins:[
    {
      imagemini: false
    }
  ]
};
