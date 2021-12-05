const axios = require('axios');
type OgTags = {
   [key: string]: string;
}

export async function parseOG(url:string) {
  const contents = await axios.request({ url }).then((res:any):any => {return res.data});
  const tokens = contents.split('>').map((e:string)=>e.trim()).filter((e:string)=>e.length > 0)
  const ogtags: OgTags ={}
  tokens.forEach((e:string)=>{
    if (e.charAt(0).match(/[<]/) && e.charAt(1)!='/') {
      if (e.match(/og:/)) {
        const tag = e.match(/"og:(\w+)"/)
        const content = e.match(/content="(.+)"/)
        if (tag && content) {
            ogtags[tag[1]] = content[1]
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
