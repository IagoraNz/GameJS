# 📄 JavaScript em execução: snake game
Este script JavaScript é um jogo de snake implementado em um elemento <canvas>, onde o usuário controla uma cobra para comer alimentos e ganhar pontos. O jogo inclui funcionalidades como pontuação, recorde máximo, tela de menu e efeitos sonoros, enquanto desafia o jogador a evitar colisões com as paredes do canvas e com seu próprio corpo.

## :link: Ambiente de desenvolvimento
1. JavaScript
```
v18.18.0
```
2. Visual Stduo Code
```
1.89.1
```

## :link: Objetivo e descrição
O script JavaScript apresenta a estrutura e funcionalidades de um jogo da cobrinha (snake) implementado em um elemento <canvas>, proporcionando uma experiência interativa ao usuário. Inicia-se com a configuração do canvas e do contexto 2D para desenho gráfico, além da seleção de elementos HTML relevantes, como a pontuação, a pontuação máxima, a pontuação final, a tela de menu e o botão de jogar. Também são incluídos efeitos sonoros por meio de um novo elemento de áudio.

O jogo é configurado com parâmetros como o tamanho do quadrado e a posição inicial da cobra, representada por um array que armazena as coordenadas X e Y. O aumento da pontuação é gerenciado pela função incrementScore(), enquanto a função updateHighScore() atualiza o recorde máximo alcançado. A função gameOver() é acionada quando ocorre uma colisão, atualizando o recorde e exibindo a tela de menu.

O script utiliza funções auxiliares para gerar números aleatórios para a posição e cor dos alimentos, bem como para verificar colisões e movimentar a cobra. Um grid é desenhado no canvas para melhorar a visualização do jogo. O loop principal (gameLoop()) controla as atualizações de cena e movimentos da cobra, enquanto os eventos de teclado permitem ao jogador controlar a direção da cobra.

Ao clicar no botão de jogar, o jogo é reiniciado, zerando a pontuação e ocultando a tela de menu. Esses elementos combinados criam uma experiência de jogo envolvente e interativa dentro do navegador.
