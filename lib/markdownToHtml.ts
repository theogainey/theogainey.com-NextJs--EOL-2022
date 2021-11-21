import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
const projectsDirectory = path.join(process.cwd(), 'projects')



export function getSortedPostsData():PostMetaData[] {
  const fileNames = fs.readdirSync(projectsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data
    }
  })

  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  return allPostsData
}



export function getAllPostIds():PostId[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      }
    }
  })
}

export async function getPostsData(id){
  const fullPath = path.join(projectsDirectory, `${id}.mdx`)
  const source = fs.readFileSync(fullPath)
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  scope: data,
  })

  return {
    id,
    ...data,
    source: mdxSource,

  }
}
