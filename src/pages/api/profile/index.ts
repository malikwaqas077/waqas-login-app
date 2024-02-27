
import { NextApiRequest, NextApiResponse } from 'next';
 

// API route to validate the token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request received', req.method);

  if (req.method === 'POST') {
    const { token } = req.body; 
    console.log('Token received', token);

    if (token === '123') {
      res.status(200).json({ name: 'John Doe', email: 'john@example.com' });
    } else {
      console.log('Invalid token');
      res.status(403).json({ error: 'Invalid token' });
    }
  } else {
    // If not a POST request, send 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
