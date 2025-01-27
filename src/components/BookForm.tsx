import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TBook } from "../types";
import "../styles/BookForm.scss";
import { useSnackbar } from "notistack";

type TBookFormProps = {
  onAddBook: (book: TBook) => void;
  onEditBook: (book: TBook) => void;
  editingBook: TBook | null;
  onClose: () => void;
};

export const BookForm: React.FC<TBookFormProps> = ({
  onAddBook,
  onEditBook,
  editingBook,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, reset, setValue } = useForm<TBook>();

  useEffect(() => {
    if (editingBook) {
      const fields: (keyof TBook)[] = [
        "id",
        "title",
        "author",
        "description",
        "cover",
        "publicationDate",
      ];
      fields.forEach((field) => {
        if (field === "publicationDate") {
          setValue(field, editingBook[field].split("T")[0]);
        } else {
          setValue(field, editingBook[field]);
        }
      });
    } else {
      reset();
    }
  }, [editingBook, reset, setValue]);

  const onSubmit: SubmitHandler<TBook> = (data) => {
    if (editingBook) {
      onEditBook(data);
    } else {
      data.id = new Date().valueOf() * -1;
      onAddBook(data);
    }
    reset();
    onClose();
    enqueueSnackbar(
      editingBook
        ? "The book details has been updated"
        : `Book - ${data.title} has been added`,
      {
        variant: "success",
      },
    );
  };

  return (
    <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} />
      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} />
      </div>
      <div>
        <label>Author</label>
        <input {...register("author", { required: true })} />
      </div>
      <div>
        <label>Description</label>
        <textarea {...register("description", { required: true })} />
      </div>
      <div>
        <label>Cover URL</label>
        <input {...register("cover", { required: true })} />
      </div>
      <div>
        <label>Publication Date</label>
        <input
          type="date"
          {...register("publicationDate", { required: true })}
        />
      </div>
      <button type="submit">{editingBook ? "Edit Book" : "Add Book"}</button>
    </form>
  );
};
