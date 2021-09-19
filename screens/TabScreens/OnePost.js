import React from 'react';
import * as firebase from 'firebase'
import { StyleSheet, Text, Image, FlatList, ScrollView, TextInput, TouchableOpacity, View, Button, Dimensions } from 'react-native';
import PostComponent from '../Components/PostComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser, followUser, unFollowUser } from '../../actions/user'
import { getPost, likePost, unLikePost, savePost, unSavePost } from '../../actions/post'
import { SafeAreaView } from 'react-native-safe-area-context'


export class OnePost extends React.Component {
  
  render(){
      this.props.navigation.setOptions({
          title:this.props.post?.onePost?.username + "'s post"
      })
    return (
        <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
            <PostComponent 
                style={{marginTop:0}}
              item={this.props.post.onePost} 
              user={this.props.user} 
              likePost={(item)=>this.props.likePost(item)}
              unLikePost={(item)=>this.props.unLikePost(item)} 
              savePost={(item)=>this.props.savePost(item)}
              unSavePost={(item)=>this.props.unSavePost(item)} 
              navigation={this.props.navigation} 
              />
        </SafeAreaView>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, likePost, unLikePost, savePost, unSavePost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePost)