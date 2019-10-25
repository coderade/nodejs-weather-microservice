'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');
const config = require('../config');

const server = http.createServer(service);

server.listen(() => {
    const port = server.address().port;
    console.log(`The weather micro-service is listening on http://localhost:${port} in ${service.get('env')} mode.`);

    const announce = async () => {
        try {
            const res = await request.put(`http://127.0.0.1:3000/service/weather/${port}`)
                .set('X-BOT-SERVICE-TOKEN', config.serviceAccessToken)
                .set('X-BOT-API-TOKEN', config.botApiToken);

            console.log(res.body);
        } catch (err) {
            console.error('Error connecting to Codebot:', err.message);
        }
    };

    announce();
    setInterval(announce, 15 * 1000);
});

server.on('error', (error) => {
    console.error(`Server error: ${error.message}`);
    process.exit(1);
});
