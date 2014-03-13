var fs = require('fs'),
    prefix = 'static/MD/',
    uploadMDText = module.exports = function(req,res,next){
        var text = req.body.text;
        fs.writeFile(prefix+new Date().getTime()+'.md',text,function(err){
            if(err){
                res.send('Internal error.');
                throw err;
            }else{
                res.send('Success');
            }
        });
    };