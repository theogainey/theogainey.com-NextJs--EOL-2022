const axios = require('axios');
type OgTags = {
   [key: string]: string;
}

export async function parseOG(url:string) {
  const contents = await axios.request({ url }).then((res:any):any => {return res.data});
  const parsed = contents.split('>').map((e:string)=>e.trim()).filter((e:string)=>e.length > 0)
  const ogtags: OgTags ={}
  parsed.forEach((e:string)=>{
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
