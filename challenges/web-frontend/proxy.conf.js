var HttpsProxyAgent = require('https-proxy-agent');

var proxyConfig = [{
  context: '/api',
  target: {
      host: "api-core-dev.caronsale.de",
      protocol: "https:",
      port: 443
    },
  secure: false,
  changeOrigin: true,
  logLevel: "info"
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);