const { createProxyMiddleware } = require('http-proxy-middleware');

//TOKEN_API = https://auth-service.dndbeyond.com/v1/cobalt-token
//API = https://character-service.dndbeyond.com/character/v5/
//SCDS = https://character-service-scds.dndbeyond.com/v1/characters

module.exports = function(app) {
  app.use(
    'https://auth-service.dndbeyond.com/v1/cobalt-token',
    createProxyMiddleware({
      target: 'www.dndbeyond.com',
      changeOrigin: true,
    })
  );

};