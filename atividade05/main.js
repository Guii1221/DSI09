

import { quizGenerator } from './quizModule.js';


async function iniciarQuiz() {
  const generator = quizGenerator();

  
  for (let pergunta of generator) {
    console.log(pergunta.pergunta);
    pergunta.alternativas.forEach((alternativa, index) => {
      console.log(`${index + 1}. ${alternativa}`);
    });

    
    const respostaUsuario = prompt("Escolha o número da sua resposta:");

    if (pergunta.alternativas[respostaUsuario - 1] === pergunta.respostaCorreta) {
      console.log("Resposta correta!\n");
    } else {
      console.log(`Resposta incorreta. A resposta correta é ${pergunta.respostaCorreta}.\n`);
    }
  }

  console.log("Quiz finalizado!");
}


iniciarQuiz();
