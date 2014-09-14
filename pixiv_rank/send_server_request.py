from urllib2 import urlopen,quote
from datetime import date,timedelta
import time

import sendRequest

serverHost = '127.0.0.1:8000/pixiv'

startDate = date(year=2014,month=9,day=1)
# How many days to request
days = 1
requestInterval = 5

# URL example.
# User inserting.
# http://127.0.0.1:8000/pixiv/user/pixiv_id/465084/name/%E8%8B%A5%E6%9E%97%E7%A8%94%E5%BC%A5(16%E6%97%A5%E5%8D%98%E8%A1%8C%E6%9C%AC%E7%99%BA%E5%A3%B2)/profile_img_url/http://i1.pixiv.net/img23/profile/tsuredure_children/6282189_s.jpg
# Pic inserting.
# http://127.0.0.1:8000/pixiv/pic/user/465084/pic_id/465084/title/school%20girl%20vacation/view_count/80096/total_score/26545/url/http://i1.pixiv.net/img23/img/tsuredure_children/mobile/45037835_240mw.jpg
# http://127.0.0.1:8000/pixiv/pic/user/122500/pic_id/122500/title/%E4%B8%83%E5%B9%B4%E7%9B%AE%E3%81%AE%E6%AD%8C%E5%A7%AB%E3%81%B8/view_count/16272/total_score/28182/url/http://i1.pixiv.net/img11/img/nnni_f/mobile/45691291_240mw.jpg
# Rank inserting.
# http://127.0.0.1:8000/pixiv/rank/1/user/465084/date/2014-08-01

def makeRequest(targetUrl):
    url = "http://%s" % serverHost + targetUrl
    url = url.encode('utf-8')
    print url
    return urlopen(url).read()

# def uriEncode(list):
#     for i in list:
#         print i 

def insertUser(pixiv_id,name,profile_img_url):
    targetUrl = "/user/pixiv_id/%s/name/%s/profile_img_url/%s" % (pixiv_id,quote(name.encode('utf-8')),profile_img_url)
    return makeRequest(targetUrl)

def insertRank(rank,pixiv_id,date):
    targetUrl = "/rank/%s/user/%s/date/%s" % (rank,pixiv_id,date)
    return makeRequest(targetUrl)

def insertPic(pixiv_id,pic_id,title,url,view_count,total_score):
    targetUrl = "/pic/user/%s/pic_id/%s/title/%s/view_count/%s/total_score/%s/url/%s" % (pixiv_id,pixiv_id,quote(title.encode('utf-8')),view_count,total_score,url)
    return makeRequest(targetUrl)

def sendInsert(arr):
    for i in range(0,3):
        insertUser(pixiv_id=arr[i]['pixiv_id'],name=arr[i]['user_name'],profile_img_url=arr[i]['user_profile_img'],)
        insertRank(rank=arr[i]['rank'],pixiv_id=arr[i]['pixiv_id'],date=arr[i]['rank_date'],)
        insertPic(
            pixiv_id=arr[i]['pixiv_id'],
            pic_id=arr[i]['pic_id'],
            title=arr[i]['title'],
            url=arr[i]['pic_url'],
            view_count=arr[i]['view_count'],
            total_score=arr[i]['total_score'],
        )

for i in range(0,days):
    currentDate = startDate - timedelta(days=i+1)
    arr = sendRequest.requestData(date=currentDate)
    sendInsert(arr)
    if i<days-1 :
        time.sleep(requestInterval)
print 'done'