from django.db import models
from users.models import User

class Pic(models.Model):    
    user = models.ForeignKey(User)
    pic_id = models.CharField(max_length=20)
    title = models.CharField(max_length=100)        
    url = models.CharField(max_length=200)
    view_count = models.IntegerField()
    total_score = models.IntegerField()