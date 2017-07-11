import React, { Component } from 'react'
import styled from 'styled-components'
import AnimationAccent from './AnimationAccent'
import { matchPath, withRouter } from 'react-router-dom'

const TOP = 'accentTop'
const LEFT = 'accentLeft'
const OFFSET_LEFT = 'containerOffsetLeft'
const WIDTH = 'accentWidth'

const Container = styled.div`
  position: relative;
  margin-left: 30px;
`

const List = styled.ul`
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  display: inline-block;
  position: relative;
`

class SecondaryNav extends Component {
  state = {
    isAccentDisplayed: true,
    [TOP]: NaN,
    [LEFT]: NaN,
    [OFFSET_LEFT]: NaN,
    [WIDTH]: NaN,
  }
 
  setAccentPosition ({ height, left, width }) {
    this.setState({
      [LEFT]: left,
      [TOP]: height,
      [WIDTH]: width,
    })
  }

  setAccentDisplay = isDisplayed => {
    this.setState({
      isAccentDisplayed: isDisplayed
    })
  }

  componentDidMount () {
    this.setState({
      [OFFSET_LEFT]: this.container.getBoundingClientRect().left
    })
  }
  
  render () {
    return (
      <Container innerRef={container => { this.container = container }}>
        <List>
          { React.Children.map(this.props.children, (child, key) => {
            return (
              <ListItem key={key}>
                { React.cloneElement(
                    child,
                    {
                      active: matchPath(this.props.location.pathname, {
                        path: child.props.to,
                        exact: child.props.exact,
                        strict: child.props.strict
                      }),
                      isDisplayed: this.state.isAccentDisplayed,
                      getBoundingBox: boundingBox => {
                        this.setAccentPosition(boundingBox)
                      },
                      onClick: () => {
                        this.props.history.push(child.props.to)
                      }
                    }
                ) }
              </ListItem>
            )
          }) }
        </List>

        <AnimationAccent
          setAccentDisplay={this.setAccentDisplay}
          top={this.state[TOP]}
          left={this.state[LEFT]}
          offsetLeft={this.state[OFFSET_LEFT]}
          width={this.state[WIDTH]}
        />
      </Container>
    )
  }
}

export default withRouter(SecondaryNav)
