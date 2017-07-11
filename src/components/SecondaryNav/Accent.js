import styled, { css } from 'styled-components'
import { animationDuration } from './../../config'

const AccentHeight = 4
const Accent = styled.div`
  background-color: #4e8f8d;
  position: absolute;
  height: ${AccentHeight}px;
  transition: left ${animationDuration}ms ease-in-out,
              width ${animationDuration}ms ease-in-out;

  width: 100%;
  bottom: 0;
  left: 0;
  display: none;

  ${props => props.backgroundColor && css`
    background-color: ${props.backgroundColor};
  `}

  ${props => props.isDisplayed && css`
    display: block;
  `}

  ${props => props.width && css`
    width: ${props.width}px;
  `}

  ${props => props.top && css`
    top: ${props.top - AccentHeight}px;
  `}

  ${props => props.left && css`
    left: ${props.left}px;
  `}
`

export default Accent
