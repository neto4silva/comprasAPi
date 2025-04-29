// api/listas/index.js
let listas = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight requests
  }

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
