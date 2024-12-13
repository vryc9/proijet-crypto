from flask import Flask, jsonify, request
import os
from flask_cors import CORS
import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import base64
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.hazmat.backends import default_backend
import bcrypt

private_key_pem = """
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGOFm4RnyM1fjwkN8uDImOppetjOah7z4xhM87kJrZiTi/DoJEFz
Q3q1TnZwn/Qc5QKBxIDRPqxUkXjDJgH/tazjPHHnkEdtDI++SvqPGX3iqUe85LnC
XvCr6CNygxPcm8558pQQY1KVAUtslocDkMBHCWIXgC10t+i+5s/wHOPBAgMBAAEC
gYA0gE5Laii/VxLw9t/S/1/UAbMh3rqS+5wovKeyTM28eNHRU9WUhYbqm+z5hG6N
bBTP3r9YKYqDhNV9PI23bjtbgImlAUpTrREKbMJl6P4Jhhlv6sPu1y79rhzN5Uaa
E1jlotkTzfNIeLWeV+K9t13+10fEY1LC3WeFJQEwjXXewQJBALTGkK7rHpLy6qav
pitS9qghZTR2ULKre9M3JM6DEx/mnLq+7CWX42Dlim+BkdVrzZqT2aj5yxkVrHPt
2HTWLikCQQCM71k8YczLdp0apsABcUhLtbZEQCn+zCjFRdtuWY8mjpvk3wf0dQEn
9tOdadyxPsvCpXF78OX3aq6WM3WIdAvZAkBJeY9i2QODPKJs/2VtpHnGWlR1H0Wr
aRGaBoa6PQIv7B51tJXsrbBoOMOskKBCe1+E3WURTf3jgzClqd1Zl5gJAkBKh+En
H4lQKCAZEgoEOUZEU4paOZx71LfS64iJqO8dMtmahaANVTsRSWTLoEpHqa/T9e43
30OePlqpr/j9+nCxAkEAlLsvN0Mk5pbcMPRe1WOpG84TS3QMgH38mFskFlk7zQBc
M8LnKm9Rq1KUkvqMFAWN88wSs8l0bgm1aydcONM3FA==
-----END RSA PRIVATE KEY-----
"""

private_key = load_pem_private_key(
    private_key_pem.encode(),
    password=None, 
    backend=default_backend()
)

app = Flask(__name__)
CORS(app)

def decrypt_password(encrypted_password):
    encrypted_data = base64.b64decode(encrypted_password)
    decrypted_password = private_key.decrypt(
        encrypted_data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted_password.decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())
    
@app.route('/vaults', methods=['POST'])
def create_vault():

    data = request.get_json()
    decrypted_password = decrypt_password(data['password'])
    print(decrypted_password)
    
    return jsonify({
        data
    }), 201
    
@app.route('/auth', methods=['POST'])
def connexion():
    data = request.json
    clear_password = data.get("clear_password")
    hashed_password = data.get("hash_password")
    is_valid = verify_password(clear_password, hashed_password)
    return jsonify({"is_valid": is_valid})

if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)