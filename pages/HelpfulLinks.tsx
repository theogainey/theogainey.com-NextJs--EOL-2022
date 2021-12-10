import Head from 'next/head'
import Layout from '../components/Layout'
import {getBlocks, getPage} from '../lib/notion'
import Block from '../components/Block'
import {parseOG} from '../lib/metatags'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {useMemo} from 'react'

const LinkPage = ({blocks}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const content = useMemo(() => blocks.map((block) =>
    <Block key={block.id} {...block}/>
  ));

  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://theogainey.com/HelpfulLinks" key="canonical"/>
        <meta name="description" content="Links To Helpful Reasources"/>
        <meta property="og:title" content="Theo Gainey - Helpful Links" />
        <meta property="og:site_name" content="Theo Gainey"/>
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://theogainey.com/HelpfulLinks" />
        <meta property="og:description" content="Links To Helpful Reasources"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@GaineyTheo" />
        <meta name="twitter:title" content="Theo Gainey - Helpful Links"  />
        <meta name="twitter:description" content="Links To Helpful Reasources"/>
        <title>Theo Gainey - Helpful Links </title>
      </Head>
      <article  className=" w-full">
        <h1 className="text-4xl font-bold  pb-2">Helpful Links</h1>
        <div className="notion">
        {content}
        </div>
      </article>
    </Layout>
  )
}


export const getStaticProps:GetStaticProps = async () => {
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
    else if (block.type==='link_preview'){
      if (block.link_preview.url) {
        const og = await parseOG(block.link_preview.url)
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
      blocks: blocksWithChildren
    },
    revalidate: 10,
  };
};

export default LinkPage
