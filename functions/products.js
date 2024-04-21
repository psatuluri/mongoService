// This function is the endpoint's request handler.
exports = function({ req, headers, body} , response) {
        if(req.requesttype == "products")
        {
          const search = req.search;
          const category = parseInt(req.category);
          let query = {};
  
          if (search) {
              // Split the search query into individual words
              const searchWords = search.split(' ');
  
              // Construct an array of regex patterns for each word
              const regexPatterns = searchWords.map(word => new RegExp('.*' + word + '.*', 'i'));
  
              // Use the $in operator to match any of the words in the title or unique_code
              query.$or = [
                { title: { $in: regexPatterns } },
                { unique_code: { $in: regexPatterns } }
              ];
          }
  
          if (category) {
              query.category_id = category;
          }
  
          const products = context.services.get("mongodb-atlas").db("reviewcentral").collection("products").find(query).sort({ title: -1 });
          
          return products;
        }
        else if(req.requesttype == "product_reviews"){
          const product_unique_code = req.unique_code;
          if (product_unique_code) {
            query.product_unique_code = product_unique_code;
          }
          const prodReviews =  context.services.get("mongodb-atlas").db("reviewcentral").collection("product_reviews").find(query).sort({ review_date: -1 });
          return prodReview;
        }
        else{
          return "No Result";
        }
};
