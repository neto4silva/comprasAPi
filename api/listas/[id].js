import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('./data.json');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight requests
  }

  const { id } = req.query;
  const method = req.method;
  let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  if (method === 'GET') {
    const list = data.find(l => l.id === id);
    if (list) res.status(200).json(list);
    else res.status(404).json({ error: 'Lista não encontrada' });
  } else if (method === 'PUT') {
    const index = data.findIndex(l => l.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.status(200).json(data[index]);
    } else {
      res.status(404).json({ error: 'Lista não encontrada' });
    }
  } else if (method === 'DELETE') {
    const index = data.findIndex(l => l.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Lista não encontrada' });
    }
  } else if (method === 'POST') {
    const index = data.findIndex(l => l.id === id);
    if (index !== -1) {
      const newItem = req.body;
      data[index].shoppingList.push(newItem);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.status(201).json(newItem);
    } else {
      res.status(404).json({ error: 'Lista não encontrada' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
