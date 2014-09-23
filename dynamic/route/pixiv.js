var router =  require('express').Router();

router.get('/most_ranked',function(req,res){
  res.render('pixiv/test.jade');
});

module.exports = router;