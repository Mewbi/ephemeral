.PHONY: up down dev logs

up: ## Start all services in detached mode
	docker compose up -d --build
	@echo "---"
	@echo "Services running on:"
	@docker compose ps --format "table {{.Name}}\t{{.Ports}}" | tail -n +2

down: ## Stop all services
	docker compose down

dev: ## Start all services with live logs
	docker compose up --build

logs: ## Tail logs from all services
	docker compose logs -f
