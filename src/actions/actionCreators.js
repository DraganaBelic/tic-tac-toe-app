import { TOGGLE_NEXT_PLAYER, ADD_SELECTED_FIELD, UPDATE_HISTORY, ADD_WINNER } from "./actionType"

export const toggleNextPlayer = (oIsNext) => {
    return {
        type: TOGGLE_NEXT_PLAYER,
        oIsNext: oIsNext
    }
}
export const addSelectedFieldToStore = (selectedField) => {
    return {
        type: ADD_SELECTED_FIELD,
        selectedField: selectedField
    }
}
export function updateHistory(history) {
    return {
      type: UPDATE_HISTORY,
      history: history
    };
  }

  export function addWinner(winner) {
      return {
          type: ADD_WINNER,
          winner: winner
      }
  }