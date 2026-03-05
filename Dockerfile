FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN echo "=== Verificando use-auth.tsx ===" && cat /app/src/hooks/use-auth.tsx | grep -n "register"
ENV DATABASE_URL="file:./db/custom.db"
ENV NEXTAUTH_URL="http://localhost:3000"
ENV NEXTAUTH_SECRET="cambiar-en-produccion"
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
