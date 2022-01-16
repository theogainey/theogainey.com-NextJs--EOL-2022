const axios = require("axios");

function getTokens(htmlString) {
  return htmlString.split(">").map((e) => e.trim()).filter((e) => e.length > 0);
}

function filterTokens(tokens) {
  return tokens.filter((e)=> e.charAt(0).match(/[<]/) && e.charAt(1) !== "/" && e.match(/"og:(\w+)"/));
}
function metaContent(token) {
  const tagData = token.match(/og:(\w+)/);
  const contentData = token.match(/content="(.+)"/);
  return [tagData[1], contentData[1]]
}

export async function parseOG(url) {
  const contents = await axios
    .request({ url })
    .then((res) => res.data);
  const tokens = getTokens(contents);
  const metaData = filterTokens(tokens).map((e)=>metaContent(e));
  return Object.fromEntries(metaData);
}
