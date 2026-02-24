.PHONY: dev-up dev-build dev-down dev-down-volumes dev-migrate dev-sh dev-db up build down down-volumes

PROD = compose.prod.yml
DEV  = compose.dev.yml

dev-up:
	@docker compose -f $(DEV) up -d

dev-build:
	@docker compose -f $(DEV) up --build -d

dev-down:
	@docker compose -f $(DEV) down

dev-down-volumes:
	@docker compose -f $(DEV) down -v

dev-migrate:
	@docker compose -f $(DEV) exec -it workspace php artisan migrate

dev-sh:
	@docker compose -f $(DEV) exec -it workspace bash

dev-db:
	@docker compose -f $(DEV) exec -it mysql mysql -u root -proot_usr_pwd -D articles_db

dev-react-sh:
	@docker compose -f $(DEV) exec -it react sh

up:
	@docker compose -f $(PROD) up -d

build:
	@docker compose -f $(PROD) up --build -d

down:
	@docker compose -f $(PROD) down

down-volumes:
	@docker compose -f $(PROD) down -v