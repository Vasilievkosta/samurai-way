import React, { Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HeaderContainer from 'components/Header/HeaderContainer'
import Music from 'components/Music/Music'
import News from 'components/News/News'
import UsersContainer from 'components/Users/UsersContainer'
import Login from 'components/Login/Login'
import { connect } from 'react-redux'
import { initializeApp } from 'redux/app-reducer'
import { AppStateType } from 'redux/redux-store'
import Preloader from 'components/common/Preloader/Preloader'

import ProfileContainer from 'components/Profile/ProfileContainer'

const DialogsContainer = lazy(() => import('components/Dialogs/DialogsContainer'))
// const ProfileContainer = lazy(() => import('components/Profile/ProfileContainer'))

class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <HeaderContainer />
                    <Navbar />

                    <div className="content">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route path="/dialogs" render={() => <DialogsContainer />} />

                            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

                            <Route path="/users" render={() => <UsersContainer />} />

                            <Route path="/news" component={News} />
                            <Route path="/music" component={Music} />
                            <Route path="/settings" component={Music} />

                            <Route path="/login" component={Login} />
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type MapStatePropsType = {
    initialized: boolean
}
export type PropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
    }
}

export default connect(mapStateToProps, { initializeApp })(App)
