from flask import jsonify, make_response

def api_response(data=None, message = "", status_code=200):
    """API response 
    """    
    return make_response(jsonify(
        {
            "message": message,
            "data": data
        }), status_code)