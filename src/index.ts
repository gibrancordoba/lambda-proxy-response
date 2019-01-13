import { ResponseBuilder } from './ResponseBuilder';


console.log(ResponseBuilder.ok({hello: "hello"}, (error, response) => { console.log(error, response) } ));

export default ResponseBuilder;
