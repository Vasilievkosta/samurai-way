import React, { Suspense, lazy } from 'react'
import './App.css'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HeaderContainer from 'components/Header/HeaderContainer'
import Music from 'components/Music/Music'

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
            <HashRouter>
                <div className="App">
                    <HeaderContainer />
                    <Navbar />

                    <div className="content">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to={'/profile'} />} />
                                <Route path="/dialogs" render={() => <DialogsContainer />} />
                                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                                <Route path="/users" render={() => <UsersContainer />} />

                                <Route path="/music" component={Music} />
                                <Route path="/settings" render={() => <h2>Settings</h2>} />
                                <Route path="/login" component={Login} />

                                <Route path="*" render={() => <h2>404</h2>} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </HashRouter>
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
