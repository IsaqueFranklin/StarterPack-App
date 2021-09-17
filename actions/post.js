import firebase from 'firebase/app'
import db from '../config/Firebase'
import uuid from 'uuid'


export const updateDescription = (input) => {
    return {type: 'UPDATE_DESCRIPTION', payload: input}
}

export const updateTitle = (input) => {
    return {type: 'UPDATE_TITLE', payload: input}
}

export const updateWhats = (input) => {
    return {type: 'UPDATE_WHATS', payload: input}
}

export const updatePrice = (input) => {
    return {type: 'UPDATE_PRICE', payload: input}
}

export const updateCategory = (input) => {
    return {type: 'UPDATE_CATEGORY', payload: input}
}

export const updateLocation = (input) => {
    return {type: 'UPDATE_LOCATION', payload: input}
}

export const updateNextPhoto = (input) => {
    return async (dispatch, getState) => {
        try {
            let array = []
            const { post } = getState()

            post.photos?.forEach(photo => {
                array.push(photo)
            })
            array.push(input)

            dispatch({type: 'UPDATE_POST_NEXT_PHOTO', payload: array})
        } catch(e){
            alert(e)
        }
    }
}

export const removeImage = (photoToRemove) => {
    return async (dispatch, getState) => {
        try {
            let array = []
            const { post } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            })
            array.splice(photoToRemove, 1)

            dispatch({type: 'UPDATE_POST_NEXT_PHOTO', payload: array})
        } catch(e){
            alert(e)
        }
    }
}

export const uploadPost = () => {
    return async ( dispatch, getState )=>{
        try {
            const { post, user } = getState()
            
            const id = uuid.v4()
            const upload = {
                id:id,
                uid: user.uid,
                photo: user.photo,
                photos: post.photos,
                username: user.username,
                date: new Date().getTime(),
                savedBy: [],
                likes:[],
                comments:[],
                description: post.description,
                //category: post.category,
            }      
            await db.collection('posts').doc(id).set(upload)
            await db.collection('users').doc(user.uid).update
            ({posts: firebase.firestore.FieldValue.arrayUnion(id)})
         } catch (e) {
            alert(e)
        }
    } 
 }

 export const getPosts = (numberOfPosts) => {
    return async (dispatch, getState) => {

        const posts = await db.collection('posts').orderBy('date', 'desc').limit(numberOfPosts).get()

        let array = []
        posts.forEach(post => {
            array.push(post.data())
        })

        dispatch({type: 'GET_POSTS', payload:array})
    }
}