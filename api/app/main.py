import os
from flask import Flask, jsonify, url_for, make_response
from app.DriveTemp import driveTemp
from app.CpuTemp import cpuTemp
from app.FreeSpace import freeSpace
from app.Config import cpuTempRanges, driveTempRanges, freeSpaceRanges

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify([url_for(x.endpoint, **(x.defaults or {})) for x in app.url_map.iter_rules() if x.endpoint != 'static'])

@app.route("/driveTemp")
def driveTempHandler():
    return jsonify(driveTemp())

@app.route("/driveTempRanges")
def driveTempRangesHandler():
    return jsonify(driveTempRanges())

@app.route("/cpuTemp")
def cpuTempHandler():
    return jsonify(cpuTemp())

@app.route("/cpuTempRanges")
def cpuTempRangesHandler():
    return jsonify(cpuTempRanges())

@app.route("/freeSpace")
def freeSpaceHandler():
    return jsonify(freeSpace())

@app.route("/freeSpaceRanges")
def freeSpaceRangesHandler():
    return jsonify(freeSpaceRanges())

@app.route('/router-ip', methods=['GET'])
def router_ip():
    try:
        ip = os.environ.get('ROUTER_IP')
    
        response = make_response(ip, 200)
        response.mimetype = 'text/plain'
        return response
    except Exception as e:
        print(f"Error: {e}")
        return make_response("Error: Gateway IP not found", 500)

# if __name__ == "__main__":
#     # Only for debugging while developing
#     app.run(host='0.0.0.0', debug=True, port=80)





