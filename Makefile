.PHONY: webapp-install
webapp-install:
	cd webapp && npm install

.PHONY: webapp-serve
webapp-serve:
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

.PHONY: api-install-dev
api-install-dev:
	cd api/src && pip install -r requirements-dev.txt

.PHONY: api-install
api-install:
	cd api/src && pip install -r requirements.txt

.PHONY: api-lint
api-lint:
	pylint --version
	cd api/src && pylint *.py
