import logger, { Logger } from 'pino';
import dayjs from 'dayjs';

const log: Logger = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `"time":"${dayjs().format()}"`,
});

export default log;
