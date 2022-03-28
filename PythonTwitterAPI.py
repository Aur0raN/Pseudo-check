import tweepy

import pandas as pd

from tweepy import Cursor  # Used to perform pagination

import config

from datetime import datetime, timezone

import pprint

import json

from dateutil.parser import parse
import time

client = tweepy.Client(config.bearer_token)  ##Version 2.0 Auth

auth = tweepy.OAuth2BearerHandler(config.bearer_token)
clientv1 = tweepy.API(auth)


def get_tweets_from_user(twitter_user_name, page_limit=16, count_tweet=200):
    """
    @params:
        - twitter_user_name: the twitter username of a user (company, etc.)
        - page_limit: the total number of pages (max=16)
        - count_tweet: maximum number to be retrieved from a page

    @return
        - all the tweets from the user twitter_user_name
    """

    all_tweets = []

    for page in Cursor(clientv1.user_timeline,
                       screen_name=twitter_user_name,
                       count=count_tweet).pages(page_limit):
        for tweet in page:
            parsed_tweet = {}
            parsed_tweet['date'] = tweet.created_at
            parsed_tweet['author'] = tweet.user.name
            parsed_tweet['twitter_name'] = tweet.user.screen_name
            parsed_tweet['text'] = tweet.text
            parsed_tweet['number_of_likes'] = tweet.favorite_count
            parsed_tweet['number_of_retweets'] = tweet.retweet_count

            all_tweets.append(parsed_tweet)

    # Create dataframe
    try:
        pd.DataFrame({'text': parsed_tweet['text']}, index=[0])
    except UnboundLocalError:
        print("Failed to edit data frame")

    df = pd.DataFrame(all_tweets)

    # Revome duplicates if there are any
    df = df.drop_duplicates("text", keep='first')

    return df


def get_user_information(twitter_user_name):
    """
    <v2 API>
@params:
    - twitter_user_name: the twitter username of a user (company, etc.)


@return
    - a dict of user info including:
        -ID
        -name
        -username
"""

    response = client.get_user(username=twitter_user_name)
    user = response.data
    user_data = {"ID": user.id,
                 "name": user.name,
                 "username": user.username
                 }
    print(user_data)

    return user_data


def get_user_info_v1(twitter_user_name):
    """
    <v1 API>
@params:
    - twitter_user_name: the twitter username of a user (company, etc.)


@return
    - a dict of user info including:
        -ID
        -name
        -username
        -tweet_count
"""

    response = clientv1.get_user(screen_name=twitter_user_name)

    user_data = {"ID": response.id,
                 "name": response.name,
                 "username": response.screen_name,
                 "Tweet Count": response.statuses_count,
                 "Private": response.protected,
                 "Followers Count": response.followers_count,
                 "Following Count": response.friends_count,
                 "Created At": response.created_at.strftime('%m/%d/%Y'),
                 "Profile Image URL" : response.profile_image_url_https
                 }
    pprint.pprint(user_data)

    return user_data


def auth_user_name(twitter_user_name):
    """
@params:
- twitter_user_name: the twitter username of a user (company, etc.)


@return
-Boolean to see if user_name is found
"""
    try:
        response = client.get_user(username=twitter_user_name)
        response2 = clientv1.get_user(screen_name=twitter_user_name)
        return False

    except Exception:
        return True


def check_acc_inactive(twitter_user_name):
    """
@params:
- twitter_user_name: the twitter username of a user (company, etc.)


@return
-Boolean to see if user_name is inactive
"""
    try:
        tweet = clientv1.user_timeline(screen_name=twitter_user_name, count=1)[0]

        current_date = datetime.now(timezone.utc)
        tweet_date = tweet.created_at
        delta = current_date - tweet_date
        print(f"Days since last Post {delta}")

        print(f"Last post on {tweet.created_at}")

        print(f"Current date is {current_date}")

        print(f"Tweet ID is {tweet.id}")

    except:
        last_post = "user has not tweeted ever"
        print(last_post)


# flag = True  # While loop to auth username
# screen_name = "Null"
#
# while flag:
#     screen_name = input("Please enter your Twitter Handle")
#     flag = auth_user_name(screen_name)
#
# print(f"Your screen name is {screen_name}, Successfully Authenticated name")
#
# check_acc_inactive(screen_name)
# get_user_info_v1(screen_name)
# # user_timeline = get_tweets_from_user(screen_name)
#
# print("Data Shape: {}".format(user_timeline.shape))
#
# pd.set_option('display.max_colwidth', None)
# pd.set_option('display.max_rows', 2000)
# pd.set_option('display.max_columns', 2000)
# pd.set_option('display.width', 1000)
#
# print(user_timeline)


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
# followers = client.get_users_followers(id='1252678388269174784', user_fields=['username'],max_results = 1000)  #
# Followers of user #Big limitation which is 1000 followers might have to web scrape data for the other users.  Can
# be fixed with pagnination follower_count = 0 for user in followers.data: follower_count += 1 print(user.username)
#
# print("Follower count = " + str(follower_count)) #Limitation is 1000
# print("Following  count = " + str(following_count)) #Limitation is 1000
# # response= client.search_recent_tweets(query=query,max_results = 100)
# # print(response)
