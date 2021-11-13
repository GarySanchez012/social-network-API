import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(routes);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
