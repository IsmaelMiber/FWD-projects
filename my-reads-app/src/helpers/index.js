export const CURRENTLY_READING = "currentlyReading";
export const CURRENTLY_READING_TITLE = "Currently Reading";

export const READ = "read";
export const READ_TITLE = "Read";

export const WANT_TO_READ = "wantToRead";
export const WANT_TO_READ_TITLE = "Want To Read";
export const NONE = "none";
export const NONE_TITLE = "None";

export function getCoresponder(type) {
  switch (type) {
    case READ:
    case READ_TITLE:
      return { type: READ, title: READ_TITLE };

    case CURRENTLY_READING:
    case CURRENTLY_READING_TITLE:
      return { type: CURRENTLY_READING, title: CURRENTLY_READING_TITLE };

    case WANT_TO_READ:
    case WANT_TO_READ_TITLE:
      return { type: WANT_TO_READ, title: WANT_TO_READ_TITLE };

    default:
      return { type: NONE, title: NONE_TITLE };
  }
}
