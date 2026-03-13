import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import wsConfig from './ws.ts';
import 'dotenv/config';
const app = express();
const server = createServer(app);
wsConfig(server);

console.log('Begin running in prod with Socket.IO configured');
app.use(handler);

server.listen(3000, () => {
    console.log('starting CrumblyChickens on port 3000');
});
