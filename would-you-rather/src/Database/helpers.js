import { users, questions } from "./data";

export function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

export function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion({ question, users, questions }) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      const newQuestions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      const newUsers = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id]),
        },
      };

      res({ questions: newQuestions, users: newUsers });
    }, 1000);
  });
}

export function _saveQuestionAnswer({
  authedUser,
  qid,
  answer,
  users,
  questions,
}) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const newUsers = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      const newQuestions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
          timestamp: Date.now(),
        },
      };

      res({ questions: newQuestions, users: newUsers });
    }, 500);
  });
}

function createQuestionsTable(data) {
  const allIds = Object.keys(data);
  const questions = Object.values(data);
  var byId = {};

  const sortedQuestions = questions.sort((a, b) => b.timestamp - a.timestamp);
  for (const { id, author, timestamp, ...options } of sortedQuestions) {
    const optionsData = Object.values(options);
    let votes = 0;

    let optionVotes = 0;
    let optionIndex = 0;
    for (let i = 0; i < optionsData.length; ++i) {
      const option = optionsData[i];
      const { length } = option.votes;
      votes += length;
      if (length > optionVotes) {
        optionVotes = length;
        optionIndex = i;
      }
    }

    byId[id] = {
      id,
      author,
      timestamp,
      selectedOptionIndex: optionIndex,
    };
  }

  return { byId, allIds };
}

function createOptionsTable(data) {
  const questions = Object.values(data);

  var byId = {};
  var allIds = [];

  for (const { id, author, timestamp, ...options } of questions) {
    byId[id] = options;
    allIds.push(id);
  }

  return { byId, allIds };
}

function createUsersTable(data) {
  const allIds = Object.keys(data);
  const users = Object.values(data);

  const byId = {};

  for (const user of users) {
    let copyUser = { ...user };

    copyUser.questionsCount = copyUser.questions.length;
    copyUser.answeresCount = Object.keys(copyUser.answers).length;
    copyUser.sum = copyUser.questionsCount + copyUser.answeresCount;

    delete copyUser.questions;

    byId[user.id] = copyUser;
  }

  return { byId, allIds };
}

function createQuestionsTableBackend(questions, options) {
  const { byId, allIds } = questions;
  const formattedQuestions = {};
  for (const id of allIds) {
    const { author, timestamp } = byId[id];
    formattedQuestions[id] = {
      id,
      author,
      timestamp,
      ...options.byId[id],
    };
  }

  return formattedQuestions;
}

function createUsersTableBackend(users) {
  const { allIds, byId } = users;
  const formattedUsers = {};
  for (const id of allIds) {
    const { name, avatarURL, answers } = byId[id];
    formattedUsers[id] = {
      id,
      name,
      avatarURL,
      answers,
      questions: Object.keys(answers),
    };
  }

  return formattedUsers;
}

export function unnormalizeData({ questions, options, users }) {
  const questionsTable = createQuestionsTableBackend(questions, options);
  const usersTable = createUsersTableBackend(users);

  return { questions: questionsTable, users: usersTable };
}

export function normalizeData(questions, users) {
  const questionsTable = createQuestionsTable(questions);
  const optionsTable = createOptionsTable(questions);
  const usersTable = createUsersTable(users);
  const oldFormat = unnormalizeData({
    questions: questionsTable,
    options: optionsTable,
    users: usersTable,
  });

  return {
    questions: questionsTable,
    options: optionsTable,
    users: usersTable,
    oldFormat,
  };
}
