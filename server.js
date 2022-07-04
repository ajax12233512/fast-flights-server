//Allow ability to require files in ES6
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import 'dotenv/config';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const app = express();
const port = process.env.PORT || 3001;
import { duffel } from './duffel/duffel.js'
import { 
  search, 
  createOfferRequest, 
  getOfferRequest 
} from './utils/index.js';


//Allow ability to use __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


//Auto Search feature handler
app.post('/api/search', search)

//create Offer request handler
app.post('/api/duffel/search', createOfferRequest)

app.post('api/duffel/getSearch', getOfferRequest)

//Check for enviornment variable
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server running ${process.env.NODE_ENV === 'production' ? 
    'production' : 
    'development'} mode on port ${port}`);
})