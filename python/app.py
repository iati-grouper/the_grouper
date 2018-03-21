from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
app = Flask(__name__)

@app.route('/grouper', methods=['POST'])
def grouper():
   message = None
   if request.method == 'POST':
        datafromjs = request.get_json()
        resp = make_response("[[\"1\",\"2\",\"3\"], [\"3\",\"4\",\"5\"], [\"6\",\"7\",\"8\"]]")
        resp.headers['Content-Type'] = "application/json"
        return resp
if __name__ == "__main__":
   app.run(debug = True)