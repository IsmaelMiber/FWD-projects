import React, { memo } from "react";
import Book from "../Book";
import connector from "../../HOCs/connector";
import { getCoresponder } from "../../helpers";

function BookShelf(props) {
  const { type, state = {} } = props;
  const { title } = getCoresponder(type);

  const books = state[type] || [];

  if (books.length == 0) {
    return null;
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.state[type].map((book) => {
            return (
              <li key={book.id}>
                <Book info={book} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

const MemorizedBookShelf = memo(BookShelf);

export default connector(MemorizedBookShelf);
