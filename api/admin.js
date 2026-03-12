export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'andycafe2026';

  const { action, password, valeur } = req.query;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const headers = { Authorization: `Bearer ${REDIS_TOKEN}` };

  try {
    if (action === 'get') {
      const r = await fetch(`${REDIS_URL}/get/sacs_vendus`, { headers });
      const data = await r.json();
      return res.status(200).json({ sacs_vendus: parseInt(data.result) || 0 });
    }
    if (action === 'increment') {
      const r = await fetch(`${REDIS_URL}/incr/sacs_vendus`, { method: 'POST', headers });
      const data = await r.json();
      return res.status(200).json({ sacs_vendus: parseInt(data.result) || 0 });
    }
    if (action === 'decrement') {
      const r = await fetch(`${REDIS_URL}/decr/sacs_vendus`, { method: 'POST', headers });
      const data = await r.json();
      return res.status(200).json({ sacs_vendus: Math.max(0, parseInt(data.result) || 0) });
    }
    if (action === 'set' && valeur !== undefined) {
      await fetch(`${REDIS_URL}/set/sacs_vendus/${valeur}`, { method: 'POST', headers });
      return res.status(200).json({ sacs_vendus: parseInt(valeur) });
    }
    return res.status(400).json({ error: 'Action invalide' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
