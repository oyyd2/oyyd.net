from django.db import models

class User(models.Model):    
    pixiv_id = models.CharField(max_length=40)
    name = models.CharField(max_length=100)    
    profile_img_url = models.CharField(max_length=200)