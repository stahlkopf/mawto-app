var HACKER_NEWS_API_V0 = 'https://hacker-news.firebaseio.com/v0/';
exports.HN_TOP_STORIES_ENDPOINT = HACKER_NEWS_API_V0+'topstories.json';
exports.HN_NEW_STORIES_ENDPOINT = HACKER_NEWS_API_V0+'newstories.json';
exports.HN_SHOW_STORIES_ENDPOINT = HACKER_NEWS_API_V0+'showstories.json';
exports.HN_ASK_STORIES_ENDPOINT = HACKER_NEWS_API_V0+'askstories.json';
exports.HN_JOB_STORIES_ENDPOINT = HACKER_NEWS_API_V0+'jobstories.json';
exports.HN_ITEM_ENDPOINT = HACKER_NEWS_API_V0+'item/';
var MAWTO_API_V0 = 'http://192.168.0.23:3000/api/';
exports.MAWTO_ARTICLE_IDS = MAWTO_API_V0+"ArticleURLs?filter[where][summarized]=1&[order]=dateinserted%20DESC&filter[fields][id]=true"
exports.MAWTO_ARTICLE_SUMMARY_MAIN= MAWTO_API_V0+"ArticleSummaryBasics/"
