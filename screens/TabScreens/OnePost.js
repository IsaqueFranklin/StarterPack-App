import React from 'react';
import * as firebase from 'firebase'
import { StyleSheet, Text, Image, FlatList, ScrollView, TextInput, TouchableOpacity, View, Button, Dimensions } from 'react-native';
import PostComponent from '../Components/PostComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser, followUser, unFollowUser } from '../../actions/user'
import { likeCPost, unLikePost, savePost, unSavePost, updateDescription, uploadComment, getPost } from '../../actions/post'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types';


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


export class OnePost extends React.Component {

    uploadComment = (item) =>{
        //this.props.navigation.navigate('Home')
        //alert('posted')
        this.props.uploadComment(item)
        this.props.getPost(this.props.post.onePost)
        //this.props.getPosts()
    }


  render(){
      this.props.navigation.setOptions({
          title:this.props.post?.onePost?.username + "'s post"
      })

    return (
        <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
            <ScrollView>
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
            <View style={{flex: 1, alignItems: 'center',  backgroundColor: '#1a1a1a', flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 10}}>
                <TextInput 
                placeholder={'Type in your description here :)'} 
                placeholderTextColor={'white'}
                onChangeText={input=> this.props.updateDescription(input)}
                value={this.props.post.description}
                style={{backgroundColor: '#0a0a0a', color: '#fff', width: '70%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:10, borderRadius:10}}
                />
                <TouchableOpacity style={{flexDirection: 'row'}}
                    onPress={()=> this.uploadComment(this.props.post.onePost)}>
                    <Text style={{color: 'blue', fontWeight: 'bold', fontSize:22, marginHorizontal:5, bottom:0}}>Post</Text>
                </TouchableOpacity>
            </View>

                {
                    this.props.post?.onePost?.comments.map((e, index)=>
                        <View key={index}>
                            <View style={{backgroundColor: '#1a1a1a', Width: '100%', marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 5}}>
                                <View style={{maxWidth: '85%'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('ProfileScreen', this.props.item.uid)} 
                                        style={{flexDirection: 'row', marginHorizontal:20, marginVertical: 10, alignItems: 'center'}}>
                                            <Image source={{uri: e.postedBy.photo}} style={{width:35, height:35, borderRadius:35/2, marginLeft:0}} />
                                            <Text style={{fontWeight: '600', fontSize:15, color: 'white', marginLeft:10}}>{e.postedBy.username}</Text>
                                    </TouchableOpacity>  
                                </View> 
                                <Text style={{fontWeight: '300', fontSize:14, color: 'white', marginHorizontal:20, marginTop:10, marginBottom:20, alignItems: 'center'}}>{e.comment}</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, unLikePost, savePost, unSavePost, updateDescription, uploadComment, getPost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePost)