file := "docker-compose.yml"
container := "e-saude-frontend"

up:
	# Create the image and container, if the image is not present it will be builded
	docker-compose -f ${file} up

build:
	# Create the image, container and force a build
	docker-compose -f ${file} up --build

logs:
	# See the logs from all containers that are running
	docker-compose -f ${file} logs -f -t

start:
	# Start containers
	docker-compose -f ${file} start

stop:
	# Stop containers
	docker-compose -f ${file} stop

ps:
	# Verify running containers
	docker-compose -f ${file} ps

show-images:
	# Show installed images
	docker images

down:
	# Shutdown containers and remove the images
	docker-compose -f ${file} down

down-force:
	# Shutdown containers and and remove the volumes
	docker-compose -f ${file} down -v

down-remove-images:
	# Shutdown containers, remove the images and remove the volumes.
	# The images will nedd to be rebuilded
	docker-compose -f ${file} down --rmi local -v

test:
	docker-compose -f ${file} run --rm e-saude-frontend npm run test

lint:
	docker-compose -f ${file} run --rm e-saude-frontend npm run lint