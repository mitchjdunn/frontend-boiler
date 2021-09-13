WPK = ./node_modules/.bin/webpack

dev:
	${WPK} --mode=development
	docker build -t frontend .
	docker run -d --name=frontend -p 8080:80 frontend:latest

stop:
	docker stop frontend

clean:
	docker stop frontend
	docker rm frontend
	rm -rf build

dev-live:
	${WPK} --mode=development -w

prod:
	${WPK} --mode=production

deps:
	npm install
