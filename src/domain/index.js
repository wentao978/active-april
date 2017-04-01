'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore , applyMiddleware} from 'redux'
import { Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from '../sagas/saga'
import counter from '../reducers/reducer'
import App from '../containers/container'
import './size'
import '../style/base.scss'
import '../style/style.scss'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(counter,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchIncrementAsync)

const getValueFromStore = (arg) => store.getState()[arg];
const action = type => store.dispatch({type})

//主动触发请求数据
action('INCREMENT_ASYNC');

ReactDOM.render(
    <Provider store={store}>
        <App
            num={getValueFromStore('num')}
        />
    </Provider>,
    document.getElementById('app')
)





