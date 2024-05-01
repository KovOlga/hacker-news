export interface INewsItem {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: any;
  title: string;
  type: string;
  url: string;
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
