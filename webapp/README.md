<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">

# Webapp

[![CI/CD status badge](https://github.com/FranzDiebold/covfefe-flow/workflows/CI/CD/badge.svg)](https://github.com/FranzDiebold/covfefe-flow/actions?query=workflow%3ACI%2FCD)
[![Angular: v10](https://img.shields.io/badge/Angular-v10-DD0031.svg)](package.json)
<a href="https://www.covfefe-flow.tk" target="_blank"><img src="https://img.shields.io/badge/demo-online-009df4.svg" alt="demo: online"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../LICENSE)

> Check out the [live demo](https://www.covfefe-flow.tk)!

[Angular v10](https://github.com/angular/angular) app using the [Bulma](https://github.com/jgthms/bulma) CSS framework.

Angular concepts/techniques used:

- [Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS v6](https://github.com/ReactiveX/rxjs) for advanced asynchronous programming with observable streams using the ["pipeable operators"](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/pipeable-operators.md).

## Main components

### autocomplete

The actual fake tweet autocompletion view.

### about

User-centric description of the covfefe-flow project.

### legal & privacy

## Configuration

In `src/environments/environment.[prod].ts` you may change the `apiEndpoint` of the corresponding backend, the `beginningOfTweetMaxLength` and the `twitterUsername`:

```typescript
export const environment = {
  ...,
  apiEndpoint: 'https://<region>-<project_name>.cloudfunctions.net/autocomplete',
  beginningOfTweetMaxLength: 50,
  twitterUsername: 'covfefeflow'
};
```

In `src/variables.scss` you may change the color scheme:

```scss
$color-primary: #009df4;
$color-secondary: #00f457;
$color-tertiary: #f45700;
$color-gray: #575756;
$color-light-gray: #d9d9da;
$color-error: $color-tertiary;
```

## Installation

To install the dependencies:

```bash
make webapp-install
```

## Tests

For running the tests:

```bash
make webapp-test
```

Or just test/serve the app locally:

```bash
make webapp-serve
```

and run [Chrome](https://www.google.com/chrome/) in *disabled web security* mode (for enabling CORS) and in *incognito* mode (on macOS):

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir=/tmp/user_data_dir/ -incognito
```

Your app is then running on [`http://localhost:4200`](http://localhost:4200).

## Linting

To run [TSLint](https://github.com/palantir/tslint):

```bash
make webapp-lint
```

## Deployment

To deploy to [GitHub Pages](https://pages.github.com/):

```bash
make webapp-deploy-to-ghpages
```
