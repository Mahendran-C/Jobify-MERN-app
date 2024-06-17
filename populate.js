import dotenv from 'dotenv';
dotenv.config();
// import data from './mockdata.js'

import { readFile } from 'fs/promises';

import connectDb from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    // await Job.deleteMany();

    const data = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );

    await Job.create(data);
    // console.log('job created')
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
