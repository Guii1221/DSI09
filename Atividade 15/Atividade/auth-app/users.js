const users = [];

module.exports = {
  users,
  findUserByEmail: (email) => users.find(u => u.email === email),
  findUserById: (id) => users.find(u => u.id === id),
  addUser: (user) => users.push(user)
};
