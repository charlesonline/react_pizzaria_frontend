FROM node:24.11.1

WORKDIR /app

# Instalar dependências com npm
# Copiar apenas arquivos de dependências primeiro (melhor cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Nota: Para produção, use 'npm run build' e 'npm start'

# Copiar o restante do código
COPY . .

EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]