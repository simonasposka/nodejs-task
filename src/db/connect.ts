import mongoose from 'mongoose';
import log from '../logger';

const connect = async (): Promise<void> => {
  const dbUri = process.env.DB_URI;

  try {
    await mongoose.connect(<string>dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    log.info('connected to the database');
  } catch (error) {
    log.error('db error', error);
    process.exit(1);
  }
};

export default connect;
