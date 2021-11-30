import Head from 'next/head'
import Layout from '../../components/Layout'
import Block from '../../components/Block'
import {getDatabase, getPage, getBlocks, getID} from '../../lib/notion'
import {parseOG} from '../../lib/metatags'

const Page = ({blocks, pageProps:{Description, Slug, GitHub, Demo, Name}}) => {
  return (
    <Layout>
      <Head>
        <title>{Name.title[0].plain_text} </title>
      </Head>
      <section  className="my-16 w-full">
        <h1 className="text-4xl font-bold my-4 py-2">{Name.title[0].plain_text}</h1>
        <div className="notion">
        {blocks.map((block) =>
          <Block key={block.id} {...block}/>
        )}
        </div>
        </section>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(process.env.PROJECT_DB);
  return {
    paths: database.map((page) => ({ params: { id: page.properties.Slug.rich_text[0].plain_text } })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const pageID = await getID(id)
  const page = await getPage(pageID);
  const blocks = await getBlocks(pageID);
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
      pageProps: page.properties,
      blocks: blocksWithChildren
    },
    revalidate: 10,
  };
};


export default Page
