from flask import Flask, render_template, request, jsonify, redirect, session, send_file
from psycopg2 import connect, extras

app = Flask(__name__)
app = Flask(__name__, static_folder='web')  #Cambio de nombre la carpeta por defecto llamada web para poder usar esa referencia de aquí en adelante
app.config['SECRET_KEY'] =  'usuarios'
# Conexion a la base de datos estatica


# host = 'localhost'
# port = '5432' 
# dbname = 'ProyectoIntegrador2do'
# username = 'postgres'
# password = 'Santi018'
host        = 'localhost'
port        = 5432
dbname      = 'usuarios'
user        = 'postgres'
password    = 'password'

def get_connection():
    conn = connect(host=host, port=port, dbname=dbname,
                   user=user, password=password)
    return conn

# Ingreso de productos a la base
@app.route('/dashboardAdmin/ingresarproducto')
def ingresarproductos():
    con = get_connection()
    cur = con.cursor(cursor_factory=extras.RealDictCursor)
  #  cur.execute("SELECT * FROM VS_Auto")
   # autos = cur.fetchall()
    cur.close()
    con.close()    
    return render_template('app/ingresoprodadmin.html')

#//////////////////////////////////////////RUTAS////////////////////////////////////////
#armarpc
@app.route('/dashboard/armarpc')
def armarpc():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return render_template('app/armar.html')
        elif session["nivelrol"] == 2:
            return redirect('/dashboardAdmin')
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")
    

#dashboard-admin
@app.route('/dashboardAdmin')
def dashboardAdmin():
    if "usuario_id" in session:
        if session["nivelrol"] == 2:
            return render_template('app/dashboard-admin.html/')
        elif session["nivelrol"] == 1:
            return redirect('/')
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")


#dashboard-admin
@app.route('/catalogo')
def catalogo():
    return send_file('catalogo.pdf')
      

#gestion de usuario
@app.route('/dashboardAdmin/gestiondeusuario')
def gestiondeusuario():
    if "usuario_id" in session:
        if session["nivelrol"] == 2:
            return render_template('app/gestiondeusuario.html/')
        elif session["nivelrol"] == 1:
            return redirect('/')
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")

#dashboard
@app.route('/dashboard')
def dashboard():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return render_template('app/dashboard.html/')
        elif session["nivelrol"] == 2:
            return redirect('/dashboardAdmin')    
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")

#login cliente
@app.route('/formLogin')
def formLogin():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return redirect('/dashboard')
        elif session["nivelrol"] == 2:
            return redirect('/dashboardAdmin')    
        else:
            return redirect("/")
    else:
        return render_template('app/login.html/')

#pedidos
@app.route('/dashboard/pedidos')
def pedidos():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return render_template('app/pedidos.html') 
        elif session["nivelrol"] == 2:
            return redirect('/dashboardAdmin')  
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")
    

#registro
@app.route('/registro')
def registro():
    if "usuario_id" in session:
        return redirect("/")
    else:
        return render_template('app/registro.html')

#compras
@app.route('/dashboard/compras')
def compras():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return render_template('app/compras.html')
        elif session["nivelrol"] == 2:
            return redirect('/dashboardAdmin') 
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboardAdmin/datosCuriosos')
def datosCuriosos():
    if "usuario_id" in session:
        if session["nivelrol"] == 2:
            return render_template('app/datosInformativos.html/')
        elif session["nivelrol"] == 1:
            return redirect('/dashboard') 
        else:
            return redirect("/formLogin")
    else:
        return redirect("/formLogin")
  
# a partir de aquí generar sus rutas respectivas, para las páginas estáticas no hace falta agregar rutas siempre y cuando la indexacion
# quede acorde a como se ha ordenado en las carpetas los html
# si alguna ruta no redirige porfavort verificar, usar render_template en vez de send_file en lo posible
# para evitar que cambie las direcciones tal como lo haría con jinja2

#///////////////////////////////////////////Metodos Login (tener cuidado)
#Listar Usuarios
@app.get('/getList/usuarios')
def get_usuarios():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute('SELECT * FROM usuario')
    listadoUsuarios = cur.fetchall()

    cur.close()
    return jsonify(listadoUsuarios)

#Registrar Usuarios
@app.post('/save/usuario')
def create_usuario():
    new_usuario     = request.get_json()
    cedula          = new_usuario['cedula']
    correo          = new_usuario['correo']
    nombres         = new_usuario['nombres']
    fechaNacimiento = new_usuario['fechaNacimiento']
    callePrimaria   = new_usuario['callePrimaria']
    calleSecundaria = new_usuario['calleSecundaria']
    contrasenia     = new_usuario['contrasenia']

    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute('INSERT INTO usuario (cedula, correo, nombres, fechaNacimiento, callePrimaria, calleSecundaria, contrasenia) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING *',
                (cedula, correo, nombres, fechaNacimiento, callePrimaria, calleSecundaria, contrasenia))

    new_usuario_creado = cur.fetchone()
    print(new_usuario_creado)
    conn.commit()
    cur.close()
    conn.close()

    return jsonify(new_usuario_creado)

#Eliminar usuarios
@app.delete('/delete/usuario/<cedula>')
def delete_usuario(cedula):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    
    cur.execute(' DELETE FROM usuario WHERE cedula = %s RETURNING *', (cedula,))
    usuario = cur.fetchone()
    conn.commit()
    
    cur.close()
    conn.close()

    if usuario is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(usuario)

#Actualizar usuario
@app.put('/updateUser/usuario/<cedula>')
def update_usuario(cedula):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    new_usuario = request.get_json()
    cedula          = new_usuario['cedula']
    correo          = new_usuario['correo']
    nombres         = new_usuario['nombres']
    fechaNacimiento = new_usuario['fechaNacimiento']    
    callePrimaria   = new_usuario['callePrimaria']
    calleSecundaria = new_usuario['calleSecundaria']
    contrasenia     = new_usuario['contrasenia']

    cur.execute(' UPDATE usuario SET  correo = %s, nombres = %s, fechaNacimiento = %s, callePrimaria = %s, calleSecundaria = %s, contrasenia = %s WHERE cedula = %s RETURNING *',
                (correo, nombres, fechaNacimiento, callePrimaria, calleSecundaria, contrasenia, cedula))
    update_user = cur.fetchone()

    conn.commit()
    cur.close()
    conn.close()
    if update_user is None:
        return jsonify({'message': 'Usuario not found'}), 404
    return jsonify(update_user)

#Listar usuario por cedula
@app.get('/getUser/usuario/<cedula>')
def get_usuario(cedula):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute('SELECT * FROM usuario WHERE cedula = %s', (cedula,))
    usuario = cur.fetchone()

    if usuario is None:
        return jsonify({'message': 'Usuario not found'}), 404
    return jsonify(usuario)

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        #Recibir los datos del formulario
        cedula      = request.form["cedula"]
        contrasenia = request.form["contrasenia"]

        conn    = get_connection()
        cursor  = conn.cursor()
        cursor.execute("SELECT * FROM usuario WHERE cedula=%s AND contrasenia=%s", (cedula, contrasenia))
        usuario = cursor.fetchone()
        cursor.close()

        # Si los datos son válidos, establecer una sesión para el usuario
        if usuario:
            session["usuario_id"] = usuario[0]
            session["nivelrol"] = usuario[9]
            return redirect("/validateRoute")
        # En caso contrario, devolver un error
        else:
            return redirect("/formLogin")
    return redirect("")
    
@app.route('/validateRoute')
def validate():
    if "usuario_id" in session:
        if session["nivelrol"] == 1:
            return redirect("/dashboard")
        elif session["nivelrol"] == 2:
            return redirect("/dashboardAdmin")
        else:
            return redirect("/")
    else:
        return redirect("/")
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)