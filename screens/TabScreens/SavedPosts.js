import React from 'react';
import * as firebase from 'firebase'
import { StyleSheet, Text, Image, FlatList, ScrollView, TextInput, TouchableOpacity, View, Button, Dimensions } from 'react-native';
import PostComponent from '../Components/PostComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser, followUser, unFollowUser } from '../../actions/user'
import { likePost, unLikePost, savePost, unSavePost, updateDescription, uploadComment, getPost, getSavedPosts } from '../../actions/post'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types';


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


export class SavedPosts extends React.Component {

    componentDidMount = () => {
        this.props.getSavedPosts();
        if (this.props.user.uid !== undefined) {
          this.props.getUser(this.props.user.uid, 'GET_PROFILE')
        }
      }
      
      render(){
        return (
          <SafeAreaView style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
                <FlatList 
                refreshing={true}
                data={this.props.post.saved_feed}
                keyExtractor={(item) => JSON.stringify(item.uid)}
                renderItem={({item}) => (
                  <PostComponent 
                  item={item} 
                  user={this.props.user}
                  likePost={(item) => this.props.likePost(item)} 
                  unLikePost={(item) => this.props.unLikePost(item)}
                  savePost={(item) => this.props.savePost(item)}
                  unSavePost={(item) => this.props.unSavePost(item)}
                  getPost={(item) => this.props.getPost(item)}
                  navigation={this.props.navigation}
                  profile={this.props.profile} />
                )}
                />
          </SafeAreaView>
        );
      }
    }


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, likePost, unLikePost, savePost, unSavePost, updateDescription, uploadComment, getPost, getSavedPosts }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPosts)