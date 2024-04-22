exports = async function MyCustomEndpoint(request, response) {
  try {
    // 1. Parse data from the incoming request
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    const body = JSON.parse(request.body.text());
    const requesttype = body.query.requesttype;
    // 2. Handle the request
    // Split the search query into individual words
    const searchWords = requesttype.split(' ');

    // Construct an array of regex patterns for each word
    const regexPatterns = searchWords.map(word => new RegExp('.*' + word + '.*', 'i'));
    // 3. Configure the response
    response.setStatusCode(201);
    // tip: You can also use EJSON.stringify instead of JSON.stringify.
    response.setBody(
      JSON.stringify({
        regexPatterns,
        message: "Successfully saved the request body",
      })
    );
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
