import memoryCache, { CacheClass } from 'memory-cache';
import { Request, Response, NextFunction } from 'express';
import { intersection } from 'lodash';

const memCache: CacheClass<string, string> = new memoryCache.Cache();
const duration = process.env.CACHE_DURATION ?? 60;

const handle = (request: Request, response: Response, next: NextFunction) => {
  if (request.method !== 'GET') {
    return next();
  }

  const key = request.originalUrl;

  if (
    request.headers['clear-site-data'] &&
    intersection(
      ['*', 'cache'],
      (<string>request.headers['clear-site-data']).split(',')
    ).length > 0
  ) {
    memCache.del(key);
  }

  const cachedBody = memCache.get(key);

  if (cachedBody) {
    response.send(cachedBody);
    return;
  }

  const oldSend = response.send.bind(response);

  response.send = (body: any) => {
    memCache.put(key, body, <number>duration * 1000);
    return oldSend(body);
  };

  next();
};

export default handle;
