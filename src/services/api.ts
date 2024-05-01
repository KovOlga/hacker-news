import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment, INewsItem } from "../types/data";

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
    getNewsById: builder.query<INewsItem, number>({
      query: (id) => `item/${id}.json`,
    }),
    getCommentsById: builder.query<IComment, number>({
      query: (id) => `item/${id}.json`,
    }),
  }),
});

export const { useGetTopNewsQuery, useGetNewsByIdQuery } = newsApi;
