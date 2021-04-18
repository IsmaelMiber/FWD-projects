const CLASSIFICATION = `"https://api.meaningcloud.com"/class-2.0`;
console.warn(process.env);
const CLASSIFYTEXT = `http://localhost:${process.env.PORT}/classify`;

module.exports = { CLASSIFICATION, CLASSIFYTEXT };
