import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

bootstrap();
