import express from "express";

const usuarios = [
  {
    id: 1,
    nome: "Daphne",
    email: "daphne@teste.com",
  },
  {
    id: 2,
    nome: "José",
    email: "jose@teste.com",
  },
  {
    id: 3,
    nome: "José",
    email: "jose@empresa.com",
  },
];

const app = express();
app.use(express.json());

// GET http://localhost:3000/teste
app.get("/teste", (req, res) => {
  res.send({
    ok: true,
    mensagem: "Requisicao processada com sucesso",
  });
});

// Parâmetros:
// QUERY => filtragem em rotas GET
// ROUTE => buscar um elemento específico (id, ou cpf, ou username)
// BODY  => json

// GET http://localhost:3000/users?nome=José

// GET http://localhost:3000/users
app.get("/users", (req, res) => {
  console.log(req.query.nome);

  let usuariosFiltrados = usuarios;

  if (req.query.nome) {
    usuariosFiltrados = usuarios.filter((usuario) => {
      return usuario.nome === req.query.nome;
    });
  }

  res.send(usuariosFiltrados);
});

// GET http://localhost:3000/users/1235
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);

  const user = usuarios.find((usuario) => {
    return usuario.id == req.params.id;
  });

  if (!user) {
    return res.status(404).send({
      ok: false,
      mensagem: "usuario nao encontrado",
    });
  }

  return res.send({
    ok: true,
    mensagem: "usuario obtido com sucesso",
    dados: user,
  });
});

// 200 - ok
// 201 - ok e criei alguma coisa

// 400 - erro de requisicao
// 404 - nao encontrado

// 500 - erro de servidor

// POST http://localhost:3000/users
app.post("/users", (req, res) => {
  const user = {
    nome: req.body.nome,
    email: req.body.email,
    id: req.body.id,
  };

  usuarios.push(user);

  res.status(201).send({
    ok: true,
    mensagem: "usuario adicionado com sucesso",
    dados: user,
  });
});

app.listen(3000, () => {
  console.log("API está rodando");
});
