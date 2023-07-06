import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { handleError } from './utils/error';


const app = express();

import users from './router/user';
import drones from './router/drone';
import { startBatteryLevelCheckCronJob, startChangeDroneStateCronJob } from './cronjob/battery-cron-job';

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/users',users);
app.use('/api/v1/drones',drones);

app.use(handleError)
startBatteryLevelCheckCronJob();
startChangeDroneStateCronJob();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


