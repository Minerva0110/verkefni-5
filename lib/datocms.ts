import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://graphql.datocms.com/", {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  },
});
