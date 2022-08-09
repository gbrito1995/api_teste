# API TESTE

API desenvolvida para avaliação

# Instalação

Para instalar os módulos usados executar o comando:

```bash
npm install
```

# Uso

O comando de inicilização da aplicação é: 

```bash
npm run dev
```

# Rotas GET

Buscar todos os hotéis:

```bash
localhost:4444/hotels
```

Buscar hotéis por faixa de preço:

```bash
localhost:4444/hotels?price=100
```
# Rotas POST

Inserir hotéis:

```bash
localhost:4444/hotels
```
corpo:

```bash
{
	"name" : "Grand Hotel", 
	"description" : "O menor hotel do mundo", 
	"lat" : "23.00000", 
	"lng" : "45.11000", 
	"price" : "954", 
	"status" : "active"
}
```

# Rotas PUT

Alterar hotéis:

```bash
localhost:4444/hotels/13
```
corpo:

```bash
{
	"name" : "Grand Hotel", 
	"description" : "O menor hotel do mundo", 
	"lat" : "23.00000", 
	"lng" : "45.11000", 
	"price" : "954", 
	"status" : "active"
}
```



