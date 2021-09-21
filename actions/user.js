import firebase from 'firebase/app'
import db from '../config/Firebase'
import { orderBy } from 'lodash'

export function updateEmail(input){
    return {type: 'UPDATE_EMAIL', payload: input}
}

export function updatePassword(input){
    return {type: 'UPDATE_PASSWORD', payload: input}
}

export function updateUsername(input){
    return {type: 'UPDATE_USERNAME', payload: input}
}

export function updatePhoto(input){
    return {type: 'UPDATE_PHOTO', payload: input}
}

export function signup(){
    return async (dispatch, getState) => {
        try {
            const {username, email, password, photo} = getState().user

            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

            if(response.user.uid){
                const user = {
                    uid: response.user.uid,
                    username: username,
                    email: email,
                    posts: [],
                    bio: '',
                    likes: 0,
                    photo: photo,
                    savedPosts: [],
                    followers: [],
                    following: [],
                    notifications: [],
                }

                await db.collection('users').doc(response.user.uid).set(user)
                dispatch({type: 'LOGIN', payload: user})
                alert('Account created successfully!')
            }
        } catch(e){
            alert(e)
        }
    }
}

export function login(){
    return async (dispatch, getState) => {
        try {
            const {email, password} = getState().user
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)

            dispatch(getUser(response.user.uid))
        } catch(e){
            alert(e)
        }
    }
}

export const getUser = (uid, type) => {
    return async (dispatch) => {
        const userQuery = await db.collection('users').doc(uid).get()
        let user = userQuery.data()

        let posts = []
        const postQuery = await db.collection('posts').where('uid', '==', uid).get()

        postQuery.forEach(function(response){
            posts.push(response.data())
        })

        user.posts = orderBy(posts, 'date', 'desc')

        if(type == 'GET_PROFILE'){
            dispatch({ type: 'GET_PROFILE', payload: user})
        } else {
            dispatch({type: 'LOGIN', payload: user})
        }
    }
}

export const followUser = (userToFollow) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayUnion(userToFollow)
            })

            await db.collection('users').doc(userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayUnion(uid)
            })

            dispatch(getUser(userToFollow, 'GET_PROFILE'))

        } catch(e){
            alert(e)
        }
    }
}

export const unFollowUser = (userToFollow) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user
        
            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayRemove(userToFollow)
            })

            await db.collection('users').doc(userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayRemove(uid)
            })

            dispatch(getUser(userToFollow, 'GET_PROFILE'))

        } catch(e) {
            alert(e)
        }
    }
}
