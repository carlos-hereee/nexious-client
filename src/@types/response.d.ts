// default generic for data response should be string
declare module "data-response" {
  import { AppProps } from "app-types";

  export interface DataResponse<T = string | AppProps> {
    data: T;
  }
}
