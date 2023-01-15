// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Person } from '@/types/person'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person>
) {
  res.status(200).json({ name: 'local api test' })
}
