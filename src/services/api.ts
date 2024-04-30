import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "../types/data";

export const newsApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hacker-news.firebaseio.com/v0/",
  }),
  endpoints: (builder) => ({
    getTopNews: builder.query<INews[], void>({
      query: () => "newstories.json",
      transformResponse: async (response: INews[]) => {
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
    // getNewsById: builder.query<any, number>({
    //   query: (id) => `item/${id}.json`,
    // }),
  }),
});

export const { useGetTopNewsQuery } = newsApi;
