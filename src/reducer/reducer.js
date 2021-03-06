import { TOGGLE_NEXT_PLAYER, ADD_SELECTED_FIELD, UPDATE_HISTORY, ADD_RESULT } from "../actions/actionType";

const reducer = (store = {}, action) => {

    switch(action.type) {
        case TOGGLE_NEXT_PLAYER:
            let oIsNext= action.oIsNext
            return {...store, oIsNext}
        break
        case ADD_SELECTED_FIELD:
            let selectedField = action.selectedField
            return {...store, selectedField}
        break
        case UPDATE_HISTORY:
            let history = action.history
            return {...store, history}
        break
        case ADD_RESULT:
            let result = action.result
            return {...store, result}
        break

            default:
                return store
    }
}

export default reducer