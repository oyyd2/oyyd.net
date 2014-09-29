var router =  require('express').Router();

router.get('/most_viewed_pic',function(req,res){
  res.render('pixiv/most_viewed_pic.jade');
});

module.exports = router;