# Password Manager 🔏

Bienvenue sur le projet **Password Manager 🔏**

## Tables des matières
- [Mise en place](#mise-en-place)
- [Installation](#installation)
- [Lancer l'application](#lancer-lapplication)
- [Structure du projet](#structure-du-projet)
- [Contributeur](#contributeur)

## Mise en place
Suivre les instructions suivantes pour récupérer et lancer le projet sur votre machine 

### Prérequis

Installez les dépendances suivantes sur votre machine :
- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/) 

### Installation

1. **Cloner le repo**:
    ```bash
    git clone https://github.com/vryc9/password-manager.git
    cd password-manager
    ```

2. **Créer un environnement virtuel**:
    ```bash
    python3 -m venv venv
    ```

3. **Activer l'environnement virtuel**:
    - Sur macOS/Linux :
      ```bash
      source venv/bin/activate
      ```
    - Sur Windows :
      ```bash
      venv\Scripts\activate
      ```

4. **Installer les dépendances** :
    ```bash
    pip install -r requirements.txt
    ```

### Lancer l'application
Une fois les dépendances installées, lancez l'application :

1. **Exécuter la commande** :
    ```bash
    python app.py
    ```

2. **Ouvrez votre navigateur** et rendez-vous à `http://127.0.0.1:5000/`.

Félicitations ! 🎉 Le projet est lancé sur votre machine ! 

### Structure du projet
Ci-dessous, vous trouverez la structure du projet.

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
```

## Contributeur
- [Mathieu Baille](https://github.com/Picsor)
- [Alexis Flan](https://github.com/GaRmirW-oR)
- [Quentin Marty](https://github.com/Propleek)
- [Enzo Volpato](https://github.com/vryc9)