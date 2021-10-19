import firebase from 'firebase/app'
import db from '../config/Firebase'
import { orderBy } from 'lodash'

const random = 'https://media.istockphoto.com/vectors/user-icon-flat-style-isolated-on-white-background-vector-id1084418050?k=20&m=1084418050&s=170667a&w=0&h=a3Dal9T8Y_8SdoT_5pge67ebud8Viug8bqCnV-Ef_04='

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

export const updateBio = (input) => {
    return {type: 'UPDATE_BIO', payload: input}
}

export function signup(){
    return async (dispatch, getState) => {
        try {
            const {username, email, password, photo} = getState().user

            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

            if(response.user.uid){
                if(photo == '' | photo == null | photo == undefined){
                    const user = {
                        uid: response.user.uid,
                        username: username,
                        email: email,
                        posts: [],
                        bio: '',
                        link: '',
                        likes: 0,
                        photo: random,
                        savedPosts: [],
                        followers: [],
                        following: [],
                        notifications: [],
                    }
    
                    await db.collection('users').doc(response.user.uid).set(user)
                    dispatch({type: 'LOGIN', payload: user})
                    alert('Account created successfully!')
                } else {
                    const user = {
                        uid: response.user.uid,
                        username: username,
                        email: email,
                        posts: [],
                        bio: '',
                        link: '',
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

export const editProfile = () => {
    return async ( dispatch, getState ) => {
        try {
            const { user, post } = getState()

            const data = {
                username: user.username,
                bio: user.bio,
                photo: user.photo,
            }

            db.collection('users').doc(user.uid).update(data)

            dispatch({type: 'LOGIN', payload: user})
        } catch(e) {
            alert(e)
        }
    }
}

export const userDetails = (item) => {
    return async ( dispatch, getState ) => {
        try {
           
            const details = db.collection('users').doc(item).get()

            dispatch({type: 'USER_DETAILS', payload: details})
        } catch(e) {
            alert(e)
        }
    }
}
