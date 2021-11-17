import Head from 'next/head'

import { GetStaticProps, GetStaticPaths } from 'next'
import {getAllPostIds, getPostsData } from '../../lib/markdownToHtml'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Test </title>
      </Head>

      <main className="flex flex-col items-center justify-start w-full flex-1 px-20 text-center">
        <h1>Test</h1>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getPostsData(params.id)

  return {
    props: {
      postData,
    }
  }
}


export default Page
