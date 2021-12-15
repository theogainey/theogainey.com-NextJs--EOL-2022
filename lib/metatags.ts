const axios = require("axios");
type OgTags = {
  [key: string]: string;
};

export async function parseOG(url: string) {
  const contents = await axios
    .request({ url })
    .then((res: any): any => res.data);
  const tokens = contents
    .split(">")
    .map((e: string) => e.trim())
    .filter((e: string) => e.length > 0);
  const ogtags: OgTags = tokens.reduce((pv, cv) => {
    if (cv.charAt(0).match(/[<]/) && cv.charAt(1) !== "/") {
      if (cv.match(/og:/)) {
        const tagData = cv.match(/"og:(\w+)"/);
        const contentData = cv.match(/content="(.+)"/);
        if (tagData && contentData) {
          const tag = tagData[1];
          const content = contentData[1];
          pv[tag] = content;
        }
      }
    }
    return pv;
  }, {});
  if (!ogtags.title) {
    const fbtitle = contents.match(/<title>(.+)<\/title>/);
    if (fbtitle) {
      const title = fbtitle[1];
      ogtags["title"] = title;
    }
  }
  return ogtags;
}
