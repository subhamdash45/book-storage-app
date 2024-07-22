import axios from "axios";
import { Book } from "../interfaces";

export const getBooks = async (): Promise<Book[]> => {
  console.log("Fetching books...");
  const { data } = await axios.get(
    "https://my-json-server.typicode.com/cutamar/mock/books",
  );
  return data;
};

export const getBookDetails = async (id: string): Promise<Book> => {
  const { data } = await axios.get(
    `https://my-json-server.typicode.com/cutamar/mock/books/${id}`,
  );
  return data;
};
