export interface INewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: any;
  title: string;
  type: string;
  url: string;
}

export interface INewsItemWithComments {
  newsItem: INewsItem;
  comments: IComment[];
}

export interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: any;
  type: string;
}
