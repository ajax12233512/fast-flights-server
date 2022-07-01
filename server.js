import { createRequire } from 'module';//Allow ability to require files in ES6
const require = createRequire(import.meta.url);
import 'dotenv/config';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const app = express();
const port = process.env.PORT || 3001;
import { duffel } from './duffel/duffel.js'
import { search } from './utils/search.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const testDuffel = async () => {
//   try{
//     const airports = await duffel.airports.listWithGenerator();
//     for await (const airport of airports) 
//       console.log(airport)  
//   } catch (err) {
//     console.log(err)
//   }

// }

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

app.post('/api/search', search)

app.post('/api/duffel/search', async (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.post('/api/duffel', async (req, res) => {
  const newArray = [];
  try{
    console.log(req.body.input)
    const airports = await duffel.airports.listWithGenerator();
    // for await (const airport of airports) {
    //   if(airport.data.city_name.includes(req.body.input))
    //     newArray.push(airport.data.city_name);
    // }
    console.log(airports)
    // const response = airports.map(airport => {
    //     if(airport.city_name.includes(req.body.input))
    //       return airport;
    //   })
    // duffel.offerRequests.create({
    //   slices: [

    //   ]
    // })
    res.json(newArray);
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/test', async (req, res) => {
  res.json({
    message: 'success'
  })
})

// testDuffel()

app.listen(port, () => {
    console.log('Server running');
})