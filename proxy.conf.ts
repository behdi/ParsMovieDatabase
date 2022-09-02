const proxyConfig = [
  {
    context: ['/Login', '/Movie'],
    target: 'http://interview.tmskit.com/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
];

module.exports = proxyConfig;
