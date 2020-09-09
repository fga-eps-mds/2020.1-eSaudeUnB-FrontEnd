# 2020.1-eSaudeUnB-FrontEnd

## Code Climate - Capacidade de Manutenção

[![Maintainability](https://api.codeclimate.com/v1/badges/79f47abb5752e522f98b/maintainability)](https://codeclimate.com/github/fga-eps-mds/2020.1-eSaudeUnB-FrontEnd/maintainability)

## Code Climate - Cobertura de Teste

[![Test Coverage](https://api.codeclimate.com/v1/badges/79f47abb5752e522f98b/test_coverage)](https://codeclimate.com/github/fga-eps-mds/2020.1-eSaudeUnB-FrontEnd/test_coverage)


## Dependências

Baixe na sua máquina as seguintes dependências:

* docker
* docker-compose

## Ambiente

* O FrontEnd será executado na porta 3000, usando o docker-compose

## Comandos importantes a serem executados

* Compile o docker-compose se você mudou algum serviço do Dockerfile ou o conteúdo que está no diretório rodando o comando ```sudo docker-compose build``` para recompila-lo.

* Para iniciar os contêineres de um serviço já compilado anteriormente, use: ```sudo docker-compose up```

* Para compilar e executar os contêineres em seguida a use flag ```--build:``` junto ao compose up, resultando no seguinte comando ```sudo docker-compose up --build```

* Para parar e remover os containers do docker-compose e serviços envolvidos pela build (contêineres, networks, volumes e imagens), use o comando: ```sudo docker-compose down```

* Caso vc queira parar a execução dos containers sem remove-los. Use o comando: ```sudo docker-compose stop```

* Remova os serviços dos contêineres com o comando: ```sudo docker-compose rm```

## References

* https://docs.docker.com/compose/
