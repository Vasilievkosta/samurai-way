
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Dialogs from 'components/Dialogs/Dialogs';
import Music from 'components/Music/Music';
import { StoreType } from 'redux/state';

type PropsType = {
  store: StoreType
}

const App = (props: PropsType) => {

  const state = props.store.getState()

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />

        <div className="content">
          <Route path='/profile' render={() => <Profile
            data={state.posts}
            dispatch={props.store.dispatch.bind(props.store)}
            newPostText={state.newPostText}
          />} />

          <Route path='/dialogs' render={() => <Dialogs
            dialogs={state.dialogsPage.dialogs}
            messages={state.dialogsPage.messages}
            newMessageBody={state.dialogsPage.newMessageBody}
            dispatch={props.store.dispatch.bind(props.store)}
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
