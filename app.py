from flask import Flask, jsonify, request, abort, render_template

import PythonTwitterAPI


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/username/<username>", methods=['GET'])
def show_user_details(username):
    flag = PythonTwitterAPI.auth_user_name(username)
    if flag:
        abort(400)  # Bad Request
    else:
        data = PythonTwitterAPI.get_user_info_v1(username)
        return jsonify(data), 200


@app.route("/checkuser/<username>", methods=['GET'])
def check_user_details(username):
    flag = PythonTwitterAPI.auth_user_name(username)
    if flag:
        abort(400)  # Bad Request
    else:
        data = PythonTwitterAPI.check_percentage_spam(username)
        return jsonify(data), 200


if __name__ == '__main__':
    app.run(debug=True)
