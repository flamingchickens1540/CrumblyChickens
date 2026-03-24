import { handler } from './build/handler.js';
import express from 'express';
import { createServer } from 'http';
import wsConfig from './ws.ts';

const app = express();
const server = createServer(app);
wsConfig(server);

app.use(handler);

server.listen(3000, () => {
    console.log('starting CrumblyChickens on port 3000');
});
