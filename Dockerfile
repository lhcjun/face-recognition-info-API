# For building Docker Image

FROM node:13.7.0

WORKDIR /usr/src/face-recognition

# copy everything in root dir(backend) into container dir(face-recognition)
COPY ./ ./      

RUN npm install

# get into container bash shell
CMD ["/bin/bash"]