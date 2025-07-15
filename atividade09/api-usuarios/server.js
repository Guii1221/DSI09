const express = require('express');
const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Nosso "banco de dados" em memória para armazenar os usuários
let users = [
    { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com' },
    { id: 2, name: 'Bruno Costa', email: 'bruno.costa@example.com' },
    { id: 3, name: 'Carla Dias', email: 'carla.dias@example.com' },
    { id: 4, name: 'Daniel Souza', email: 'daniel.souza@example.com' },
    { id: 5, name: 'Ana Clara', email: 'ana.clara@example.com' }
];

/**
 * Função de validação de e-mail simples.
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} - Retorna true se o e-mail for válido, false caso contrário.
 */
const isValidEmail = (email) => {
    if (typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// --- ROTAS E FUNÇÕES CONTROLADORAS ---

/**
 * @route GET /users
 * @description Retorna todos os usuários ou filtra por nome.
 * @queryparam {string} [name] - Nome para filtrar a lista de usuários.
 */
app.get('/users', (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filteredUsers);
    }

    res.json(users);
});

/**
 * @route GET /users/:id
 * @description Retorna um usuário específico pelo seu ID.
 * @param {number} id - O ID do usuário.
 */
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
    }
});

/**
 * @route POST /users
 * @description Cria um novo usuário.
 * @bodyparam {number} id - ID do novo usuário (obrigatório, numérico).
 * @bodyparam {string} name - Nome do novo usuário (obrigatório, min 3 letras).
 * @bodyparam {string} email - Email do novo usuário (obrigatório, formato válido).
 */
app.post('/users', (req, res) => {
    const { id, name, email } = req.body;

    // Validações obrigatórias
    if (typeof id !== 'number') {
        return res.status(400).json({ message: 'O campo "id" é obrigatório e deve ser um número.' });
    }
    if (typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório e deve ter no mínimo 3 caracteres.' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório e deve ser um e-mail válido.' });
    }

    const newUser = { id, name, email };
    users.push(newUser);

    res.status(201).json(newUser);
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor da API de usuários rodando em http://localhost:${port}`);
});