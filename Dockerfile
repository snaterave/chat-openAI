# FROM node:18.16.1

# WORKDIR /app
# RUN npm i -g @nestjs/cli@10.3.2
# COPY package.json ./
# RUN npm install --frozen-lockfile
# COPY . .
# RUN npm run build


# Eliminar archivos innecesarios
# RUN rm -rf ./node_modules

# Agrega solo las dependencias de prod
# RUN npm install --prod
# comando run de la imagen
# CMD [ "node","dist/main.js"]

# # Stage 1
FROM node:18.16.1 as deps
WORKDIR /app
RUN npm i -g @nestjs/cli@10.3.2
COPY package.json ./
RUN npm install --frozen-lockfile

# # Stage 2 - parte de deps
FROM node:18.16.1 as builder
WORKDIR /app
RUN npm i -g @nestjs/cli@10.3.2
# copio de deps el nodemodule
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# # Stage 3 - instala las dependencias para prod
FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
RUN npm i -g @nestjs/cli@10.3.2
COPY package.json package.json
RUN npm install --prod

# # Stage 4 - parte de prod-deps
FROM node:19-alpine3.15 as prod
EXPOSE 3001
WORKDIR /app
RUN npm i -g @nestjs/cli@10.3.2
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# # # comando run de la imagen
CMD [ "node","dist/main.js"]

