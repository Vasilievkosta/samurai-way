
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Dialogs, { DialogType, MessageType } from 'components/Dialogs/Dialogs';
import Music from 'components/Music/Music';
import { MyPostType } from 'components/Profile/MyPosts/MyPosts';


type PropsType = MyPostType & {
  dialogs: DialogType[]
  messages: MessageType[]

}


function App(props: PropsType) {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />

        <div className="content">
          <Route path='/profile' render={() => <Profile data={props.data} addPost={props.addPost} updateNewPostText={props.updateNewPostText} newPostText={props.newPostText} />} />
          <Route path='/dialogs' render={() => <Dialogs dialogs={props.dialogs} messages={props.messages} />} />

          <Route path='/music' component={Music} />
          <Route path='/news' component={Music} />
          <Route path='/settings' component={Music} />

        </div>

      </div>
    </BrowserRouter>

  )
}

export default App;
