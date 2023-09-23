import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HeaderContainer from 'components/Header/HeaderContainer'
import Music from 'components/Music/Music'
import News from 'components/News/News'
import DialogsContainer from 'components/Dialogs/DialogsContainer'
import UsersContainer from 'components/Users/UsersContainer'
import ProfileContainer from 'components/Profile/ProfileContainer'
import Login from 'components/Login/Login'

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer />
                <Navbar />

                <div className="content">
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

                    <Route path="/dialogs" render={() => <DialogsContainer />} />

                    <Route path="/users" render={() => <UsersContainer />} />

                    <Route path="/news" component={News} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Music} />

                    <Route path="/login" component={Login} />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
