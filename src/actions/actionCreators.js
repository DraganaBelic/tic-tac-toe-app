import { TOGGLE_NEXT_PLAYER, ADD_SELECTED_FIELD, UPDATE_HISTORY, ADD_RESULT } from "./actionType"

export const toggleNextPlayer = (oIsNext) => {
    return {
        type: TOGGLE_NEXT_PLAYER,
        oIsNext
    }
}
export const addSelectedFieldToStore = (selectedField) => {
    return {
        type: ADD_SELECTED_FIELD,
        selectedField
    }
}
export function updateHistory(history) {
    return {
      type: UPDATE_HISTORY,
      history
    };
  }

  export function addResult(result) {
      return {
          type: ADD_RESULT,
          result
      }
  }