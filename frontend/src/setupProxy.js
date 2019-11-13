const proxy = require('http-proxy-middleware');

const proxyTarget = `http://127.0.0.1:${process.env.BACKEND_PORT}/`;

module.exports = function(app) {
  app.use(
    /(api\/|uploads\/)/,
    proxy({
      target: proxyTarget,
      secure: false,
      changeOrigin: true,
    })
  );
};
