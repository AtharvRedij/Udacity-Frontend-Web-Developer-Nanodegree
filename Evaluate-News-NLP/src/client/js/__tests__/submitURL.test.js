const { validURL } = require("../submitURL");

test("Check www.google.com", () => {
  expect(validURL("www.google.com")).toBe(true);
});

test("Check www.google..com", () => {
  expect(validURL("www.google..com")).toBe(false);
});

test("Check www.@facebook.com", () => {
  expect(validURL("www.@facebook.com")).toBe(false);
});
