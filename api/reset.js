export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    const response = await fetch(`${REDIS_URL}/get/sacs_vendus`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    const data = await response.json();
    const sacs = parseInt(data.result) || 0;
    res.status(200).json({ sacs_vendus: sacs });
  } catch (error) {
    res.status(200).json({ sacs_vendus: 0, error: error.message });
  }
}
