   // vue.config.js
   module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://crudcrud.com',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  };