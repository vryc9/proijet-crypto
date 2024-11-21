from extensions import db
from models.model import User

#TODO : A supprimer c'est un exemple de DAO
class UserDAO:
    @staticmethod
    def add_user(username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_all_users():
        return User.query.all()
