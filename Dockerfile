# Etapa de construcción
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/esencia-pay /usr/share/nginx/html

# Copia una configuración personalizada de nginx para optimizar la entrega
COPY nginx.conf /ngietc/nx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
