exports = async function MyCustomEndpoint(request, response) {
  try {
    // 1. Parse data from the incoming request
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    let query = {};
    const body = JSON.parse(request.body.text());
    const requesttype = body.query.requesttype;
    const searchText = body.query.search;
    const category = body.query.category;
    if (category !== '0' && category !== '') {
      query.category_id = categoryId;
    }
    
    if(searchText !==''){
      query.$or = [
        { title: { $regex: '.*'+searchText+'.*', $options: 'i' } }, // Case-insensitive partial match on the title field
        { unique_code: { $regex: '.*'+searchText+'.*', $options: 'i' } } // Case-insensitive partial match on the unique_code field
      ];
    }
    const products = context.services.get("mongodb-atlas").db("reviewcentral").collection("products").find(query).sort({ title: -1 });
    return products;
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
