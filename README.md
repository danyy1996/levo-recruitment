[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
# Levo Recruitment

This is the Levo recruitment test bootstrap app.

## Development

This app is using **lint-staged**, **prettier**, **eslint**, **editorconfig**, and **stylelint** to ensure code is properly formatted.

This app is also using **husky**, **commitizen**, and **commitlint** to allow developers to quickly write commit messages in accordance with [Angular Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

To see this in action, do the following:

1. fork this repo
2. clone the forked repo to your pc
2. make some changes to staged files inside src
3. git add .
4. git commit

If this has been done correctly, husky will run the pre-commit lint-staged hook which will run eslint, prettier and stylelint on ts, tsx and scss files accordingly. It will then run jest to ensure the files pass the relevant tests.

After that succeeds, you will be greeted with an interactive menu in the terminal which will walk you through creating your commit message in accordance with **Angular Conventional Commits**. Once finished, you will be given a chance to review your commit message using your default text-editor.

Lastly, husky will fire the commit-msg hook which will, in turn, run commitlint that will ensure your commit message complies with **Angular Conventional Commits**. If everything succeeds, you will be able to commit your staged files.

The benefits of using this method are that:

1. All developers will be forced to make detailed commits
2. You can integrate Angular Commits with libraries such as **conventional-changelog** which can automatically create styled CHANGELOG.md files as well as automatically bump the package.json version in accordance with SemVer by parsing your commit messages. This allows you to automatically generate git releases without having to manually create a CHANGELOG file or thinking about what to bump the version to

## Building and running on localhost

First install dependencies:

```sh
yarn install
```

To run the webpack dev server:

```sh
yarn start
```

To create a production build:

```sh
yarn build
```

## Testing

To run unit tests:

```sh
yarn test
```


