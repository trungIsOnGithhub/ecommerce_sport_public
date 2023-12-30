import dotenv from 'dotenv';
import  { fakeDataUser } from './src/seeder/fake_user'
import  { fakeDataStadium } from './src/seeder/fake_stadium'
import mongoose, { ConnectOptions } from 'mongoose';
dotenv.config();

import app from './src/app';

const URL_DB = process.env.DATABASE as string;
if (URL_DB?.includes('<PASSWORD>')) {
    URL_DB.replace('<PASSWORD>', process.env.PASSWORD as string);
}

const connectionParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions;

// let dbSuccess = false;
mongoose
    .connect(URL_DB, connectionParam)
    .then(() => {
        console.log('Connect DB sucessfully');
        // dbSuccess = true;
        fakeDataUser(mongoose.connection);
        fakeDataStadium(mongoose.connection)
    })
    .catch(() => console.log('Fail to connect DB'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
