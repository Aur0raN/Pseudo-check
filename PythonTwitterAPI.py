import tweepy

import config

client = tweepy.Client(config.bearer_token)

query = 'covid -is:retweet'  # This is when Querying Tweets in timeline


try:
    username_test = input("Please enter username to display data")

    response = client.get_user(username=username_test)

    print(response.meta)

    user = response.data
    try:
        user_data = {"ID": user.id,
                     "name": user.name,
                     "username": user.username
                     }
        print(user_data)
    except AttributeError:
        print("data was invalid In dict")


    # for response in tweepy.Paginator(client.get_users_tweets,
    #                              id=user.id,
    #                              max_results=50,limit = 50):
    #
    #     print(response.data)


    tweetcount = client.get_all_tweets_count()


except tweepy.errors.BadRequest or tweepy.errors.NotFound:
    print("bad username")

# print(username_test + " is following these users")
#
# following = client.get_users_following(id='1252678388269174784', user_fields=['username'],max_results = 1000)
# following_count = 0
# for user in following.data:
#     following_count += 1
#     print(user.username)
#
# print("This is the Users followers " + username_test)
#
#
# followers = client.get_users_followers(id='1252678388269174784', user_fields=['username'],max_results = 1000)  # Followers of user #Big limitation which is 1000 followers might have to web scrape data for the other users.
# follower_count = 0
# for user in followers.data:
#     follower_count += 1
#     print(user.username)
#
# print("Follower count = " + str(follower_count)) #Limitation is 1000
# print("Following  count = " + str(following_count)) #Limitation is 1000
# # response= client.search_recent_tweets(query=query,max_results = 100)
# # print(response)
