WPK = ./node_modules/.bin/webpack

docker:
	docker stop frontend
	docker rm frontend
	rm -rf ./build
	${WPK} --mode=development
	docker build -t frontend .
	docker run -d --name=frontend -p 8080:80 frontend:latest

stop:
	docker stop frontend

clean:
	rm -rf build

dev-live:
	${WPK} --mode=development -w

dev:
	${WPK} --mode=development

prod:
	${WPK} --mode=production

deps:
	npm install
