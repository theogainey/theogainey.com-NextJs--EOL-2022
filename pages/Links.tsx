import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import {getBlocks, getPage} from '../lib/notion'
import Block from '../components/Block'
import Bookmark from '../components/Bookmark'
import React from "react";
import {parseOG} from '../lib/metatags'

const LinkPage = ({pageProps, blocks}) => {
  return (
    <Layout>
      <Head>
        <title>Theo Gainey </title>
      </Head>
      <section  className="my-16 w-full">
      <h1 className="text-4xl font-bold my-4 py-2">{pageProps.title.title[0].plain_text}</h1>

      <div className="notion">
      {blocks.map((block) =>
        <React.Fragment key={block.id} >

        {(block.type === 'bookmark')? (

          <Bookmark {...block}/>
        ):(

        <Block key={block.id}  {...block}/>
        )}
        </React.Fragment>
      )}
      </div>
      </section>
    </Layout>
  )
}


export const getStaticProps = async () => {
  const page = await getPage(process.env.LINK_PAGE);
  const blocks = await getBlocks(process.env.LINK_PAGE);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = await Promise.all( blocks.map( async (block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    if (block.type==='bookmark') {
      if (block.bookmark.url) {
        const og = await parseOG(block.bookmark.url)
        return {...block, og: og}
      }
      else{
        return block;
      }
    }
    else{
      return block;

    }
  })
);




  return {
    props: {
      pageProps: page.properties,
      blocks: blocksWithChildren
    },
    revalidate: 1000,
  };
};

export default LinkPage
