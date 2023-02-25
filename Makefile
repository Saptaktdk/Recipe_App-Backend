#TODO: Local development
run_init_db:
	npm run init:db

run_install:
	npm install

run_clean:
	npm run clean

run_prettier:
	npm run prettier

run_auth_local:
	npm run start:auth[local]

run_api_local:
	npm run start:api[local]

run_admin_local:
	npm run start:admin[local]

run_auth_dev:
	npm run start:auth[dev]

run_api_dev:
	npm run start:api[dev]

run_test:
	npm run test:inspect

#TODO: Testing Bash scripts
run_get_scripts:
	bash scripts/get.sh

run_post_scripts:
	bash scripts/post.sh

run_put_scripts:
	bash scripts/put.sh


#TODO: Docker development
#? For mac and windows
compose_db_up_v1:
	docker-compose -f docker-compose.db.yml up -d --build
	
compose_db_down_v1:
	docker-compose -f docker-compose.db.yml down

compose_dev_up_v1:
	docker-compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v1:
	docker-compose -f docker-compose.dev.yml down

compose_stage_up_v1:
	docker-compose -f docker-compose.staging.yml up -d --build

compose_stage_down_v1:
	docker-compose -f docker-compose.staging.yml down

compose_prod_up_v1:
	docker-compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v1:
	docker-compose -f docker-compose.prod.yml down


#? For Ubuntu or other Linux versions
compose_db_up_v2:
	docker compose -f docker-compose.db.yml up -d --build
	
compose_db_down_v2:
	docker compose -f docker-compose.db.yml down

compose_dev_up_v2:
	docker compose -f docker-compose.dev.yml up -d --build

compose_dev_down_v2:
	docker compose -f docker-compose.dev.yml down

compose_stage_up_v2:
	docker compose -f docker-compose.staging.yml up -d --build

compose_stage_down_v2:
	docker compose -f docker-compose.staging.yml down

compose_prod_up_v2:
	docker compose -f docker-compose.prod.yml up -d --build

compose_prod_down_v2:
	docker compose -f docker-compose.prod.yml down