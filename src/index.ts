import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { handleError } from './utils/error';


const app = express();

import users from './router/user';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users',users);

app.use(handleError)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


