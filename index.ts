import type { Request, Response } from 'express'
import { config } from 'dotenv'
import express from 'express'
import userRoutes from './Server/routes/users.ts'
const app = express()

app.use(express.json())
app.use('/', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000')
})