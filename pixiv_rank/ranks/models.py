from django.db import models
from users.models import User


class Rank(models.Model):
    user = models.ForeignKey(User)
    rank = models.IntegerField()
    date = models.DateField()
