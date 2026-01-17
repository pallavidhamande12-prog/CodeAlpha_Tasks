from flask import Flask, request, render_template, redirect
import random
import string
import mysql.connector
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mmlab",
    database="url_shortener_db"
)
cursor = db.cursor()

app = Flask(__name__)

url_map={}

def generate_short_url(): 
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))

@app.route('/', methods=['GET', 'POST'])

def home():
    short_url = None

    if request.method == 'POST':
        long_url = request.form.get('long_url')
        
        # Check if long_url already exists
        query = "SELECT short_url FROM url WHERE long_url=%s"
        cursor.execute(query, (long_url,))
        result = cursor.fetchone()

        if result:
            short_url = result[0]
        else:
            short_url = generate_short_url()
            query = "INSERT INTO url(long_url, short_url) VALUES (%s, %s)"
            cursor.execute(query, (long_url, short_url))
            db.commit()
        short_url = f"http://127.0.0.1:5000/{short_url}"

    return render_template('index.html', short_url=short_url)

@app.route('/<short_url>')
def redirect_to_long_url(short_url):
    query = "SELECT long_url FROM url WHERE short_url=%s"
    cursor.execute(query, (short_url,))
    result = cursor.fetchone()

    if result:
        long_url = result[0]
        # Safety: add https if missing
        if not long_url.startswith(('http://', 'https://')):
            long_url = 'https://' + long_url
        return redirect(long_url)
    else:
        return "URL not found", 404

if __name__ == '__main__':
    app.run(debug=True)
