// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getPostsData} from '../../lib/markdownToHtml'
export default async function handler(req, res) {

  const allPostsData = await getPostsData('card-score')

  return res.status(200).json(allPostsData);

}
