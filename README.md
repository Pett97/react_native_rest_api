# Como Rodar o Projeto

## Passo 1: Clonar o Repositório

Primeiro, clone o repositório do projeto utilizando o seguinte comando:

```bash
https://github.com/Pett97/react_native_rest_api.git
```
##instalar dependencias do projeto 
cd <PASTA_DO_PROJETO>
yarn install

## configurar o pocketbase 
cd pocketbase
./pocketbase serve --http=<SEU_IP_LOCAL>:8090

## configurar URL do projeto 
dentro do projeto temos que atualizar a constante BASE_URL para o seu IP LOCAL 
src/constants/baseUri.ts

const BASE_URL = "http://192.168.0.104:8090/"; 

subistuir para const BASE_URL = "http://<seu_ip_local>:8090/";

Caso o firewall esteja ativo no seu computador, você precisará liberar a porta 8090 para permitir a comunicação na rede local. Para isso, utilize o comando abaixo:
No Ubuntu
sudo ufw allow 8090

### acessar pocketbase
http://<seu_ip_local>:8090/_/

## rodar o projeto 
yarn start
