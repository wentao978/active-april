export default function counter(state = {num:3}, action) {
    console.log("action.payload",action.payload);
    switch (action.type) {
        case 'INCREMENT':
            const num = action.payload.total
            return {...state,num:num}
        case 'INCREMENT_IF_ODD':
            const num2 = action.payload.total
            return {...state,num:num2}
        case 'DECREMENT':
            return {...state,num:-1}
        default:
            return {...state,num:3}
    }
}
