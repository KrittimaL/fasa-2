# Use the official MongoDB image as the base image
FROM mongo

# Optionally, set environment variables for MongoDB configuration
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password 

# Set the working directory
WORKDIR /usr/src/app

# Copy the initialization script to the container
COPY init.js /docker-entrypoint-initdb.d/

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB when the container starts
CMD ["mongod"]




