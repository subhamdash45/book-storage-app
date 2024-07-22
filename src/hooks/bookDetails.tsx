import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Book } from "../interfaces";
import { getBookDetails, getBooks } from "../apis/books";

export const useGetBooks = (): UseQueryResult<Book[], AxiosError> => {
  return useQuery<Book[], AxiosError>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

export const useGetBookDetails = (
  id: string,
): UseQueryResult<Book, AxiosError> => {
  return useQuery({
    queryKey: ["book-details", id],
    queryFn: () => getBookDetails(id),
  });
};
