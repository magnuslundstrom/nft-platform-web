// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const synpressPath = path.join(
  process.cwd(),
  '/node_modules/@synthetixio/synpress',
);

module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
  rules: {
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/await-async-query': 'off',
    'ui-testing/missing-assertion-in-test': 'off',
    'ui-testing/no-absolute-url': 'off',
  },
};
