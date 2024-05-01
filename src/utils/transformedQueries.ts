export const getKidsComments = async (ids: number[]) => {
  const requests = ids.map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
      res.json()
    )
  );
  const res = await Promise.all(requests);
  return res;
};
