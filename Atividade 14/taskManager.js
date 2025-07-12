// taskManager.js
// Gerenciador simples de tarefas usando Events + Readline
// Requisitos: Node.js ≥ 14

const { EventEmitter } = require('events');
const readline = require('readline');

class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = {}; // { [nome]: { status, timeout } }

    // Listeners de log centralizados
    this.on('taskCreated', (name) =>
      console.log(` Tarefa criada: "${name}" (pendente)`),
    );
    this.on('taskCompleted', (name) =>
      console.log(` Tarefa concluída automaticamente: "${name}"`),
    );
    this.on('taskCancelled', (name) =>
      console.log(` Tarefa cancelada: "${name}"`),
    );
  }

  create(name) {
    if (!name) return console.log(' Informe o nome da tarefa.');
    if (this.tasks[name])
      return console.log(` Já existe uma tarefa chamada "${name}".`);

    // Registra tarefa pendente
    const timeout = setTimeout(() => this.complete(name), 3000);
    this.tasks[name] = { status: 'pendente', timeout };
    this.emit('taskCreated', name);
  }

  complete(name) {
    const task = this.tasks[name];
    if (!task || task.status !== 'pendente') return;
    task.status = 'concluída';
    clearTimeout(task.timeout);
    this.emit('taskCompleted', name);
  }

  cancel(name) {
    const task = this.tasks[name];
    if (!task) return console.log(` Tarefa "${name}" não existe.`);
    if (task.status !== 'pendente')
      return console.log(` A tarefa "${name}" já foi ${task.status}.`);

    clearTimeout(task.timeout);
    task.status = 'cancelada';
    this.emit('taskCancelled', name);
  }

  list() {
    const nomes = Object.keys(this.tasks);
    if (!nomes.length) return console.log('  Nenhuma tarefa registrada.');
    console.log('\n=== LISTA DE TAREFAS ===');
    nomes.forEach((n) => console.log(`• ${n} → ${this.tasks[n].status}`));
    console.log('========================\n');
  }
}

const manager = new TaskManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

console.log('Gerenciador de Tarefas iniciado.');
console.log(
  'Comandos: create <nome>, cancel <nome>, list, exit\nEx.: create estudar',
);
rl.prompt();

rl.on('line', (line) => {
  const [cmd, ...args] = line.trim().split(/\s+/);
  const name = args.join(' ');

  switch (cmd) {
    case 'create':
      manager.create(name);
      break;
    case 'cancel':
      manager.cancel(name);
      break;
    case 'list':
      manager.list();
      break;
    case 'exit':
      rl.close();
      return;
    default:
      console.log(' Comando desconhecido.');
  }
  rl.prompt();
}).on('close', () => {
  console.log(' Até mais!');
  process.exit(0);
});