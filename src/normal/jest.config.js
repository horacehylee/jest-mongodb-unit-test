// Copyright (c) 2018 horace
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
  displayName: 'Normal',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
