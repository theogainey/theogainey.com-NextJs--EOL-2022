import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: `${process.env.PROJECT_DB}`,
    filter: {
      property: "slug",
      text: {
        is_not_empty: true
      }
    },
    sorts: [
      {
        property: 'created',
        direction: 'descending',
      },
    ],
  });
  return response.results;
};


export const getPage = async (pageSlug:string | string[]) => {
  const response = await notion.databases.query({
    database_id: `${process.env.PROJECT_DB}`,
    filter: {
      property: "slug",
      text: {
        contains: `${pageSlug}`
      }
    }
  });
  return response.results[0];
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};
