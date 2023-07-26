import {Tag} from "./tag";

export interface Photo {
  id: number;
  name: string;
  picture: string;
  tags: Tag[];
}
