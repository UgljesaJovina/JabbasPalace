import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';
import cors from "cors";

const application = express();

const httpServer = http.createServer(application);

new ServerSocket(httpServer);

application.use(express.urlencoded({ extended: true }));
application.use(express.json());

application.use(cors({ origin: "*" }));

httpServer.listen(5050, () => console.info(`Server is running`));
















// application.use((req, res, next) => {
//     console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

//     res.on('finish', () => {
//         console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
//     });

//     next();
// });


/** Rules of our API */
// application.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }

//     next();
// });


// /** Healthcheck */
// application.get('/ping', (req, res, next) => {
//     return res.status(200).json({ hello: 'world!' });
// });

// /** Socket Information */
// application.get('/status', (req, res, next) => {
//     return res.status(200).json({ users: ServerSocket.instance.players });
// });

// /** Error handling */
// application.use((req, res, next) => {
//     const error = new Error('Not found');

//     res.status(404).json({
//         message: error.message
//     });
// });