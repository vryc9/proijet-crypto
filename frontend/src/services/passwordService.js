
class PasswordService {
    endpoint = "/password";

    savePasswordToVault(callback) {
        let xhr = new XMLHttpRequest();

        let body = {

        };

        xhr.addEventListener('load', callback);
        xhr.open('POST', 'https://localhost:80/vault/save');
        xhr.send(body);
    }
}

export default PasswordService;