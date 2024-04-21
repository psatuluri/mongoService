// This function is the endpoint's request handler.
exports = function({ query, headers, body} , response) {
        
        //const products = context.services.get("mongodb-atlas").db("reviewcentral").collection("products").find().sort({ title: -1 });
        return body;
};
