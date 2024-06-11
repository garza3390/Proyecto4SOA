# Usar una imagen base oficial de Node.js
FROM node:14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que la aplicación usará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]

