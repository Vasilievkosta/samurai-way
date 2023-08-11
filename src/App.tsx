
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Dialogs from 'components/Dialogs/Dialogs';
import Music from 'components/Music/Music';
import { ActionType } from './redux/redux-store';
import { ProfileStateType } from 'redux/profile-reducer';
import { DialogsStateType } from 'redux/dialogs-reducer';


export type RootStateType = {
  profilePage: ProfileStateType
  dialogsPage: DialogsStateType
}

export type PropsType = {
  state: RootStateType
  dispatch: (action: ActionType) => void
}

const App: React.FC<PropsType> = (props) => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />

        <div className="content">
          <Route path='/profile' render={() => <Profile
            // posts={state.profilePage.posts}            
            // newPostText={state.profilePage.newPostText}
            dispatch={props.dispatch}
            state={props.state}
          />} />

          <Route path='/dialogs' render={() => <Dialogs
            dispatch={props.dispatch}
            state={props.state}
          />} />

          <Route path='/music' component={Music} />
          <Route path='/news' component={Music} />
          <Route path='/settings' component={Music} />

        </div>

      </div>
    </BrowserRouter>

  )
}

export default App;
