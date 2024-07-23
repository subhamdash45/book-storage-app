import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TBook } from "../types";
import { getBookDetails, getBooks } from "../apis/books";

export const useGetBooks = (): UseQueryResult<TBook[], AxiosError> => {
  return useQuery<TBook[], AxiosError>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

export const useGetBookDetails = (
  id: string,
): UseQueryResult<TBook, AxiosError> => {
  return useQuery({
    queryKey: ["book-details", id],
    queryFn: () => getBookDetails(id),
  });
};
