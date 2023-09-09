import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Music from 'components/Music/Music'
import DialogsContainer from 'components/Dialogs/DialogsContainer'
import UsersContainer from 'components/Users/UsersContainer'
import ProfileContainer from 'components/Profile/ProfileContainer'

// export type RootStateType = {
//   profilePage: ProfileStateType
//   dialogsPage: DialogsStateType
// }

// export type PropsType = {
//   state: RootStateType
//   dispatch: (action: ActionType) => void
// }

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Navbar />

                <div className="content">
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

                    <Route path="/dialogs" render={() => <DialogsContainer />} />

                    <Route path="/music" component={Music} />
                    <Route path="/news" component={Music} />
                    <Route path="/settings" component={Music} />
                    <Route path="/users" component={UsersContainer} />
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
