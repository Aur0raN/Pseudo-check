import tweepy

import pandas as pd

from tweepy import Cursor  # Used to perform pagination

from datetime import datetime, timezone

import pprint

import config

import json

from dateutil.parser import parse
import time

client = tweepy.Client(config.bearer_token)  ##Version 2.0 Auth

auth = tweepy.OAuth2BearerHandler(config.bearer_token)
clientv1 = tweepy.API(auth)


def get_user_suggestion(keyword):
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

    response = clientv1.search_users(keyword)

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