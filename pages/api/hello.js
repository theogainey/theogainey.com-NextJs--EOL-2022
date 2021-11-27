// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const parse5 = require('parse5');

export default async function handler(req, res) {
  const {
    query: { url},
  } = req
  const html={};
  const fetchPromise = await fetch(url).then(data => html.string = data)

  return res.status(200).json({html});

}
