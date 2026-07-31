import { readFileSync } from 'fs';
import { join } from 'path';

const BOT_UAS = [
  'facebookexternalhit', 'facebot', 'bingbot', 'googlebot',
  'twitterbot', 'linkedinbot', 'whatsapp', 'python-requests',
  'curl/', 'go-http-client', 'petalbot', 'applebot'
];

const META_IPS = [
  '69.63.', '69.171.', '66.220.', '66.249.',
  '31.13.', '173.252.', '204.15.', '157.240.'
];

export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();

  const isBot = BOT_UAS.some(b => ua.includes(b)) || META_IPS.some(p => ip.startsWith(p));

  if (isBot) {
    return res.redirect(302, 'https://grupojogadorcaro.com.br/quem-e-jota/');
  }

  const html = readFileSync(join(process.cwd(), 'lp.html'), 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}