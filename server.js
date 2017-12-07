var http = require('http');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'portfolio');
db.on('error', console.log("Error when oppening the db"));
/*Only want a server when we can connect to database. */
db.once('open', function() {

    var extentionToContentType = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript",
        '.jpeg': "image/jpeg"
    }
    /* Creating a webserwver that listens on the port and sends response back.
    Callback function is executed when someone tries to access the computer on port 8080.*/
    http.createServer(function (req, res) {
        console.log(req.url);
        var filename = path.basename(req.url);
        var extention = path.extname(filename);
        var root = __dirname;
        var contentType = extentionToContentType[extention];
        console.log(contentType);
        if (req.url === "/") {
            fs.readFile(path.join(root,"Client","main.html"), "UTF-8", function(err, html) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        } else if (req.url.match(/skills/) && fs.lstatSync(req.url).isDirectory()) {
        
            
        }
        else if(extention === '.jpeg') {
            fs.readFile(path.join(root, "Client", req.url), function(err, binary) {
                res.writeHead(200, {"Content-Type": contentType});
                res.end(binary);
            }); 
        }else {
            
            fs.readFile(path.join(root, "Client", req.url), "UTF-8", function(err, binary) {
                res.writeHead(200, {"Content-Type": contentType});
                res.end(binary);
            });
        }
        
    }).listen(8080);
});
