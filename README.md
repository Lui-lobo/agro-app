# Agro App 🍃

O **Agro App** foi criado para facilitar o gerenciamento de produtores rurais e suas propriedades envolvidas. A solução permite um controle eficiente das fazendas, garantindo um registro detalhado de cada produtor e suas respectivas propriedades agrícolas.

---

## 📋 Índice

- [🔧 Recursos](#recursos)
- [👷 Arquitetura e Diagramas](#arquitetura-e-diagramas)
- [🖥️ Como rodar o projeto](#como-rodar-o-projeto)
- [🧪 Como rodar os testes](#como-rodar-os-testes)
- [📄 Documentacação da Api](#documentacao)
- [🧭 Endpoints](#endpoints)
- [📈 Dashboard](#dashboard)

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

## 👷 Arquitetura e Diagramas
Abaixo estão os diagramas ilustrando o fluxo da aplicação e sua arquitetura.

Estrutura do banco de dados <br>
O diagrama abaixo apresenta um modelo relacional da estrutura do banco de dados gerados via migrations.

![Estrutura do banco](docs/diagramaAgroApp.png)

Fluxograma da aplicação <br>
O diagrama abaixo apresenta um fluxo de utilidade da Api REST da aplicação.

![Fluxograma da aplicacao](docs/fluxoDaAplicacao.svg)

Fluxograma do Dashboard <br>
O diagrama abaixo apresenta o fluxo de utilização do dashboard no qual consome a Api REST

![Fluxograma do dashboard](docs/fluxoGramaDashboard.png)
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

4. Executando o docker
```sh
docker compose up -d
```

5. Caso todos os passos acima tenham sido executados corretamente, o servidor estará sendo executado localmente em: ```http://localhost:3000```

### Como rodar o projeto localmente ⌨
Nota: Para rodar o projeto localmente é necessário que todas as depedências do projeto sejam instaladas, sendo elas:
- O banco de dados postgres (Versões 15 para cima)
- O NodeJs (Versões 18 para cima)

1️. Clone o repositório:
```sh
git clone https://github.com/Lui-lobo/agro-app.git
cd agro-app
```

2. Instalação dos pacotes necessários (é necessário utilizar o legacy-peer-deps devido um conflito entre as versões do swagger e o nestJs, não há impacto na aplicação.)
```sh
npm install --legacy-peer-deps ou npm install --force
```

3. Configurar as suas variaveis de ambiente para o uso local
Crie um arquivo .env na raiz do projeto (dentro da pasta agro-app) e configure as informações do banco de dados como o exemplo abaixo:
```sh
DATABASE_URL="postgresql://postgres:1234@localhost:5432/agroDatabase?schema=public"
ENCRYPTION_KEY=meusegredo32byteslong1234567890
```
Nota: A chave de criptografia está no .env devido ser uma aplicação local. (Está pratica nunca deve acontecer em servidores que sejam distribuidos para clientes, funcionarios ou empresas no geral.)

4. Execute as migrações para gerar as tabelas no banco de dados
```sh
npx prisma migrate dev
```
Nota: Para o prisma poder gerar as migrações é necessário que o banco esteja localmente criado. Caso ele não exista por favor crie o banco ```agroDatabase``` localmente em seu postgres para rodar as migrações :)

5. Inicie o servidor de desenvolvimento com o seguinte comando:
```sh
npm run start:dev
```

6. Caso todos os passos acima tenham sido executados corretamente, o servidor estará sendo executado localmente em: ```http://localhost:3000```

---


## 🧪 Como rodar os testes
Para executar os testes unitários, apenas é necessário rodar o seguinte comando em seu terminal:

```sh
npm run test
```

Para executar os testes de integração: <br>
Nota: Os testes de integração utilizam um banco de dados exclusivo, criado especificamente para essa finalidade. Isso garante que os testes não afetem os dados da aplicação principal nem sejam impactados por eles.
1. Deve-se criar um novo banco no postgres com o nome:
```integrationTestDatabase```
2. Deve-se rodar as migrations para esse novo banco de integração com o comando
```sh
npx prisma migrate dev
```
Nota: o env.test está nos arquivos da aplicação, renomeio para apenas .env, rode o comando, e após isso renomeio novamente para env.test :)

Caso o banco de testes de integração tenha sido corretamente criado, rodar o comando: <br>
```sh
npm run test:e2e
```

---

## 📄 Documentacação da Api
A documentação da API do Agro App é gerada automaticamente com Swagger, permitindo que os usuários explorem e testem os endpoints de forma interativa.

📌 Como acessar a documentação?
Ao rodar a aplicação basta acessar a url:
```sh
http://localhost:3000/api#/
```
Nestá rota você encontrará a documentação de todas as apis do projeto!

---

## 🧭 Endpoints
### Produtor
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST**  | `/producers/create`            | Cria um novo produtor nos registros     |
| **PUT**  | `/producers/update`            | Atualiza um produtor nos registros     |
| **DELETE**  | `/producers/delete/?producerId=${producerId}`            | Deleta um produtor nos registros     |

### Fazenda
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST** | `/farm/add`            | Adiciona uma fazenda para um produtor    |
| **GET**  | `/farm/farmsByState`   | Busca as fazendas do sistema e as retorna por estado e quantidade    |
| **GET**  | `/farm/landUsage`      | Busca o total de uso de terras no sistema    |
| **GET**  | `/farm/farms`          | Busca a quantidade total de fazendas registradas no sistema   |
| **GET**  | `/farm/hectares`       | Busca a quantidade total de hectares registrados no sistema   |

### Safra
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST** | `/harvest/add`         | Adiciona uma safra para uma fazenda |

### Cultura
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST** | `/crop/add`            | Adiciona uma cultura para uma safra |
| **GET** | `/crop/cropsDistribution` | Busca a distribuição de culturas nos registros do sistema |

### Dashboard
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **GET** | `/dashboard` | Retorna a distribuição de culturas, quantidade total de fazendas, quantidade total de hectares, uso total de terras no sistema e a distribuição de fazendas por estado |

---

## 📈 Dashboard
O projeto conta com um pequeno front-end em react no qual contem o dashboard da aplicação, para acessa-lo rode os seguintes passos:

1. Clonar o repositorio com o dashboard
```sh
git clone https://github.com/Lui-lobo/dashboard-agroapp.git
cd dashboard-agroapp
```

2. Instalar as dependencias do projeto:
```sh
npm install
```

3. Rodar o projeto:
```sh
npm run dev
```

4. Caso todos os passos tenham sido executados corretamente, o dashboard estará disponivel em: ```http://localhost:5173/```

Imagem do dashboard funcional:
![dashboardFuncional](docs/image.png)

