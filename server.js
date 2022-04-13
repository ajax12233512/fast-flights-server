import 'dotenv/config';
import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
import { duffel } from './duffel/duffel.js'

const testDuffel = async () => {
  try{
    const airlines = await duffel.airlines.list();
    console.log(airlines)
  } catch (err) {
    console.log(err)
  }

}


app.get('/api/test', async (req, res) => {
  res.json({
    message: 'success'
  })
})

// testDuffel()

app.listen(port, () => {
    console.log('Server running');
})
