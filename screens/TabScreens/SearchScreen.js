import React from 'react';
import { StyleSheet, Text, FlatList, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getFeedPosts, getPosts, likePost, unLikePost, savePost, unSavePost, getPost } from '../../actions/post'


import PostComponent from '../Components/PostComponent'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class SearchScreen extends React.Component {

  componentDidMount = () => {
    this.props.getPosts(50);
    if (this.props.user.uid !== undefined) {
      this.props.getUser(this.props.user.uid, 'GET_PROFILE')
    }
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
            <View style={{height:60, marginTop:10, width:screenWidth, borderBottomColor:'black', borderBottomWidth:10, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:25, fontFamily: 'logo-font', color: '#007aff', marginLeft: 30}}>Starter</Text>
            
            </View>
            <FlatList 
            refreshing={true}
            data={this.props.post.feed}
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
    return bindActionCreators({ getUser, getFeedPosts, getPosts, likePost, unLikePost, savePost, unSavePost, getPost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)