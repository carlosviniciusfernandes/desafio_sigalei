# desafio_sigalei
Repo do desafio técnico Sigalei

Este projeto utiliza a API GraphQL do github (https://api.github.com/graphq) para buscar informações quanto aos commits realizados no respositório do kernel do linux.

As principais informações sobre os commits são:
    - usuário
    - data
    - número de linhas adicionadas (additions)
    - numéro de linhas deletadas (deletions)

As informações são parseadas de forma a ter se um array de objetos contendo o nome do usuário, total de commits, additions, deletions de uma determinada data até o presente.

A visualização se dá através de uma tabela paginda, com funções de sort e search (material-table)

A API tem um limite de 100 resultados por requisição, foi então escolhido a data inicial default de primeiro Julho de 2020 para simplificar o desenvolvimento. Na aplicação há um
datapicker que permite alterar esta data e realizar novamente a consulta, entretanto isso aumentará drasticamente o tempo de busca (minutos!!!!!). Sendo assim este um ponto de possivel
melhoria para a ferramenta.

A API também exige autenticação com um token GitHub (https://docs.github.com/pt/github/authenticating-to-github/creating-a-personal-access-token), mas não é uma boa prática commitar seu tokken,
portanto há uma página inicial que pede a inserção do token, e redirecionar o usuário em seguida (o token fica na rota). Funciona bem na versão de desenvolvimento, mas não está funcionando na versão de produção (build)

Utilize npm (ou yarn) install para instalar as dependências e explorar a versão de desenvolvimento

Utilize o npm build para mimificar o código na versão de produção (o token na rota nao parece funcionar)