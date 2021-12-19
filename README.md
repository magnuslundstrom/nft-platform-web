# NFT-platform-web

This repository is all the code associated with the frontend of the "NFT-platform". The frontend is built with the React-based framework called NextJs.

Besides that you will also find E2E tests in the <rootDir>/tests.

The most important branches are develop, staging and production. In develop we merge in feature branches. Then we merge develop into staging and lastly from staging to production.

## Environment variables

Depending on what contract and chainId you want to target, you can pass the NEXT_PUBLIC_TARGET_ENV environment variable like such:

| NEXT_PUBLIC_TARGET_ENV | chainId |
| ---------------------- | ------- |
| dev                    | 1337    |
| staging                | 3       |
| prod                   | 1       |

**Note**: The addresses and ABIs will automatically be filtered based on the NEXT_PUBLIC_TARGET_ENV variable. If you don't pass any, dev is the default.

## Contracts

In order to update smart contract ABIs and chainIds attached to different environments, please reconfigure the appropriate file in the ./src/constants directory.

## Commonly used commands

### Install

`yarn`

### Development environment

`yarn develop`

### Run tests

`yarn test:unit:components`
`yarn test:unit:helpers`
`yarn test:e2e `

 ### Important information
 If the connect button does not work, please make sure that your Metamask is connected to a network chainId that is supported in the current environment.
