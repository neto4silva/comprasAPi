// api/listas/index.js
let listas = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(listas);
  }

  if (req.method === 'POST') {
    const novaLista = req.body;
    listas.push(novaLista);
    return res.status(201).json({ mensagem: 'Lista adicionada!', lista: novaLista });
  }

  res.status(405).json({ erro: 'Método não permitido' });
}
