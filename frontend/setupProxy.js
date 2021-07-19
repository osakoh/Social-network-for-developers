const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://code-net.herokuapp.com",
      changeOrigin: true,
    })
  );
};

// module.exports = function (app) {
//   app.use(proxy("/api", { target: "http://localhost:5000" }));
// };
