const { checkForName } = require("../nameChecker");

test("Check Picard", () => {
  expect(checkForName("Picard")).toBe(true);
});

test("Check John", () => {
  expect(checkForName("John")).toBe(false);
});

test("Check Kirk", () => {
  expect(checkForName("Kirk")).toBe(true);
});
