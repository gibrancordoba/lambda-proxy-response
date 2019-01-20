# lambda-proxy-response

A Typescript Node.js package that create and generate responses into Lambda proxy.

## Installation


## Getting Started

You will need to import the node module into your file:

```javascript
  import ResponseBuilder from 'lambda-proxy-responses';
```

## Usage  

```javascript
  ResponseBuilder.ok('this is a new response', cb);
```

```javascript
  ResponseBuilder.ok({message: 'this is a new response'}, cb);
```

```javascript
  ResponseBuilder.notFound('object notFound', cb);
```


```javascript
  ResponseBuilder.serverError(500, new Error('this is a new response'), cb);
```


### Response Type support
  - ok
  - notFound
  - badRequest
  - forbidden
  - serverError
  - internalServerError
## License

Not yet


[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
