export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { fbp, fbc, userAgent, eventId } = req.body;
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const payload = {
    data: [{
      event_name: 'Search',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      user_data: { client_ip_address: ip, client_user_agent: userAgent, fbp: fbp||undefined, fbc: fbc||undefined }
    }]
  };
  try {
    const r = await fetch(
      `https://graph.facebook.com/v21.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    return res.status(200).json(await r.json());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
