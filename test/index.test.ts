import ResponseBuilder from '../src/index';

test('ResponseBuilder', () => {
  console.log(ResponseBuilder.ok({hello: "hello"}, (error, response) => { console.log(error, response) } ));
  expect(true).toBe(true);
});
