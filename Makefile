build:
	docker-compose run --rm --entrypoint npm app i
	docker-compose run --rm --entrypoint npm server i

prod:
	docker-compose -f docker-compose.prod.yml up