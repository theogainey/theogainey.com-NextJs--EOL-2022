import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.PROJECT_DB,
    sorts: [
      {
        property: 'Created',
        direction: 'descending',
      },
    ],
  });
  return response.results;
};

export const getID = async (pageSlug) => {
  const response = await notion.databases.query({
    database_id: process.env.PROJECT_DB,
  });
  let pageID;
  for (var i = 0; i < response.results.length; i++) {
    let temp = response.results[i]
    if (temp.properties.Slug.rich_text[0].plain_text === pageSlug) {
      pageID = temp.id
    }
  }

  return pageID;
};


export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};
