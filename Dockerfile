# Imagen base
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar la carpeta prisma
COPY prisma ./prisma/

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar el resto del proyecto
COPY . .

# Variables de entorno (se sobrescriben en docker-compose o al ejecutar)
ENV DATABASE_URL="file:./db/custom.db"
ENV NEXTAUTH_URL="http://localhost:3000"
ENV NEXTAUTH_SECRET="cambiar-en-produccion"

# Compilar la app
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Iniciar
CMD ["npm", "start"]