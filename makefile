docker-build:
	docker build -t fasa2
docker-create: 
	docker create --name fasa2 -p 27017:27017 fasa2
docker-start:
	docker start fasa2
docker-stop:
	docker stop fasa2