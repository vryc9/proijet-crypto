
class PasswordService {
    endpoint = "/password";

    static savePasswordToVault(callback) {
        let xhr = new XMLHttpRequest();
        let body = JSON.stringify(callback)
        xhr.addEventListener('load', callback);
        xhr.open('POST', 'http://127.0.0.1:5000/vaults');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body) ;
    }
}

export default PasswordService;