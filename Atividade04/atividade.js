function buscarDadosDoServidor() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, dados: "OK" });
      }, 2000);
    });
  }
  
  async function testarBuscarDados() {
    const dados = await buscarDadosDoServidor();
    console.log(dados);  // { status: 200, dados: "OK" }
  }
  
  testarBuscarDados();

  function validarIdade(idade) {
    return new Promise((resolve, reject) => {
      if (idade >= 18) {
        resolve("Acesso permitido");
      } else {
        reject("Acesso negado");
      }
    });
  }
  
  async function testarValidarIdade() {
    try {
      console.log(await validarIdade(20)); // Acesso permitido
      console.log(await validarIdade(16)); // Acesso negado
    } catch (error) {
      console.log(error);
    }
  }
  
  testarValidarIdade();

  function baixarImagem() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Imagem baixada");
      }, 2000);
    });
  }
  
  function baixarVideo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Vídeo baixado");
      }, 3000);
    });
  }
  
  async function baixarMidias() {
    const [imagem, video] = await Promise.all([baixarImagem(), baixarVideo()]);
    console.log(imagem); // Imagem baixada
    console.log(video);  // Vídeo baixado
  }
  
  baixarMidias();

  
  function fazerLogin(usuario, senha) {
    return new Promise((resolve, reject) => {
      if (usuario === 'admin' && senha === '1234') {
        resolve("Login bem-sucedido");
      } else {
        reject("Credenciais inválidas");
      }
    });
  }
  
  async function testarLogin() {
    try {
      console.log(await fazerLogin('admin', '1234')); // Login bem-sucedido
      console.log(await fazerLogin('user', '1234')); // Credenciais inválidas
    } catch (error) {
      console.log(error);
    }
  }
  
  testarLogin();

  function getUsuario() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 5, nome: 'João' });
      }, 1000);
    });
  }
  
  function getPedidos(idUsuario) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["Pedido 1", "Pedido 2", "Pedido 3"]);
      }, 1500);
    });
  }
  
  async function mostrarPedidos() {
    const usuario = await getUsuario();
    const pedidos = await getPedidos(usuario.id);
    console.log(`Usuário: ${usuario.nome}`);
    console.log(`Pedidos: ${pedidos.join(", ")}`);
  }
  
  mostrarPedidos();

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function contarAte(numero) {
    for (let i = 1; i <= numero; i++) {
      console.log(i);
      await delay(1000); // Espera 1 segundo
    }
  }
  
  contarAte(5);

  function buscarComTimeout() {
    const busca = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Dados encontrados");
      }, 2000);
    });
  
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject("Tempo esgotado");
      }, 1000);
    });
  
    return Promise.race([busca, timeout]);
  }
  
  async function testarBuscarComTimeout() {
    try {
      console.log(await buscarComTimeout());
    } catch (error) {
      console.log(error);  // Tempo esgotado
    }
  }
  
  testarBuscarComTimeout();
  