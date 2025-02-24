from flask import Flask,request,jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route("/api/get_data",methods=["GET"])
def get_data():
    symbol = request.args.get("symbol")
    if not symbol:
        return jsonify({"error":"No symbol provided"})
    dat = yf.Ticker(symbol)
    hist = dat.history(period='1mo')
    dates = [day.strftime("%d %b") for day in hist.index.date]
    return jsonify({"dates":dates,"values":hist.get("Close").tolist()})

@app.route("/api/current_price", methods=["GET"])
def current_stock_price():
    symbol = request.args.get("symbol")
    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")
        data2 = stock.history(period="23d")
        if data.empty:
            return jsonify({"error": "No data found for symbol"}), 404
        open_price = data2['Close'].iloc[0]
        current_price = data['Close'].iloc[-1]
        percentage_change = ((current_price - open_price) / open_price) * 100

        return jsonify({
            "current_price": "%.2f" % float(current_price),
            "percentage_change": "%.2f" % float(percentage_change)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)