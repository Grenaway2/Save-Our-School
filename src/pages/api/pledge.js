import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  if (req.method === 'POST') {
    const { amount, name, isAnonymous, email } = req.body;
    const numericAmount = parseFloat(amount || 0);

    // Skip if amount is zero or negative
    if (numericAmount <= 0) {
      return res.status(400).json({ error: 'Pledge amount must be greater than $0' });
    }

    // Generate a unique key for this submission (e.g., email + timestamp)
    const submissionKey = `submission:${email}:${Date.now()}`;
    const recentSubmissions = await kv.get(`submissions:${email}`) || [];

    // Check for duplicate within the last 5 seconds
    const isDuplicate = recentSubmissions.some(sub => Date.now() - sub.timestamp < 5000);
    if (isDuplicate) {
      return res.status(429).json({ error: 'Duplicate submission detected. Please wait before trying again.' });
    }

    // Add current submission to recent submissions list
    recentSubmissions.push({ timestamp: Date.now() });
    if (recentSubmissions.length > 5) recentSubmissions.shift(); // Keep last 5 submissions
    await kv.set(`submissions:${email}`, recentSubmissions, { ex: 60 }); // Expire after 60 seconds

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