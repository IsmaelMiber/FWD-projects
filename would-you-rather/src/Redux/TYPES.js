const TYPES_LIST = [
  "USERS",
  "CURRENT_USER",
  "QUESTIONS",
  "OPTIONS",
  "ANSWER_QUESTION",
  "USER_LOGOUT",
  "LOADER",
  "OLD_FORMAT_QUESTIONS",
  "OLD_FORMAT_USERS",
];

let TYPES = {};

for (let TYPE of TYPES_LIST) {
  TYPES[TYPE] = TYPE;
}

export default TYPES;
