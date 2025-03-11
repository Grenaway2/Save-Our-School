import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  if (req.method === 'POST') {
    const { amount, name, isAnonymous } = req.body;
    const numericAmount = parseFloat(amount || 0);

    const currentTotal = (await kv.get('pledgeTotal')) || 0;
    const newTotal = currentTotal + numericAmount;
    await kv.set('pledgeTotal', newTotal);

    const pledgeEntry = {
      name: isAnonymous ? 'Anonymous' : name || 'Anonymous',
      amount: numericAmount,
      date: new Date().toISOString(),
    };
    await kv.lpush('pledges', pledgeEntry);

    res.status(200).json({ total: newTotal });
  } else if (req.method === 'GET') {
    const total = (await kv.get('pledgeTotal')) || 0;
    const pledges = (await kv.lrange('pledges', 0, -1)) || [];
    res.status(200).json({ total, pledges });
  } else {
    res.status(405).end();
  }
}