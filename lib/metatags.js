// need fallbacks

const axios = require('axios');


export async function parseOG(url) {
  const contents = await axios.request({ url }).then(res=> {return res.data});
  const parsed = contents.split('>').map(e=>e.trim()).filter(e=>e.length > 0)
  const ogtags ={}
  parsed.forEach(e=>{
    if (e.charAt(0).match(/[<]/)) {
      let value = e.slice(1)
      if (value.charAt(0)!='/') {
        if (value.match(/og:/)) {
          const tag = value.match(/"og:(\w+)"/)
          const content = value.match(/content="(.+)"/)
          if (tag ) {
            if (content) {
              ogtags[tag[1]] = content[1]
            }
            else {
              ogtags[tag[1]]= content
            }
          }
        }
      }
    }
  })
  if (!ogtags.title) {
    const fbtitle = contents.match(/<title>(.+)<\/title>/)
    if (fbtitle) {
      ogtags.title = fbtitle[1]
    }
  }
  return ogtags;
}
