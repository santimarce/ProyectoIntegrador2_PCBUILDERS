from flask import Flask, render_template, send_file, request, redirect, flash, url_for
from psycopg2 import connect, extras

app = Flask(__name__)
app = Flask(__name__, static_folder='web')  #Cambio de nombre la carpeta por defecto llamada web para poder usar esa referencia de aquí en adelante

# Conexion a la base de datos estatica


host = 'localhost'
port = '5432'
dbname = 'ProyectoIntegrador2do'
username = 'postgres'
password = 'Santi018'


def Conexiondb():
    conn = connect(host=host, port=port, dbname=dbname,
                   user=username, password=password)
    return conn

# Ingreso de productos a la base
@app.route('/dashboardadmin/ingresarproducto')
def ingresarproductos():
    return render_template('app/ingresoprodadmin.html')

#control de prueba para añadir productos desde el dashboard a la base
@app.route('/dashboardadmin')
def dashboardadmin():
    return render_template('app/dashboard-admin.html')  

#RUTAS-------------

#armarpc
@app.route('/armarpc')
def armarpc():
    return render_template('app/armar.html')  

#dashboard-admin
@app.route('/dashboardAdmin')
def dashboardAdmin():
    return render_template('app/dashboard-admin.html/')

#gestion de usuario
@app.route('/gestiondeusuario')
def gestiondeusuario():
    return render_template('app/gestiondeusuario.html/')

#dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('app/dashboard.html/')

#login cliente
@app.route('/login')
def login():
    return render_template('app/login.html/')

#login admin
@app.route('/loginAdmin')
def loginAdmin():
    return render_template('app/loginAdmin.html')  

#pedidos
@app.route('/pedidos')
def pedidos():
    return render_template('app/pedidos.html') 

#registro
@app.route('/registro')
def registro():
    return render_template('app/registro.html') 

#compras
@app.route('/compras')
def compras():
    return render_template('app/compras.html') 

  
# a partir de aquí generar sus rutas respectivas, para las páginas estáticas no hace falta agregar rutas siempre y cuando la indexacion
# quede acorde a como se ha ordenado en las carpetas los html
# si alguna ruta no redirige porfavort verificar, usar render_template en vez de send_file en lo posible
# para evitar que cambie las direcciones tal como lo haría con jinja2

@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)