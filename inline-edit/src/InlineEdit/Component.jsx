// @ts-nocheck
import React, { Component } from "react"
import Spinner from 'react-spinner'
import './Spinner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

const successStyle = { color: 'green' }
const errorStyle = { color: 'red' }

const Result = (props) => {
  const { result } = props
  if (!result) return null
  return result.success ? <FontAwesomeIcon style={ successStyle } icon={ faCheck } /> : <FontAwesomeIcon style={ errorStyle } icon={ faTimes } />
}

export class InlineEdit extends Component {
  constructor(props) {
    super(props)
    const initialText = props.text || 'Hello World'
    this.state = {
      initialText,       
      text: initialText,
      editable: false
    }
  }

  onClickText = (e) => {
    this.setState({
      ...this.resetState,
      editable: true,
    })
  }

  get resetState() {
    return {
      editable: false,
      confirmed: false,
      result: null,
      errorMsg: ''
    }    
  }

  onKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.onConfirm()
    }
  }

  onReset = () => {
    this.setState(this.resetState)
  }

  onConfirm = () => {
    this.setState({
      confirmed: true,
      editable: false
    })

    setTimeout(() => {
      const rand = Math.random()
      const result = rand > 0.3 ? { success: true } : { error: 'Oops! Something has gone terribly wrong' }
      result.error ? this.handleError(result) : this.handleSuccess(result)
    }, 1000)
  }

  handleSuccess(result) {
    this.setState({
      result
    })
  }

  handleError(result) {
    const text = this.state.initialText
    this.setState({
      ...this.resetState,      
      text,
      result,
      errorMsg: result.error
    })
  }

  get border() {
    const { editable } = this.state
    return editable ? '1px solid' : ''
  }

  get textStyle() {
    const { border } = this
    return { flex: 1, border, paddingLeft: '1em', marginRight: '2em', paddingRight: '1em', display: 'inline-block' }
  }

  get spinnerContainerStyle() {
    return { flex: 1, width: '2em', height: '1em', display: 'inline-block' }
  }

  get containerStyle() { 
    return { flexDirection: 'row', marginTop: '2em' }
  }

  get errorMsgStyle() {
    return { color: 'red'  }
  }

  onInputChange = (e) => {
    const { value } = e.target
    this.setState({
      text: value
    })
  }

  render() {
    const { textStyle, spinnerContainerStyle, containerStyle, errorMsgStyle } = this
    const { state, onClickText, onConfirm, onInputChange, onKeyPress } = this
    const { text, confirmed, editable, result, errorMsg } = state || {}
    return (
      <div style={ containerStyle }>
        { editable ? 
          <input style={ textStyle } value={text} onKeyPress={ onKeyPress } onChange={ onInputChange } onBlur={ onConfirm } ></input> : 
          <div style={ textStyle } onClick={ onClickText }>{ text }</div> 
        }
        <div style={ spinnerContainerStyle }>{ confirmed && !result ? <Spinner /> : <Result result={ result } /> } </div>
        { errorMsg ? <div style={ errorMsgStyle }>{ errorMsg }</div> : null }
      </div>      
    )
  }
}