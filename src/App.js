import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
import Popular from './components/Popular'
import AccountPage from './components/AccountPage'
import MovieDetails from './components/MovieDetails'
import NotFoundPage from './components/NotFoundPage'

const App = () => (
  <div className="main-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={SearchPage} />
      <ProtectedRoute exact path="/account" component={AccountPage} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="/not-found" component={NotFoundPage} />
    </Switch>
  </div>
)

export default App
