const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Bem-vindo ao meu servidor!')
    } else if (req.url === '/contato') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Página de Contato')
    } else if (req.url === '/servicos') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Nossos serviços estão em construção.');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Página não encontrada.')
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000/');
});