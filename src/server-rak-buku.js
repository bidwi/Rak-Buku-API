const Hapi = require('@hapi/hapi');
const routes = require('./routes-rak-buku');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server udah jalan, coba aja cek ${server.info.uri}/books`);
};

init();
