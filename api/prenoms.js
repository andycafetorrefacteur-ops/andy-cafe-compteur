export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  const headers = { Authorization: `Bearer ${REDIS_TOKEN}` };

  try {
    if (req.method === 'GET') {
      const r = await fetch(`${REDIS_URL}/lrange/prenoms/0/99`, { headers });
      const data = await r.json();
      return res.status(200).json({ prenoms: data.result || [] });
    }
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const prenom = (body.prenom || '').trim().slice(0, 30);
      if (!prenom) return res.status(400).json({ error: 'Prénom requis' });
      await fetch(`${REDIS_URL}/lpush/prenoms/${encodeURIComponent(prenom)}`, { method: 'POST', headers });
      return res.status(200).json({ ok: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
