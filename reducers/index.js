import { combineReducers } from 'redux'


const profile = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return action.payload
        default:
            return state
    }
}

const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'UPDATE_EMAIL':
            return {...state, email:action.payload}
        case 'UPDATE_PASSWORD':
            return {...state, password:action.payload}
        case 'UPDATE_USERNAME':
            return {...state, username:action.payload.toLowerCase().replace(' ', '_')}
        case 'UPDATE_PHOTO':
            return {...state, photo: action.payload}
        default:
            return state
    }
}

const post = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_POST_NEXT_PHOTO':
            return { ...state, photos: action.payload}
        case 'UPDATE_DESCRIPTION':
            return {...state, description: action.payload}
        case 'UPDATE_TITLE':
            return {...state, title: action.payload}
        case 'UPDATE_WHATS':
            return {...state, whats: action.payload}
        case 'UPDATE_CATEGORY':
            return {...state, category: action.payload}
        case 'GET_POSTS':
            return {...state, feed: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    post,
    profile
})

export default rootReducer;