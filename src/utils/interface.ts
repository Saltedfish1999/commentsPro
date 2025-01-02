//分组
export interface SubsetData {
  id: number;
  name: string;
  value: number;
  moment?: string;
}
//标签
export interface LabelData {
  id: number;
  title: string;
  content: string;
  date: string;
  view: number;
  like: number;
  comments: number;
  name?: string;
  moment?: string;
  state: number;
}
