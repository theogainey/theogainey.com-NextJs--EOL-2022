const axios = require("axios");
//step 1 turn html string into tokens
//step 2 scan for og meta tags in one pass
//-these tags exist inside <head></head>
//-exit the scan after reaching </head>
//step 3 scan for fallbacks if needed
//-right now just title
export async function parseOG(url) {
  const contents = await axios
    .request({ url })
    .then((res) => res.data);
  const tokens = contents
    .split(">")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
  const ogtags = {}
  tokens.every((e, i) => {
    if (e.charAt(0).match(/[<]/) && e.charAt(1) !== "/") {
      if (e.match(/og:/)) {
        const tagData = e.match(/"og:(\w+)"/);
        const contentData = e.match(/content="(.+)"/);
        if (tagData && contentData) {
          const tag = tagData[1];
          const content = contentData[1];
          ogtags[tag] = content;
        }
      }
    }
    return e.slice(1,6) !== '/head'
  })

  if (!ogtags.title) {
    const fbtitle = contents.match(/<title>(.+)<\/title>/);
    if (fbtitle) {
      const title = fbtitle[1];
      ogtags["title"] = title;
    }
  }
  return ogtags;
}
