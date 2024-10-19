# Password Manager 🔏

Bienvenue sur le projet **Password Manager 🔏**

## Tables des matières
- [Mise en place](#mise-en-place)
- [Installation](#installation)
- [Lancer l'application](#lancer-l'application)
- [Structure du projet](#project-structure)
- [Contributing](#contributing)

## #mise-en-place
Suivre les instructions suivantes pour récupérer et lancer le projet sur votre machine 

### Prerequis

Installez les dépendances suivantes sur votre machine
- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/) 

### Installation

1. **Cloner le repo**:
    ```bash
    git clone https://github.com/vryc9/password-manager.git
    cd password-manager
    ```

2. **Créer un environnment vituel**:
    ```bash
    python3 -m venv venv
    ```

3. **Activer l'environnement virtuel**:
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```

4. **Installer les dépendances**:
    ```bash
    pip install -r requirements.txt
    ```

### Lancer l'application
une fois les dépendances installées, lancez l'application : 

1. **Executer la commande**:
    ```bash
    python app.py
    ```

2. **Ouvrez votre navigateur** et se rendre à `http://127.0.0.1:5000/`.

Félicitation ! 🎉 Le projet est lancé sur votre machine ! .

### Project Structure
Ci dessus, vous trouverez une structure du projet.

```bash
password-manager/
├── static/            # Static files (CSS, JS, images, fonts)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/         # HTML templates
│   └── index.html
├── venv/              # Virtual environment
├── app.py             # Main application file
├── requirements.txt   # Python dependencies
└── README.md          # Project documentation (this file)