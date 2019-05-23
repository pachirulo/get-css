var q = require("q")
var request = require("request")

module.exports = function getLinkContents(linkUrl, options) {
 var d = q.defer()

 request({ url: linkUrl, timeout: options.timeout, gzip: true }, function(
   error,
   response,
   body
 ) {
   if (error || response.statusCode !== 200) {
     d.reject(error)
   }

   // expect linked css content
   if (!response || (response.headers && !response.headers["content-type"].includes("text/css"))) {
     d.resolve('');
   }

   d.resolve(body)
 });

 return d.promise
}