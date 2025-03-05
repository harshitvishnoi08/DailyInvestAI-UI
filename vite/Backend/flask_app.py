import asyncio
from flask import Flask,request,jsonify
from flask_cors import CORS
import markdown
import yfinance as yf
from g4f.client import Client
from googletrans import Translator
from technical_agent import main

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # This ensures proper Unicode output


CORS(app)


def format_response(text):
    """Cleans up response text: removes unnecessary spaces and hyphens."""
    text = ' '.join(text.split())  # Remove extra spaces/newlines
    
    # Remove leading hyphen if present
    if text.startswith("- "):
        text = text[2:]

    # Limit response length
    max_length = 300
    if len(text) > max_length:
        text = text[:max_length].rsplit(' ', 1)[0] + '...'
    
    return text

def get_chat_prompt(msg):
    return f"""You are a finance expert. Answer only finance-related questions, including stocks, investments, markets, and the economy. If the question is not finance-related, politely decline. Be concise and friendly. 
    Question: {msg}"""

def sendMsg(msg):
    """Fetches a response from the AI model with cleaned formatting."""
    try:
        client = Client()
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a finance assistant. Only provide responses related to finance and investments."},
                {"role": "user", "content": get_chat_prompt(msg)}
            ],
            max_tokens=150  # Limit token length
        )
        return format_response(response.choices[0].message.content)
    except Exception as e:
        print(f"Error querying GPT: {e}")
        return "I can only discuss finance-related topics. Please ask about stocks, investments, or financial markets."

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
    

@app.route('/api/chat', methods=['GET'])
def chat():
    """Handles chat requests and returns AI-generated responses."""
    try:
        user_message = request.args.get("message").strip()

        if not user_message:
            return jsonify({"response": "Please provide a message."}), 400

        response = sendMsg(user_message)
        return jsonify({
            "response": response,
            "status": "success"
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({
            "response": "Something went wrong. Please try again.",
            "status": "error"
        }), 500

@app.route('/api/translate', methods=['GET'])
def translate():
    try:
        text = request.args.get("text").strip()
        dest = request.args.get("dest")
        if not text:
            return jsonify({"response": "Please provide a text."}), 400

        translator = Translator()
        translated_text = translator.translate(text, dest=dest)

        return jsonify({
            "response": translated_text.text,
            "status": "success"
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({
            "response": "Something went wrong. Please try again.",
            "status": "error"
        }), 500

def techMsgs(data):
    try:
        client = Client()
        prompt = f"""
            You are a finance expert with years of experience analyzing financial data. You are meticulous and thorough in your analysis,
            especially when it comes to numbers. Analyze these stocks and provide a detailed report on your findings:

            {data}"""
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500
        )
        markdown_content = response.choices[0].message.content.strip()
        html_output = markdown.markdown(markdown_content)
        return html_output
    except Exception as e:
        print(f"Error querying GPT: {e}")
        return "Error processing request."    
    
@app.route('/api/strategy', methods=['GET'])
def strategy():
    user_message = request.args.get("ticker").strip()
    output = asyncio.run(main(user_message))
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)