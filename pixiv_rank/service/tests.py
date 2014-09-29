from django.test import TestCase,Client
import json

class ServiceTest(TestCase):
  def setUp(self):
    self.client = Client()

  def test_get_top_10_viewed_pics(self):
    url = "/pixiv/service/most_ranked"
    response = self.client.get(url)
    self.assertEqual(response.status_code,200)
    result = json.loads(response.content)
    self.assertIsNotNone(result[u'top_10'])