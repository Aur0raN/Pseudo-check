import tweepy

import config

client = tweepy.Client(config.bearer_token)

query = 'covid -is:retweet' #This is when Querying Tweets in timeline

username_test = 'NostalgicVG'

users = client.get_users(usernames=['NostalgicVG'])


for user in users:
    print(user)

print(username_test + " is following these users")

following = client.get_users_following(id='1252678388269174784', user_fields=['username'],max_results = 1000)
following_count = 0
for user in following.data:
    following_count += 1
    print(user.username)

print("This is the Users followers " + username_test)


followers = client.get_users_followers(id='1252678388269174784', user_fields=['username'],max_results = 1000)  # Followers of user #Big limitation which is 1000 followers might have to web scrape data for the other users.
follower_count = 0
for user in followers.data:
    follower_count += 1
    print(user.username)

print("Follower count = " + str(follower_count)) #Limitation is 1000
print("Following  count = " + str(following_count)) #Limitation is 1000
# response= client.search_recent_tweets(query=query,max_results = 100)
# print(response)
