import React, { Component } from 'react'
import Accent from './Accent'
import { animationDuration } from './../../config'

const DEBOUNCE_FN_MAP = new WeakMap()

class AnimationAccent extends Component {
  state = {
    isAnimating: false,
    left: NaN,
    top: NaN,
    width: NaN,
  }

  timerList = []

  componentWillMount () {
    this.setState({
      left: this.props.left,
      top: this.props.top,
      width: this.props.width,
    })
  }

  debounce = (fn, delay, ...args) => {
    if (!DEBOUNCE_FN_MAP.has(fn)) {
      DEBOUNCE_FN_MAP.set(fn)

      setTimeout(() => {
        DEBOUNCE_FN_MAP.delete(fn)
      }, delay)

      fn(...args)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // first update only this `prevProps.left` will be `NaN`
    if (Number.isNaN(prevProps.left)) {
      const { left, offsetLeft, top, width } = this.props

      this.setState({
        left: left - offsetLeft,
        top,
        width,
      })
    } else if (prevProps.left !== this.props.left) {
      const { left, offsetLeft, top, width } = prevProps

      this.debounce(this.props.setAccentDisplay, 50, false)
      this.debounce(this.animate, 50, { left: left - offsetLeft, top, width })
    }
  }

  animate = ({ left, top, width }) => {
    let timer

    while (timer = this.timerList.pop()) {
      clearInterval(timer)
    }

    this.setState({
      isAnimating: true,
      left,
      top,
      width,
    })

    requestAnimationFrame(() => {
      const { left, offsetLeft, top, width } = this.props

      this.setState({
        left: left - offsetLeft,
        top,
        width,
      })

      this.timerList.push(setTimeout(() => {
        this.props.setAccentDisplay(true)
        this.setState({
          isAnimating: false
        })
      }, animationDuration))
    })
  }

  render () {
    const {
      isAnimating,
      left,
      top,
      width
    } = this.state

    return (
      <Accent
        isDisplayed={isAnimating}
        left={left}
        top={top}
        width={width}
      />
    )
  }
}

export default AnimationAccent
