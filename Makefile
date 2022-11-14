.PHONY: up
up:
	docker-compose up -d

.PHONY: install
install:
	npm install

.PHONY: down
down:
	docker-compose down

.PHONY: reset
reset:
	docker volume rm $$(docker volume ls -q) && docker rmi $$(docker images -q) 

.PHONY: dev
dev:
	npm run dev

.PHONY: init
init: 
	up install dev