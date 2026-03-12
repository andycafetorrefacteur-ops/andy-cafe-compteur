export default async function handler(req, res) {
  // Route de test — initialiser le compteur à 0
   const REDIS_URL = process.env.REDIS_URL;
  const REDIS_TOKEN = process.env.REDIS_TOKEN;

  await fetch(`${REDIS_URL}/set/sacs_vendus/0`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
  });

  res.status(200).json({ ok: true, message: 'Compteur remis à 0' });
}
