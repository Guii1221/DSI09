export function* quizGenerator() {
  const perguntas = [
    {
      pergunta: "Qual é a capital da França?",
      alternativas: ["Paris", "Londres", "Roma", "Berlim"],
      respostaCorreta: "Paris"
    },
    {
      pergunta: "Qual é o maior planeta do nosso sistema solar?",
      alternativas: ["Terra", "Júpiter", "Saturno", "Marte"],
      respostaCorreta: "Júpiter"
    },
    {
      pergunta: "Quem escreveu 'Dom Quixote'?",
      alternativas: ["Miguel de Cervantes", "J.K. Rowling", "Shakespeare", "Machado de Assis"],
      respostaCorreta: "Miguel de Cervantes"
    }
  ];

  for (let i = 0; i < perguntas.length; i++) {
    yield perguntas[i];
  }
}
