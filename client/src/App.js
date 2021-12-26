import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Components
import Home from './components/Home'
import Navbar from './components/common/Navbar'

// Images
// import spinningFootball from './images/spinningFootball.gif'

function App() {
  return(
    <div className="site-wrapper">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App