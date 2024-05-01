import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment, INewsItem, INewsItemWithComments } from "../types/data";

export const newsApi = createApi({
  reducerPath: "pokemonApi",
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
    getNewsItemById: builder.query<INewsItemWithComments, number>({
      query: (id) => `item/${id}.json`,
      transformResponse: async (response: INewsItem) => {
        const parentCommentsRequests = response.kids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const res = await Promise.all(parentCommentsRequests);
        return { newsItem: response, comments: res };
      },
    }),
    getCommentKids: builder.query<IComment[], number>({
      query: (id) => `item/${id}.json`,
      transformResponse: async (response: IComment) => {
        const requests = response.kids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const res = await Promise.all(requests);
        return res;
      },
    }),
  }),
});

export const {
  useGetTopNewsQuery,
  useGetNewsItemByIdQuery,
  useGetCommentKidsQuery,
} = newsApi;
