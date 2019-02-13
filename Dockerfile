# base image
FROM node:9.6.1

# set working directory
WORKDIR .

# start app
CMD ["npm", "start"]