import React, { Component } from 'react'
import SecondaryNav, { Tab } from './components/SecondaryNav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <SecondaryNav>
            <Tab to="/1">Tab</Tab>
            <Tab to="/2">Longer Tab</Tab>
            <Tab to="/3">Really long tab by comparison</Tab>
            <Tab to="/4">Tab</Tab>
          </SecondaryNav>

          <Switch>
            <Route path='/:id' render={props => {
              return (
                <div>
                  rendered link {props.match.params.id}
                </div>
              )
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
