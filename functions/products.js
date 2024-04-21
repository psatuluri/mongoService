// This function is the endpoint's request handler.
exports = function(req) {
        const search = req.search;
        const category = parseInt(1);
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

        //if (category) {
        //    req.category_id = category;
        //}

        const products = context.services.get("mongodb-atlas").db("reviewcentral").collection("products").find().sort({ title: -1 });
        return products;
};
