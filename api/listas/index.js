import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('./data.json');

export default function handler(req, res) {
  const method = req.method;

  if (method === 'GET') {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.status(200).json(data);
  } else if (method === 'POST') {
    const body = req.body;

    if (!body.name) {
      res.status(400).json({ error: 'O campo "name" é obrigatório.' });
      return;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const newList = {
      id: Date.now().toString(),
      name: body.name,
      shoppingList: [],
      itensComprados: []
    };
    data.push(newList);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(newList);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
