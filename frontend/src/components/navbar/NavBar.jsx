import logo from '../../assets/logo.png'
import './navbar.scss'

function NavBar() {

  return (
    <div id="navbar">
        <div className="container">
            <div className="sub-container">
                <div className="left sub-div">
                    <img src={logo}/>
                    <label className="title">Password Manager</label>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar
