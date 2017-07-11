import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { animationDuration } from './../../config'
import Accent from './Accent'

const StyledTab = styled.div`
  font-family: sans-serif;
  background: #beefed;
  padding: 20px 40px;
  transition: background ${animationDuration}ms ease-in-out;

  &:hover {
    background: #aedfdd;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    padding: 20px 30px;
  }

  ${props => props.active && css`
    background: #9ecfcd;
  `}
`

class Tab extends Component {
  componentWillMount () {
    window.addEventListener(
      'resize',
      this.broadcastActiveBindingBox
    )
  }

  componentWillUnmount () {
    window.removeEventListener(
      'resize',
      this.broadcastActiveBindingBox
    )
  }
  
  componentDidMount () {
    this.broadcastActiveBindingBox()
  }
  
  broadcastActiveBindingBox = () => {
    if (this.props.active) {
      this.broadcastBindingBox()
    }
  }
  
  broadcastBindingBox = () => {
    this.props.getBoundingBox(this.tab.getBoundingClientRect())
  }

  onClick = e => {
    this.broadcastBindingBox()
    this.props.onClick()
  }
  
  render () {
    const isDisplayed = this.props.active && this.props.isDisplayed

    return (
      <StyledTab
        active={this.props.active}
        innerRef={tab => { this.tab = tab }}
        onClick={this.onClick}
      >
        { this.props.children }
        <Accent isDisplayed={isDisplayed} />
      </StyledTab>
    )
  }
}

export default Tab
