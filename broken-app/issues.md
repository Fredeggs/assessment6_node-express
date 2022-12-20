# Broken App Issues
1. There was no error handling at all
2. There was no inclusion of 'app.use(express.json())', which meant that we could not look at the request body
3. The code was setup such that the axios.get() requests were made in series. This was refactored to axios.all in order to make these requests in parallel.