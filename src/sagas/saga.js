import { takeEvery } from 'redux-saga'
import { put , call } from 'redux-saga/effects'

import * as usersService from '../services/service';

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
    console.log("watchIncrementAsync  start");
    const data = yield call(usersService.search,{some:'12314'})

    yield put({ type: 'INCREMENT_IF_ODD' , payload:data })

    console.log("watchIncrementAsync end",data);
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
    console.log("async start");
    yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
    console.log("async end");
}

export function* helloSaga() {
    console.log('Hello Sagas!');
}

/*好吧，该解释一下了。首先我们创建一个工具函数 delay，用于返回一个延迟 1 秒再 resolve 的 Promise。 我们将使用这个函数去 阻塞 Generator。

 Sagas 被实现为 Generator 函数，它 yield 对象到 redux-saga middleware。 被 yield 的对象都是一类指令，指令可被 middleware 解释执行。当 middleware 取得一个 yield 后的 Promise，middleware 会暂停 Saga，直到 Promise 完成。 在上面的例子中，incrementAsync 这个 Saga 会暂停直到 delay 返回的 Promise 被 resolve，这个 Promise 将在 1 秒后 resolve。

 一旦 Promise 被 resolve，middleware 会恢复 Saga 去执行下一个语句（更准确地说是执行下面所有的语句，直到下一个 yield）。 在我们的情况里，下一个语句是另一个 yield 后的对象：调用 put({type: 'INCREMENT'}) 的结果。 意思是 Saga 指示 middleware 发起一个 INCREMENT 的 action。

 put 就是我们所说的一个调用 Effect 的例子。Effect 是一些简单 Javascript 对象，对象包含了要被 middleware 执行的指令。 当 middleware 拿到一个被 Saga yield 后的 Effect，它会暂停 Saga，直到 Effect 执行完成，然后 Saga 会再次被恢复。

 总结一下，incrementAsync Saga 通过 delay(1000) 延迟了 1 秒钟，然后发起了一个 INCREMENT 的 action。

 接下来，我们创建了另一个 Saga watchIncrementAsync。这个 Saga 将监听所有发起的 INCREMENT_ASYNC action，并在每次 action 被匹配时派生一个新的 incrementAsync 任务。 为了实现这个目的，我们使用一个辅助函数 takeEvery 来执行以上的处理过程。*/