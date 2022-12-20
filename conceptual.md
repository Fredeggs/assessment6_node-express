### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    - One way to manage asynchronous code is to use Promises and .then() if one would need to chain together multiple Promises. Another way is through using the async/await keywords to create asynchronous functions that await processes that will take time. 

- What is a Promise?
    - A Promise is an object representing the eventual completion or failure of an asynchronous operation
  
- What are the differences between an async function and a regular function?
    - An async function (as its name implies) is a function that is executed asynchronously and will always return a Promise. An async function can contain zero or more 'await' keywords and Javascript will pause execution of any code after the await keyword until the Promise associated with the asynchronous code is resolved or rejected.

- What is the difference between Node.js and Express.js?
    - NodeJS is open-source JavaScript code that runs on servers. Express is a web development framework that use Node.js.

- What is the error-first callback pattern?
    - Error-first callback in Node.js is a function which either returns an error object or any successful data returned by the function.

- What is middleware?
    - Middleware is a route handler in an application that holds the request object, the response object and the middleware function. The middleware function can also have access to the request and response object, which effectively allows middleware to run anytime a request is made to the app/route.

- What does the `next` function do?
    - The next function is used to move to the "next" piece of middleware before returning a response in an application. next is often used in error handling. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  1. This function uses jQuery's method for getting JSON which requires a callback function to actually return the data. I don't think async/await works here. This is set up to use axios.get() rather than $.getJSON()
  2. Since this function makes 3 separate requests the function won't return until each asynchronous operation completes one after the other. This would be better if it was all batched in 1 shot using something like axios.all()
