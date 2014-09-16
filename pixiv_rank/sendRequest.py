from urllib2 import urlopen
from pyquery import PyQuery as pq

rank_range = 3
def tripDate(date):
    dateStr = str(date)
    return dateStr[0:4]+dateStr[5:7]+dateStr[8:]    
def requestData(date):
    rank_date = tripDate(date)
    arr = []
    targetUrl = "http://www.pixiv.net/ranking.php?mode=daily&date=%s" % rank_date;
    d = pq(urlopen(targetUrl).read())

    for i in range(1,rank_range+1):  
        element = d.find('section[data-rank="%d"]' % i)        
        # If the pic is unaccessible, return.
        if element.size()==0 :
            continue
        user_container = element.find('a.user-container')
        pic_url = element.find('a.work').find('img').attr('data-src')
        validate_rank_date = rank_date[0:4] + '-' + rank_date[4:6] + '-' + rank_date[6:]
        pic_date = element.attr('data-date')                
        pic_date = pic_date[0:4] + '-' + pic_date[5:7] + '-' + pic_date[8:10]
        pic_id = pic_url.split('/')[-1]
        pic_id = pic_id[0:pic_id.find('_')]
        list = {
            'rank_date' : validate_rank_date,
            'rank' : element.attr('data-rank'),
            'title' : element.attr('data-title'),
            'user_name' : element.attr('data-user-name'),
            'pic_date' : pic_date,
            'pic_url' : pic_url,
            'view_count' : element.attr('data-view-count'),
            'total_score' : element.attr('data-total-score'),
            'pixiv_id' : user_container.attr('data-user_id'),
            'user_profile_img' : user_container.attr('data-profile_img'),
            'pic_id':pic_id,
        }
        arr.append(list)
    return arr