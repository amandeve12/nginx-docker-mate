1. first build image on local using Dockerfile with cmd: docker build -t nginx-mate .
2. run docker-compose up --build--> this is an andanced command make a containers using the perticular image and run them that are avialble in docker-compose.yaml file
This run 3 containers from your image that you decide to make container using docker-compose.yaml(for more info read docker-compose-yaml file)


1. running the application with nginx 



Nginx file code to run multiple containers is 

worker_processes 1;
# This means Nginx will use 1 process to handle all the requests.
# It's enough for small/local projects.

events {
    worker_connections 1024;
    # This process can handle up to 1024 users (connections) at the same time.
}

http {
    include mime.types;
    # Tells Nginx how to understand different file types like HTML, CSS, JS, etc.

    default_type application/octet-stream;
    # If file type is unknown, this will be used as the default.

    upstream nodejs_cluster {
        # This is a group of your Node.js apps (running in Docker) that Nginx will forward requests to.

        server 127.0.0.1:6000;
        # Your first app is running on port 6000.

        server 127.0.0.1:6001;
        # Your second app is running on port 6001.

        server 127.0.0.1:6002;
        # Your third app is running on port 6002.

        server 127.0.0.1:6003;
        # (Optional) Fourth app, if you're using one.
    }

    server {
        listen 8080;
        # Nginx will listen on port 8080. You can open http://localhost:8080 in your browser.

        server_name localhost;
        # The name of your server. Since you’re working locally, it’s just “localhost”.

        location / {
            proxy_pass http://nodejs_cluster;
            # Nginx will forward incoming requests to one of the apps above (load balancing).

            proxy_set_header Host $host;
            # It tells your Node.js app what the original domain name was (e.g. localhost).

            proxy_set_header X-Real-IP $remote_addr;
            # It tells your Node.js app the real IP address of the user.
        }
    }
}
