# Agro App 🍃

O **Agro App** foi criado para facilitar o gerenciamento de produtores rurais e suas propriedades envolvidas. A solução permite um controle eficiente das fazendas, garantindo um registro detalhado de cada produtor e suas respectivas propriedades agrícolas.

---

## 📋 Índice

- [🔧 Recursos](#recursos)
- [🖥️ Como rodar o projeto](#como-rodar-o-projeto)

---

## 🔧 Recursos

O **Agro App** disponibiliza os seguintes recursos para o gerenciamento eficiente das propriedades rurais:

### 📌 Cadastro e Gestão

- Cadastro, edição e exclusão de produtores rurais.
- Validação automática de CPF ou CNPJ antes da inclusão no sistema.
- Registro e gerenciamento de múltiplas propriedades por produtor.
- Cadastro de áreas detalhadas: área total, agricultável e de vegetação.
- Controle de culturas plantadas por safra.

### 📊 Regras de Negócio Implementadas

- Validação de CPF/CNPJ para evitar registros inválidos.
- Garantia de que a soma das áreas agricultável e de vegetação não ultrapasse a área total da fazenda.
- Associação flexível de produtores a uma ou mais propriedades.
- Permissão para múltiplas culturas por fazenda e por safra.

### 📈 Dashboard e Relatórios

- Exibição do total de fazendas cadastradas.
- Cálculo do total de hectares registrados.
- **Gráficos de pizza**:
  - Distribuição por estado das fazendas.
  - Distribuição por cultura plantada.
  - Distribuição por uso do solo (área agricultável e vegetação).

---

## 🖥️ Como rodar o projeto

### Como rodar o projeto com Docker Compose 🐋

1️. Clone o repositório:
```sh
git clone https://github.com/Lui-lobo/agro-app.git
cd agro-app
```

2. Instalação dos pacotes necessários (é necessário utilizar o legacy-peer-deps devido um conflito entre as versões do swagger e o nestJs, não há impacto na aplicação.)
```sh
npm install --legacy-peer-deps ou npm install --force
```

3. Configurar as suas variaveis de ambiente para o docker
Crie um arquivo .env na raiz do projeto (dentro da pasta agro-app) e configure as informações do banco de dados como o exemplo abaixo:
```sh
DATABASE_URL="postgresql://postgres:1234@postgres:5432/agroDatabase?schema=public"
ENCRYPTION_KEY=meusegredo32byteslong1234567890
```
Nota: A chave de criptografia está no .env devido ser uma aplicação local. (Está pratica nunca deve acontecer em servidores que sejam distribuidos para clientes, funcionarios ou empresas no geral.)

4. 
