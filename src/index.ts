import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import fileStore from 'session-file-store';
import mongoose from 'mongoose';
import routerFile from 'routes/routerFile';
import routerMongo from 'routes/routerMongo';

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI || '';


declare module 'express-session' {
    export interface Session {
        login: string,
        pass: string
    }
}
const FileStore = fileStore(session);

app.use(express.json());
app.use(cors());
app.use(express.static('static'));
app.use(session({
    store: new FileStore({ logFn: function () { } }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

//uncomment neccesssary route

// app.use('/api/v1', routerFile);
// app.use('/api/v1', routerMongo);
app.use('/api/v2/router', routerMongo);

app.use((req: express.Request, res: express.Response): void => {
    res.status(404).json({ message: 'Not found' })
});

app.use((err: any, req: express.Request, res: express.Response): void => {
    res.status(500).json({ message: err.message })
});


const startApp = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connection successful");

        app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
        })
  } catch (e) {
        console.error(`Failed to launch app with error: ${e}`);
        process.exit(1);
  }
}

startApp();