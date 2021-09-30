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
                whosFeed: user.followers,
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

 export const uploadTextPost = () => {
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
                likes:[],
                comments:[],
                whosFeed: user.followers,
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

export const uploadComment = (item) => {
    return async ( dispatch, getState )=>{
        try {
            const { post, user } = getState()

            const id = uuid.v4();

            await db.collection('posts').doc(item.id).get().then(doc => {
                if(doc.exists){
                  const previousComments = doc.data().comments
                  const comment = {
                    postedBy: { uid: user.uid, username: user.username, photo: user.photo },
                    id: id,
                    created: new Date().getTime(),
                    likes: [],
                    replies: [],
                    comment: post.description,
                  }
                  const updatedComments = [...previousComments, comment]
                  db.collection('posts').doc(item.id).update({ comments: updatedComments })
                }
            })


            await db.collection('users').doc(item.uid).get().then(doc => {
                if(doc.exists){
                  const previous = doc.data().notifications
                  const comment = {
                    by: { uid: user.uid, username: user.username, photo: user.photo },
                    id: id,
                    created: new Date().getTime(),
                    postId: item.id,
                    comment: post.description,
                    visto: false,
                  }
                  const updatedComments = [...previous, comment]
                  db.collection('users').doc(item.uid).update({ notifications: updatedComments })
                }
            })
            
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

export const getFeedPosts = (numberOfPosts) => {
    return async (dispatch, getState) => {

        const { post, user } = getState()

        const posts = await db.collection('posts').where('whosFeed', 'array-contains', user.uid).limit(numberOfPosts).get()

        let array = []
        posts.forEach(post => {
            array.push(post.data())
        })

        dispatch({type:'GET_FEED_POSTS', payload: array})
    }
}

export const getSavedPosts = () => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user
            const posts = await db.collection('posts').orderBy('date', 'desc').where('savedBy', 'array-contains', uid).get()

            let array = []
            posts.forEach(post => {
                array.push(post.data())
            })

            dispatch({type: 'GET_SAVED_POSTS', payload: array})
        } catch(e){
            console.log(e)
        }
    }
}

export const getNotifications = () => {
    return async (dispatch, getState) => {

        const { user } = getState()

        const notifications = await db.collection('users').doc(user.uid).orderBy('date', 'desc').get()

        let array = []
        notifications.forEach(post => {
            array.push(post.data())
        })

        dispatch({type: 'GET_NOTIFICATIONS', payload:array})
    }
}

export const likePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid, username, photo } = getState().user

            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        } catch (err) {
            alert(err)
        }
    }
}

export const unLikePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid, username, photo } = getState().user

            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })
        } catch (err) {
            alert(err)
        }
    }
}

export const savePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayUnion(post.id)
            })

        } catch (err) {
            alert(err)
        }
    }
}

export const unSavePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayRemove(post.id)
            })

        } catch(err) {
            alert(err)
        }
    }
}

/*export const getPost = (post) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: 'GET_POST', payload: post})
        } catch(e){
            alert(e)
        }
    }
}*/

export const getPost = (item) => {
    return async (dispatch, getState) => {
        try{
            db.collection('posts').where('id', '==', item.id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  dispatch({type: 'GET_POST', payload: {...doc.data(), id: doc.id}});
                });
            })
        } catch(e){
            alert(e)
        }
    }
}