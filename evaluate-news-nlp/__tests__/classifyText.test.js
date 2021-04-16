import classifiyText from "../__mocks__/classifyText";

const text = "The 85th Academy Awards ceremony took place February 24, 2013.";
it("classify text requests test", () => {
  return classifiyText(text).then((data) => {
    const { category_list } = data;
    const labels = category_list.map(({ label }) => label);

    return expect(labels.length).toEqual(2);
  });
});
