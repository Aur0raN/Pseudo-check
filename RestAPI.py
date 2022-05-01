from flask import Flask
from flask import Flask, render_template, abort
import json
from flask import jsonify
from flask import request
import UserSuggestion

app = Flask(__name__)

@app.route('/')
def index():
    return 'Welcome to model REST API'

@app.route('/hello2')
def helloIndex():
    response= {
        'name':'hello'
    }
    return jsonify(response)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.json
        return jsonify(data)
    else:
        yourarg = request.args.get('argname')
        return yourarg

"""class geeks:
    def __init__(self, name, roll):
        self.name = name
        self.roll = roll

class JsonSerializable(object):
    def toJson(self):
        return json.dumps(self.__dict__)

    def __repr__(self):
        return self.toJson()

# creating list
main_list = []

# appending instances to list
main_list.append( geeks('Akash', 1) )
main_list.append( geeks('Deependra', 2) )
main_list.append( geeks('Reaper', 3) )

body = {"content": main_list}"""

myOriginalData = [(1,2), (3,4), (5,6)]

@app.route('/list/', methods=['GET','POST'])
def get_tasks():
    if request.method == 'GET':
        return jsonify(myOriginalData)
    if request.method == 'POST':
        print(request.json)
        IPs2 = request.json
        for i in IPs2:
            if i not in main_lists:
                main_lists.append(i)
    return 'OK', 201


@app.route("/usersuggestions/<q>/<count>/<page_limit>", methods=['GET'])
def show_user_suggestions(q,count,page_limit):
        data = UserSuggestion.get_user_suggestion(q,count,page_limit)
        return jsonify(data), 200

app.run(host='0.0.0.0', port=5000)