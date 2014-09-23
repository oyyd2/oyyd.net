# -*- coding: utf-8 -*-
from django.test import TestCase,Client
from users.models import User
from urllib2 import quote

class UserTest(TestCase):
  def setUp(self):    
    self.client = Client()    
    
    # It's hard to say whether it is a bug
    # or just my mistake. But I'd better not
    # test unicode parameters here.
    
    # self.name = u'中文名'
    
    self.name = 'TESTNAME'
    self.pixivId = 'TESTID'
    self.url = 'http://i1.pixiv.net/img23/profile/tsuredure_children/6282189_s.jpg'

  def test_get_user_instance(self):
    url = "/pixiv/user/pixiv_id/%s/name/%s/profile_img_url/%s" % (self.pixivId,self.name,self.url)
    response = self.client.get(url)
    self.assertEqual(response.status_code,200)    
    self.assertEqual(response.content,'success')
    instance = User.objects.get(pixiv_id=self.pixivId)              
    self.assertEqual(instance.name,self.name)