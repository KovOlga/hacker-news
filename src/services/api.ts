import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment, INewsItem } from "../types/data";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hacker-news.firebaseio.com/v0/",
  }),
  endpoints: (builder) => ({
    getTopNews: builder.query<INewsItem[], void>({
      query: () => "newstories.json",
      transformResponse: async (response: INewsItem[]) => {
        const idArr = response.slice(0, 5);
        const requests = idArr.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const res = await Promise.all(requests);
        return res;
      },
    }),
    getNewsItemById: builder.query<INewsItem, number>({
      query: (id) => `item/${id}.json`,
    }),
    getNewsItemRootComments: builder.query<IComment[], number>({
      query: (id) => `item/${id}.json`,
      transformResponse: async (response: INewsItem) => {
        const parentCommentsRequests = response.kids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const res = await Promise.all(parentCommentsRequests);
        return res;
      },
    }),
    getCommentKids: builder.query<IComment, number>({
      query: (id) => `item/${id}.json`,
      transformResponse: async (response: IComment) => {
        const getDeepComments = async (obj: IComment) => {
          const modifiedObj = { ...obj };
          if (modifiedObj.kids) {
            const requests = modifiedObj.kids.map((id) =>
              fetch(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`
              ).then((res) => res.json())
            );
            const loaded = await Promise.all(requests);
            modifiedObj.loadedKids = await Promise.all(
              loaded.map((comment) => getDeepComments(comment))
            );
          }
          return modifiedObj;
        };
        const res = await getDeepComments(response);
        // console.log("tftf", res);
        return res;
      },
    }),
  }),
});

export const {
  useGetTopNewsQuery,
  useGetNewsItemByIdQuery,
  useGetCommentKidsQuery,
  useGetNewsItemRootCommentsQuery,
} = newsApi;
