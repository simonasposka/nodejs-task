build:
	docker build -t app .

start:
	docker run -p 3000:3000 -d --name app app

stop:
	docker rm app -f

local:
	yarn install
	yarn run build
	node dist/src/app.js
