from flask import Flask, render_template, send_file, request, redirect, flash, url_for
from psycopg2 import connect, extras

app = Flask(__name__)
app = Flask(__name__, static_folder='web')  #Cambio de nombre la carpeta por defecto llamada web para poder usar esa referencia de aquí en adelante


@app.route('/')
def home():
    return send_file('index.html')

# @app.route('/')
# def home():
#     return render_template('dashboardbase.html')

@app.route('/templates/dashboard')
def dashboardadmin():
    return render_template('dashboardbase.html')



if __name__ == '__main__':
    app.run(debug=True)