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

export const uploadPost = () => {
    return async ( dispatch, getState )=>{
        try {
            const { post, user } = getState()
            
            const id = uuid.v4()
            const upload = {
                id:id,
                uid: user.uid,
                photo: user.photo,
                username: user.username,
                date: new Date().getTime(),
                savedBy: [],
                upvotes:[],
                comments:[],
                description: post.description,
                title: post.title,
                whats: post.whats,
            }      
            await db.collection('posts').doc(id).set(upload)
            await db.collection('users').doc(user.uid).update
            ({posts: firebase.firestore.FieldValue.arrayUnion(id)})
         } catch (e) {
            alert(e)
        }
    } 
 }