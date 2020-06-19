export function setToLocalStorage(localStorageObject) {

    localStorage.setItem('selectedFields', localStorageObject.selectedFields)
    localStorage.setItem('history', localStorageObject.history)
    localStorage.setItem('oIsNext', localStorageObject.oIsNext)
    localStorage.setItem('localStorageObject', JSON.stringify(localStorageObject))
}

export function getFromLocalStorage(property) {
    
    let localStorageObject = localStorage.getItem('localStorageObject') ? JSON.parse(localStorage.getItem('localStorageObject')) : {}
    switch(property) {
        case 'oIsNext':
            return localStorageObject.oIsNext
        break
        case 'history':
            return localStorageObject.history ? JSON.parse(localStorageObject.history) : null
        break
        case 'selectedFields':
            return localStorageObject.selectedFields ? JSON.parse(localStorageObject.selectedFields) : null
        break
         default:
            return null

    }

}
