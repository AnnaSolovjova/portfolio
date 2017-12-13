/* Import required modules. */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var skillsReqHandler = require('./skillsRequestHandler.js');

/* Configure db */
var db = mongoose.createConnection('localhost', 'portfolio');
var skillsSchema = new mongoose.Schema({
    skill: String,
    skillType: String
});


var skillsModel = db.model('Skills', skillsSchema);
skillsModel.find({}, 'skill',
    function(err, user){
        if(err){
            console.log("No data");
        }
        else{
            console.log("There is data");
        }
});

skillsReqHandler.setModel(skillsModel);

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
        var filename = path.basename(req.url);
        var extention = path.extname(filename);
        var root = __dirname;
        var contentType = extentionToContentType[extention];
        console.log(req.method);
        if (req.url === "/") {
            fs.readFile(path.join(root,"Client","main.html"), "UTF-8", function(err, html) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        } else if (req.url.match(/skills/) != null && contentType === undefined) {
            res.writeHead(200, {"Content-Type": "text/html"});            
            if(req.url.method === 'GET')
            {     
                skillsReqHandler.listSkill(res);
            }
            else if(req.url.method === 'DELETE')
            {
                var data;
                req.on('data', function (chunk) {
                    data += chunk;
                });
                req.on('end', function () {
                    console.log(data);
                });

                // skillsReqHandler.listSkill(res, req);     
            }  
            else if(req.url.method === 'POST')
            {
                skillsReqHandler.listSkill(res);
            }  
            
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
