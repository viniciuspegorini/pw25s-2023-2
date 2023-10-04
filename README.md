# Aulas da disciplina de Programação para Web - PW25S-5SI - 2023/2

## Back-end 

### Softwares
	- JDK 11 ou superior
	- IDE:
		- ItelliJ IDEA
		- Spring Tools Suite 4 (STS-4)
		- Eclipe for JavaEE ...
	- SDBG:
		- Postgresql
	- Ferramenta para testar a API:
		- Postman
		- Insomnia
	- Git
	- Docker
	
## Front-end 

### Softwares
	- IDE:
		- Visual Studio Code
		- Web Storm
		- Atom...
	- Git
	- Node.js
	- Docker

	- Moodle:
		- Disciplina PW25S_1, código de inscrição: pw25s_1
	
## Projetos:

### aula1 -  Introdução
O conteúdo do projeto é uma introdução sobre os *frameworks* **Spring, Spring Boot, Spring Web e Spring Data**.


# Avaliação da disciplina:

## Trabalho final:

Deverá ser desenvolvido uma aplicação WEB para controle financeiro pessoal.

É comum que as pessoas ignorem a rotina financeira por falta de tempo. Entretanto, é importante para saúde financeira o controle das receitas e despesas mensalmente. Assim, será solicitado o desenvolvimento de uma aplicação web para o controle financeiro pessoal. O sistema deverá permitir o cadastro de receitas e despesas classificadas em categorias (ex.: água, luz, telefone, supermercado, etc.). Toda receita ou despesa será realizada em uma Conta. Essa conta poderá ter um Banco, Agência e Número, mas também poderá ter esses valores em branco, pois o dinheiro pode estar guardado em casa. O usuário também poderá lançar despesas em um cartão de crédito. O sistema deverá apresentar em uma tela inicial as despesas que não foram pagas no mês e o saldo e também o valor total de receitas e despesas (Dashboard). Somente usuários cadastrados poderão acessar ao sistema e fazer o seu controle financeiro pessoal, de todas as suas contas e cartões. Qualquer usuário poderá se cadastrar no sistema.
Exemplo de entidades que podem ser utilizadas para o desenvolvimento da modelagem do sistema:

-   Cadastro de **Usuário** {nome, email, senha, telefone, etc.}
-   Cadastro de **Conta** {USUARIO, Numero, Agencia, Banco, Tipo (Ex.: Conta Corrente, Conta Poupança, Conta Investimento, Casa), etc.}
-   Cadastro de **Movimentação** {CONTA, Valor, Data, Categoria, Descrição, Situação (ex. Pendente, Pago/Recebido) Tipo (Receita, Despesa, transferência entre contas)}.
-   Entre outras funcionalidades...


**A composição da nota se dará pela relação entre as Funcionalidades esperadas (8,00) e Funcionalidades Extras (2,00), listadas abaixo:**

#### Funcionalidades esperadas:
##### 1) Cadastro de um novo usuário
- O usuário poderá cadastrar-se no sistema para poder utilizá-lo.

##### 2) Gerenciamento das contas de um usuário
- Deverá ser possível cadastrar contas, editá-las e removê-las.
- As contas cadastradas devem estar associadas à um usuário, ou seja, cada usuário autenticado no sistema poderá visualizar apenas as próprias contas.

##### 3) Gerenciamento das movimentações financeiras:
 - Cada movimentação financeira deverá estar associada à uma conta e uma categoria.
 - Deverá ser possível cadastrar Receitas (valores recebidos).
 - Deverá ser possível cadastrar Despesas (valores pagos).
 - Deverá ser possível cadastrar Transferências entre duas contas do próprio usuário.
 
##### 4) Categorias das movimentações:		
 - As categorias poderão ser um outro CRUD associado ao usuário, poderão ser um CRUD fixo no sistema ou um ENUM. O desenvolvedor pode escolher como será implementado.

#### Funcionalidades extras:
 - As funcionalidades listadas anteriormente, caso desenvolvidas corretamente, **garantem a nota 8,00**, desde que desenvolvidas corretamente utilizando os conceitos básicos de *REST* utilizando o básico do *Spring Framework* e do *React.js*. 
 - Para **atingir a nota 10,00** deverá ser utilizado uma biblioteca de componentes ou criado seus próprios componentes *React* na aplicação *front-end*.
 - Na página de entrada do usuário criar:
	 -  Um CARD para listar o saldo de cada conta do usuário e o saldo final. 
	 - Um CARD para listar as últimas 5 despesas do usuário.
	 - Um CARD para listar as últimas 5 receitas do usuário.

### Datas de Entrega do trabalho:
#### 10/10/2023	- Entrega do *back-end*.
#### 12/12/2023 - Entrega da aplicação completa (*front-end* + possíveis ajustes no *back-end*).


