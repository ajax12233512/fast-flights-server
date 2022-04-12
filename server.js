import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.listen(port, () => {
    console.log('Server running');
})