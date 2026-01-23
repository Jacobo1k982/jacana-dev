# Imagen base de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Compilar la app en modo producción
RUN npm run build

# Exponer el puerto interno de Next.js
EXPOSE 3000

# Comando de inicio en producción
CMD ["npm", "start"]
