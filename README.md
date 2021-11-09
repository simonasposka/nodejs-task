# Task

![Generic badge](https://img.shields.io/badge/V-1.0.0-green.svg)

## Setup

### Using Docker

Build image:

```
make build
```

Start container:

```
make start
```

Stop container:

```
make stop
```

### Locally

```
make local
```

## Available HTTP endpoints

- GET /address - Returns all available addresses
- POST /address - Creates new address
- GET /address/{id} - Returns specific address
- PATCH /address/{id} - Modifies specific address
- DELETE /address/{id} - Permanently removes specific address

I've exported a [Postman collection](./postmanCollection.json).

## Caching

All GET requests are cached for 60 seconds.
The value can be changed inside .ENV file: `CACHE_DURATION`

To clear the cache for a given route, pass [Clear-Site-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data) header:

```
Clear-Site-Data: "cache"
```

or

```
Clear-Site-Data: "*"
```
