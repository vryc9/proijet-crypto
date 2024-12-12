import NavBar from '../../components/navbar/NavBar'
import './password.scss'
import { useNavigate } from 'react-router-dom';

function Password(){
    const navigate = useNavigate(); 
    const navigateCreate = () => {
        console.log("triggered");
        navigate('/addpassword')
    }

    let passwords = [{  username:"oui",
                        password:"non",
                        site:"tg.com"
                    },
                    {   username:"oui",
                        password:"non",
                        site:"tg.com"
                    }];

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
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passwords.map((password, index) =>(
                                <tr key={index}>
                                    <td>{password.username}</td>
                                    <td>{password.password}</td>
                                    <td>{password.site}</td>
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

export default Password