// This function is the endpoint's request handler.
exports = function({ query, headers, body} , response) {
        let condition = {};
        if(query.requesttype == "products")
        {
          const search = query.search;
          const category = parseInt(query.category);
          
          if (search) {
              // Split the search query into individual words
              const searchWords = search.split(' ');
  
              // Construct an array of regex patterns for each word
              const regexPatterns = searchWords.map(word => new RegExp('.*' + word + '.*', 'i'));
  
              // Use the $in operator to match any of the words in the title or unique_code
              condition.$or = [
                { title: { $in: regexPatterns } },
                { unique_code: { $in: regexPatterns } }
              ];
          }
  
          if (category) {
              condition.category_id = category;
          }
  
          const products = context.services.get("mongodb-atlas").db("reviewcentral").collection("products").find(condition).sort({ title: -1 });
          
          return products;
        }
        else if(query.requesttype == "product_reviews"){
          const product_unique_code = query.unique_code;
          if (product_unique_code) {
            query.product_unique_code = product_unique_code;
          }
          const prodReviews =  context.services.get("mongodb-atlas").db("reviewcentral").collection("product_reviews").find(condition).sort({ review_date: -1 });
          return prodReview;
        }
        else{
          return "No Result";
        }
};
