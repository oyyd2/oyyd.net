from django.http import HttpResponse
from ranks.models import Rank

def most_ranked(request):
  return HttpResponse('success')

