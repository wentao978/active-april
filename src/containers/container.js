import React from 'react'
import {connect} from 'react-redux'
import Content from '../components/content'
import {increaseAction} from '../actions/action'

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        num: state.num
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction),
        onRequestClick: () => dispatch(requestAction)
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)

export default App