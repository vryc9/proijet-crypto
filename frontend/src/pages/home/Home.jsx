// import logo from '../../assets/logo.svg'
import NavBar from '../../components/navbar/NavBar'
import './home.scss'

function Home() {

  return (
    <div id="home">
      <NavBar></NavBar>
      <div className="body">
        <div className="content">
          <form action="#" className="loginForm" method="POST">
            <h1><center>Login Here</center></h1>
            <div className="inputs">
              <div className="input">
                <label htmlFor="username">Username</label>
                <input type="text" name='username'/>
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" name='password'/>
              </div>
            </div>
            <button id='log-in-btn'>Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
