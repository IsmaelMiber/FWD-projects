import React, { memo } from "react";
import {
  CURRENTLY_READING_TITLE,
  WANT_TO_READ_TITLE,
  READ_TITLE,
  NONE_TITLE,
  getCoresponder,
  CURRENTLY_READING,
  WANT_TO_READ,
  READ,
  NONE,
} from "../../helpers";
import connector from "../../HOCs/connector";

function SelectBox(props) {
  const { book, state, onChangeShelf } = props;
  const { shelf = NONE, id } = book;
  const { type } = getCoresponder(shelf);

  function onChange(event) {
    const { value } = event.target;
    if (shelf == NONE && value != NONE) {
      state.addBook({ ...book, shelf: value });
    } else if (value == NONE) {
      state.deleteBook(id);
    } else {
      state.updateBookStatus({ type, id, selectedType: value });
    }
    onChangeShelf && onChangeShelf(id, value);
  }

  return (
    <select value={type} onChange={onChange}>
      <option value="move" disabled>
        Move to...
      </option>
      <option value={CURRENTLY_READING}>{CURRENTLY_READING_TITLE}</option>
      <option value={WANT_TO_READ}>{WANT_TO_READ_TITLE}</option>
      <option value={READ}>{READ_TITLE}</option>
      <option value={NONE}>{NONE_TITLE}</option>
    </select>
  );
}

const MemorizedSelectBox = memo(SelectBox);

export default connector(MemorizedSelectBox);
