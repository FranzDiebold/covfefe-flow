<img src="../design/logo/covfefe-flow-logo.png" alt="covfefe-flow logo" style="max-width:100%;" width="400px" height="70px">


# Webapp

[![Angular: v5](https://img.shields.io/badge/Angular-v5-DD0031.svg)](./covfefe-flow/package.json)
<a href="https://www.covfefe-flow.ml" target="_blank"><img src="https://img.shields.io/badge/demo-online-009df4.svg" alt="demo: online"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./covfefe-flow/LICENSE.md)

> Check out the [live demo](https://www.covfefe-flow.ml)!

[Angular v5](https://github.com/angular/angular) app using the [Bulma](https://github.com/jgthms/bulma) CSS framework.

Angular concepts/techniques used:
- [Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS v5.5](https://github.com/ReactiveX/rxjs) for advanced asynchronous programming with observable streams using the newly introduced (v5.5) ["pipeable operators"](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md).



## Main components

### generate
The actual fake tweet creation view.

### about
User-centric description of the covfefe-flow project.

### legal & privacy



## Configuration
In `src/environments/environment.[prod].ts` you may change the `apiEndpoint` of the corresponding backend, the `beginningOfTweetMaxLength` and the `twitterUsername`:
```typescript
export const environment = {
  ...,
  apiEndpoint: 'https://api.covfefe-flow.ml',
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



## Tests
For running the tests:
```bash
npm install
ng test
```

Or just testing the app locally:

Serve app locally
```bash
npm install
ng serve
```
and run [Chrome](https://www.google.com/chrome/) in *disabled web security* mode (for enabling CORS) and in *incognito* mode (on macOS):
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir -incognito
```
Your app is then running at [`http://localhost:4200`](http://localhost:4200).



## Deployment
The covfefe-flow client Angular app is built and served using the [multi-stage build](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) Docker feature. Check out the respective [Dockerfile](./Dockerfile):
1. For building the Angular app (stage 1) via `npm run build-prod-i18n` a Node.js Alpine Docker image is used.
2. For serving the app (stage 2) a [nginx](https://nginx.org) webserver is employed. The nginx configuration can be found in [`nginx.conf`](./nginx.conf).



## TODOs
- [ ] None (Enjoy your day!)