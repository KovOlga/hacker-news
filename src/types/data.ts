export interface INewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IComment {
  by: string;
  id: number;
  kids?: number[];
  loadedKids: IComment[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
