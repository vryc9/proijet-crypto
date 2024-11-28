from extensions import db

class Vault(db.Model) : 
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), unique=False, nullable=False)
    website = db.Column(db.String(255), unique=False, nullable=False) 
    username = db.Column(db.String(255), unique=False, nullable=False)
