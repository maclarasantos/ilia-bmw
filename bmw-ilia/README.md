# Teste técnico Maria Clara

## Configuração do Projeto

### Pré-requisitos

- Certifique-se de ter o Maven instalado. Você pode baixar a versão mais recente do Maven em [maven.apache.org](https://maven.apache.org/).
- Certifique-se de ter o Java JDK 22. Você pode baixar a versão mais recente do JDK em [oracle.com](https://www.oracle.com/java/technologies/javase-downloads.html).

### Executando a Aplicação

## Instalação das Dependências

Primeiro, você precisa instalar todas as dependências do projeto. Para isso, execute o seguinte comando no terminal dentro do diretório raiz do projeto Backend:

```shell
./mvnw install
```

Abra o Docker para o Quarkus conseguir criar um banco de dados, durante a inicialização do projeto, os produtos serão inseridos de forma automática no banco para popular a página.
Após a instalação das dependências, você pode subir a aplicação. Isso iniciará o servidor de desenvolvimento e junto com a inicialização do [Frontend](../bmw-ilia-front/README.md) você poderá visualizar o projeto no navegador. Execute o seguinte comando:

```shell
./mvnw compile quarkus:dev
```

A aplicação estará disponível no endereço: http://localhost:8080/.

### Executando os testes unitários:

```shell
./mvnw test
```
