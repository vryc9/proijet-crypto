import { useState } from 'react';
import NavBar from '../../components/navbar/NavBar'
import PasswordService from '../../services/passwordService';
import './password.scss'
import { useNavigate } from 'react-router-dom';

function Password(){
    const navigate = useNavigate(); 
    const navigateCreate = () => {
        console.log("triggered");
        navigate('/addpassword')
    }

    let passwords = PasswordService.getPasswords();

    const removePassword = (password) => (e) => {
        e.preventDefault();
        PasswordService.removePassword(password);
        window.location.reload();
    }

    return(
        <div className="password">
            <NavBar></NavBar>
            <div className="content">
                <h1>Liste des mots de passe</h1>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Site</th>
                                <th>Nom d'utilisateur</th>
                                <th>Mot de passe</th>
                                <th>Supprimer</th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passwords.map((password, index) =>(
                                <tr key={index}>
                                    <td>{password.website}</td>
                                    <td>{password.username}</td>
                                    <td>{password.website}</td>
                                    <td><button onClick={removePassword(password)}>Supprimer</button></td>
                                    <td><button onClick={removePassword(password)}>Modifier</button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <a href="" onClick={navigateCreate}>Ajouter mot de passe</a>
            </div>
            
        </div>
    )
}

export default Password;
