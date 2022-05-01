from itertools import count
import tweepy

import pandas as pd

from tweepy import Cursor  # Used to perform pagination

from datetime import datetime, timezone

import pprint

import config

import json

from dateutil.parser import parse
import time

client = tweepy.Client("AAAAAAAAAAAAAAAAAAAAAK5FYgEAAAAA4tgGcHCNmPg8On9iOS528gprbwo%3DRuhAYaZKAFLLUu51j8ml1kvcS998uKeIYNJNULzSUK1Hey9hC2")  ##Version 2.0 Auth

auth = tweepy.OAuth2BearerHandler("AAAAAAAAAAAAAAAAAAAAAK5FYgEAAAAA4tgGcHCNmPg8On9iOS528gprbwo%3DRuhAYaZKAFLLUu51j8ml1kvcS998uKeIYNJNULzSUK1Hey9hC2")
clientv1 = tweepy.API(auth)


def get_user_suggestion_name(q):
    """
@params:
        q – The query to run against people search.
        page – Specifies the page of results to retrieve. Note: there are pagination limits.
        count – The number of results to try and retrieve per page.
        include_entities – The entities node will not be included when set to false. Defaults to true.


@return
    - a dict of user info including:
        -ID
        -name
        -username
        -tweet_count
"""

    response = clientv1.search_users(q,page=1, count=1)
    for user in response:
        pprint.pprint(user.screen_name)
    
    return "Ok"

def get_user_suggestion(q,count,page_limit):
    """
@params:
        q – The query to run against people search.
        page – Specifies the page of results to retrieve. Note: there are pagination limits.
        count – The number of results to try and retrieve per page.
        include_entities – The entities node will not be included when set to false. Defaults to true.


@return
    - a dict of user info including:
        -ID
        -name
        -username
        -tweet_count
"""

    all_users = []

    for page in Cursor(clientv1.search_users,
                       q=q,
                       count=int(count)).pages(int(page_limit)):
        for user in page:
            print(user)
            fetched_users = {}
            fetched_users['id'] = user.id
            fetched_users['name']= user.name
            fetched_users['screen_name']= user.screen_name
            fetched_users['location'] = user.location
            fetched_users['description'] = user.description
            fetched_users['followers_count'] = user.followers_count
            fetched_users['friends_count'] = user.friends_count
            fetched_users['statuses_count'] = user.statuses_count
            fetched_users['created_at'] = user.created_at
            fetched_users['verified'] = user.verified

            all_users.append(fetched_users)

    return all_users