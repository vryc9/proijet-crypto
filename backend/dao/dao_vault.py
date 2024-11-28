from models.vault import Vault
from extensions import db

class VaultDao : 
    
    def add_vault(password, website, username) -> Vault :
        user = Vault(password=password, website=website, username=username)
        db.session.add(user)
        db.session.commit()
        return user    
    
    