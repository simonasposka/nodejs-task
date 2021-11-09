import express from 'express';
import dotenv from 'dotenv';
import log from './logger';
import connect from './db/connect';
import router from './routes';
import expectsContentTypeJSON from './middleware/expectsContentTypeJSON';
import setsResponseContentType from './middleware/setsResponseContentType';
import logsRequests from './middleware/logsRequests';
import cache from './middleware/cache';
import handlesApiErrors from './middleware/handlesApiErrors';

dotenv.config();

const app = express();

app.set('etag', 'strong');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expectsContentTypeJSON);
app.use(setsResponseContentType);
app.use(logsRequests);
app.use(cache);
app.use(router);
app.use(handlesApiErrors);

const port = process.env.APP_PORT || 3000;

app.listen(port, (): void => {
  log.info(`Server is listening on port:${port}`);
  connect();
});
