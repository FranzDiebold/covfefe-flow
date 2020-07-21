.PHONY: webapp-install
webapp-install:
	cd webapp && npm install

.PHONY: webapp-serve
webapp-deploy:
	cd webapp && npm run start

.PHONY: webapp-lint
webapp-lint:
	cd webapp && npm run lint

.PHONY: webapp-test
webapp-test:
	cd webapp && npm run test

.PHONY: webapp-test-ci
webapp-test-ci:
	cd webapp && npm run test-ci

.PHONY: webapp-deploy-to-ghpages
webapp-deploy-to-ghpages:
	cd webapp && npm run deploy-to-ghpages
