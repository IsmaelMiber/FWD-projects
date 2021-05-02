import React from "react";
import SelectBox from "../SelectBox";

export default function Book(props) {
  const { info, onChangeShelf } = props;

  if (!info) {
    return null;
  }

  const { authors, imageLinks, title } = info;

  const { thumbnail } = imageLinks || {};

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
            backgroundColor: thumbnail ? "inherit" : "black",
          }}
        />
        <div className="book-shelf-changer">
          <SelectBox book={info} onChangeShelf={onChangeShelf} />
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors ? (
        <div className="book-authors">{authors.join(", ")}</div>
      ) : null}
    </div>
  );
}
