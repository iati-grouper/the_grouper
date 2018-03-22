import grouper_algo
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response

app = Flask(__name__)

@app.route('/grouper', methods=['POST'])
def grouper():
   message = None
   if request.method == 'POST':
        datafromjs = request.get_json()
        groups_result = grouper_algo.run_grouper(datafromjs)
        resp = make_response(str(groups_result).replace("'", "\""))
        resp.headers['Content-Type'] = "application/json"
        return resp
if __name__ == "__main__":
   app.run(debug = True)