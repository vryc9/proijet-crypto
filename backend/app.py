from flask import Flask, jsonify, request
import pymysql
from extensions import db
from dao.dao_user import UserDAO
from dotenv import load_dotenv
from dao.dao_vault import VaultDao
import os

pymysql.install_as_MySQLdb()
load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Route ici : 

#TODO : Supprimer les routes ce sont des exemples
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = UserDAO.add_user(data['username'], data['password'])
    return jsonify({'id': user.id, 'username': user.username}), 201

#TODO : Same
@app.route('/users', methods=['GET'])
def get_all_users():
    users = UserDAO.get_all_users()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])


@app.route('/vaults', methods=['POST'])
def create_vault():
    data = request.get_json()
    vault = VaultDao.add_vault(data['password'], data['website'], data['username'])
    return jsonify({'id': vault.id, 'password': vault.password, 'website': vault.website, 'username': vault.username}), 201




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)