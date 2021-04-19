let port = 8081;
if (process.env.NODE_ENV == "development") {
  port = 8080;
}
const CLASSIFICATION = `"https://api.meaningcloud.com"/class-2.0`;

const CLASSIFYTEXT = `http://localhost:${port}/classify`;

module.exports = { CLASSIFICATION, CLASSIFYTEXT };
