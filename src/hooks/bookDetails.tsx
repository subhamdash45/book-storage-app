import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TBook } from "../types";
import { getBooks } from "../apis/books";

export const useGetBooks = (): UseQueryResult<TBook[], AxiosError> => {
  return useQuery<TBook[], AxiosError>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

// can be used later point
// export const useGetBookDetails = (
//   id: string,
// ): UseQueryResult<TBook, AxiosError> => {
//   return useQuery({
//     queryKey: ["book-details", id],
//     queryFn: () => getBookDetails(id),
//   });
// };
