import axios from "axios";
import { TBook } from "../types";

export const getBooks = async (): Promise<TBook[]> => {
  const { data } = await axios.get(
    "https://my-json-server.typicode.com/cutamar/mock/books",
  );
  return data;
};

export const getBookDetails = async (id: string): Promise<TBook> => {
  const { data } = await axios.get(
    `https://my-json-server.typicode.com/cutamar/mock/books/${id}`,
  );
  return data;
};
