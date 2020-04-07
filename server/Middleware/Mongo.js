/* @flow strict */

import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DB_NAME}?authSource=admin`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const MongoDB = mongoose.connection;

MongoDB.once('open', (): void => console.log('[Mongo]', `Connected. DB name: ${process.env.MONGO_DB_NAME}`));
MongoDB.on('error', (err: Error): void => console.error('[Mongo]', err));
