from flask import Flask, jsonify, request, abort

import PythonTwitterAPI


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/username/<username>", methods=['GET'])
def show_user_details(username):
    flag = PythonTwitterAPI.auth_user_name(username)
    if flag:
        abort(400)  # Bad Request
    else:
        data = PythonTwitterAPI.get_user_info_v1(username)
        return jsonify(data), 200


if __name__ == '__main__':
    app.run(debug=True)
