const Hapi = require('@hapi/hapi');
const routes = require('./routes');

let env = ""
if (typeof process.env.NODE_ENV !== 'undefined')
  env = process.env.NODE_ENV.replace('\n', '')
    .replace('\r', '')
    .replace(' ', '');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: env !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
