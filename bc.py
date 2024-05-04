from flask import Flask, render_template, redirect, url_for, request, session
import pyodbc

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'


def conectar_bc():
    server = 'LAPTOP-72I3MJPC\SQLEXPRESS'
    database = 'loja_funcional'
    driver = '{SQL Server}'
    return pyodbc.connect(f'DRIVER={driver};SERVER={server};DATABASE={database};')


@app.route('/')
def home():
    return render_template('login.html')


@app.route('/cad')
def cad():
    return render_template('cadastro.html')


@app.route('/success')
def success():
    if 'username' in session:
        return render_template('index.html', name=session['username'], email=session['email'])
    else:
        return redirect(url_for('home'))


@app.route('/fail')
def fail():
    return render_template('login.html', teste=True)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['nm']
        senha = request.form['pass']

        cnxn = conectar_bc()
        cursor = cnxn.cursor()

        # Executar consulta SQL para verificar as credenciais
        cursor.execute(f"SELECT Nome, email FROM Clientes WHERE Usuario=? AND senha=?", (user, senha))
        row = cursor.fetchone()

        # Se as credenciais estiverem corretas, criar sessão e redirecionar para a página de sucesso
        if row:
            session['username'] = user
            session['email'] = row[1]
            return redirect(url_for('success'))
        else:
            return redirect(url_for('fail'))

    return redirect(url_for('home'))


@app.route('/cadastro', methods=['POST'])
def cadastro():
    nome = request.form['Nome']
    user = request.form['nm']
    senha = request.form['pass']
    email = request.form['email']


    cnxn = conectar_bc()
    cursor = cnxn.cursor()

    # Executar consulta SQL para inserir novo usuário
    cursor.execute("INSERT INTO Clientes (Nome, Usuario, email, senha) VALUES (?,?,?,?)", (nome, user, email, senha))
    cnxn.commit()
    
    session['username'] = user
    session['email'] = email
    return redirect(url_for('success'))



app.run(debug=True)
