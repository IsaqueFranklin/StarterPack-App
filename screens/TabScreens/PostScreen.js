import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { updateDescription, updateTitle, updateWhats, uploadPost } from '../../actions/post'


class PostScreen extends React.Component {


  uploadPost = () => {
    this.props.navigation.navigate('Home')
    //alert('posted')
    this.props.uploadPost()
    //this.props.getPosts()
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center',  backgroundColor: '#f5f5dc'}}>
          <TextInput 
          placeholder={'Type in your title here :)'} 
          placeholderTextColor={'black'}
          onChangeText={input=> this.props.updateTitle(input)}
          value={this.props.post.title}
          style={{backgroundColor: 'rgba(0,0,0,0.05)', width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />

          <TextInput 
          placeholder={'Type in your description here :)'} 
          placeholderTextColor={'black'}
          onChangeText={input=> this.props.updateDescription(input)}
          value={this.props.post.description}
          style={{backgroundColor: 'rgba(0,0,0,0.05)', width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />

          <TextInput 
          placeholder={'Type in your whatsapp here :)'} 
          placeholderTextColor={'black'}
          onChangeText={input=> this.props.updateWhats(input)}
          value={this.props.post.whats}
          style={{backgroundColor: 'rgba(0,0,0,0.05)', width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />

              <TouchableOpacity style={{margin:22, flexDirection: 'row'}}
              onPress={()=> this.uploadPost()}>
                <Text style={{color: 'blue', fontWeight: 'bold', fontSize:22, marginHorizontal:5, bottom:0}}>Post</Text>
                  <FontAwesome name='check' color={'blue'} size={25} style={{top:2}} />
              </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, updateDescription, updateTitle, updateWhats, uploadPost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)