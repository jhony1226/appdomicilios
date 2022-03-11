import expressLoader from './express';
import Logger from './logger';
import postgresqlLoader from './postgresql';

//We have to import at least all the events once so they can be triggered
// import './events';

export default async ({ expressApp }) => {
  expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
