.PHONY: test test-code-checkers

default: format lint-js-fix credo test

format:
	mix format

credo:
	mix credo

db-recreate:
	mix ecto.reset
	mix run priv/repo/seeds.exs

lint-js:
	yarn lint

lint-js-fix:
	yarn lint --fix

start:
	bin/codebattle eval "Codebattle.Utils.Release.migrate"
	bin/codebattle start

console:
	iex -S mix

test:
	mix coveralls.json --exclude code_check --max-failures 1

test-code-checkers: export CODEBATTLE_RUN_CODE_CHECK = true
test-code-checkers:
	mix test test/code_check --max-failures 1

build-and-push-base:
	docker build -t codebattle/base --file Dockerfile.base .
	docker push codebattle/base:latest
