#!/bin/bash

# Aguardar até que o banco de dados esteja disponível
until nc -z -v -w30 postgres 5432
do
  echo "Aguardando o banco de dados se tornar disponível..."
  sleep 5
done

echo "Banco de dados disponível!"

# Rodar as migrações
npx prisma migrate deploy

# Iniciar a aplicação
npm start
