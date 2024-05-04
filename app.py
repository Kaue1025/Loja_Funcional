
from flask import Flask, render_template, redirect, url_for, request, session

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'
diclogin = {}

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
        
        # Lendo dados do arquivo e preenchendo o dicionário
        with open('info.txt') as arquivo:
            for linha in arquivo:
                linha_list = linha.strip().split('/')
                diclogin[linha_list[0]] = {'senha': linha_list[1], 'email': linha_list[2]}

        if user in diclogin and senha == diclogin[user]['senha']:
            session['username'] = user
            session['email'] = diclogin[user]['email']  # Adicionar email à sessão
            return redirect(url_for('success'))
        else:
            return redirect(url_for('fail'))
    return redirect(url_for('home'))

@app.route('/cadastro', methods=['POST'])
def cadastro():
    user = request.form['nm']
    senha = request.form['pass']
    email = request.form['email']
    with open('info.txt', 'a') as arquivo:
        arquivo.write(f"\n{user}/{senha}/{email}")
    session['username'] = user
    session['email'] = email  # Adicionar email à sessão
    return redirect(url_for('success'))


app.run(debug=True)
