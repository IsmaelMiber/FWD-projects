const DATA = {
  academyAwardsFACT: {
    text: "The 85th Academy Awards ceremony took place February 24, 2013.",
    response: {
      status: {
        code: "0",
        msg: "OK",
        credits: "5",
      },
      category_list: [
        {
          code: "01021001",
          label:
            "arts, culture and entertainment - entertainment (general) - entertainment award",
          abs_relevance: "0.48236102",
          relevance: "100",
        },
        {
          code: "08006000",
          label: "human interest - award and prize",
          abs_relevance: "0.28744578",
          relevance: "60",
        },
      ],
    },
  },
};

export default function classifiyText(text) {
  return new Promise(function promiseHandler(resolve, reject) {
    process.nextTick(() => {
      if (text == DATA.academyAwardsFACT.text) {
        resolve(DATA.academyAwardsFACT.response);
      } else {
        reject(
          `\`${text}\` can't be classified, please check your text and try again`
        );
      }
    });
  });
}
