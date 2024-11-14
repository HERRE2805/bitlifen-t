# -*- coding: utf-8 -*-


from flask import Flask, render_template
from flask import (
    Flask,

    render_template,
    request,
    flash,
    
    session,

    redirect,
    url_for,

)

import bcrypt
from flask_mysqldb import MySQL



app = Flask(__name__)
app.config["SECRET_KEY"] = "cardiaco"
app.config['TIMEZONE'] = 'America/Bogota'

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "Jorfar2003"
app.config["MYSQL_DB"] = "cardiaco"
semilla = bcrypt.gensalt()


mysql = MySQL(app)






# Ruta principal
@app.route('/')
def home():
    return render_template("index.html")
@app.route('/bot')
def bot():
    return render_template('bot.html')
@app.route('/edu')
def edu():
    return render_template('p-edu.html')
@app.route('/user')
def user():
    return render_template('usuario.html')

@app.route('/login')
def log():
    return render_template('login.html')
@app.route('/singup')
def singup():
    return render_template('singup.html')
@app.route('/logout')
def salir():
    session.clear()
    return redirect(url_for('home'))

@app.route("/addusers", methods=["POST", "GET"])
def addusers():
    if request.method == "GET":
        
        return render_template("index.html")
    else:
        if request.method == "POST":
            
            email = request.form["email"]
            nombre = request.form["nombre"]
            apellido = request.form["apellido"]
           
            password = request.form["clave"]
            otraclave = request.form["otraclave"]
            peso = request.form["peso"]
            edad = request.form["edad"]
            enfermedades = request.form["enfermedades"]
            enfam= request.form["enfermedades_familiar"]
   
          
            
            link = mysql.connection.cursor()
            
            link.execute("SELECT * FROM usuarios WHERE email=%s", [email])
            maiilusuario =link.fetchone()
           
            if maiilusuario!=None:
                flash("El email ya existe", "alert-warning")
                return redirect("/singup")
            if password != otraclave:
                flash("La confirmación del Password no coincide", "alert-warning")
                return redirect("/singup")
            
            password_encode = password.encode("utf-8")
            password_encriptado = bcrypt.hashpw(password_encode, semilla)
            cur = mysql.connection.cursor()
            cur.execute("""
    INSERT INTO usuarios (email, nombre, apellido, clave,  peso, edad, enfermedades, enfermedades_familiar) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
""", (email, nombre, apellido, password_encriptado, peso, edad, enfermedades, enfam))

            mysql.connection.commit()
            cur.close()
            link.close()
            print("holaaa")
           

      
    
            flash(
                "Usuario registrado correctamente"
            )
            return redirect('/singup')

    return render_template("singup.html")



@app.route("/autenticar", methods=["POST", "GET"])
def autenticar():
    if request.method == "GET":
        if "usuario" in session:   
            return render_template("index.html")
        else:
            return render_template("login.html")
    else:
   
        if request.method == "POST":
            username = request.form["correo"]
            Password = request.form["clave"]
            password_encode = Password.encode("utf-8")
            link = mysql.connection.cursor()
            sql = "SELECT * FROM usuarios WHERE email = %s"
            link.execute(sql, [username])
            usuario = link.fetchone()
            link.close()
            if usuario != None:
                password_encriptado_encode =usuario[4].encode()
                if bcrypt.checkpw(password_encode, password_encriptado_encode):
                    # Registra la sesión
                    session["nombres"] = usuario[1]
                    session["apellidos"] = usuario[2]
                    session["correo"] = usuario[3]
                    session["peso"] = usuario[5]
                    session["edad"] = usuario[6]
                    session["enfermedades"] = usuario[7]
                    session["enfermedades_familiar"] = usuario[8]
                    return redirect("/")
                else:
                    flash("El password no es correcto", "alert-warning")
                    return redirect("/login")
            else:
                flash("Usuario no existe", "alert-warning")
                return redirect("/login")












if __name__ == '__main__':
    app.run(debug=True)

