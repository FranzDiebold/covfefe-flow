.PHONY: help
help:  ## Show this help.
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

.PHONY: webapp-install
webapp-install:  ## Install dependencies for webapp
	cd webapp && npm install

.PHONY: webapp-serve
webapp-serve:  ## Serve app locally
	cd webapp && npm run start

.PHONY: webapp-lint
webapp-lint:  ## Lint TypeScript webapp code
	cd webapp && npm run lint

.PHONY: webapp-test
webapp-test:  ## Run webapp tests in watch mode
	cd webapp && npm run test

.PHONY: webapp-test-ci
webapp-test-ci:  ## Run webapp tests (for CI/CD)
	cd webapp && npm run test-ci

.PHONY: webapp-deploy-to-ghpages
webapp-deploy-to-ghpages:  ## Deploy webapp to GitHub Pages
	cd webapp && npm run deploy-to-ghpages

.PHONY: api-install-dev
api-install-dev:  ## Install development and production dependencies for API
	cd api/src && pip install -r requirements-dev.txt

.PHONY: api-install
api-install:  ## Install (production) dependencies for API
	cd api/src && pip install -r requirements.txt

.PHONY: api-lint
api-lint:  ## Lint Python API code
	pylint --version
	cd api/src && pylint *.py
