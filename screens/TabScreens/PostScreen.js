import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Container } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { updateDescription, updateTitle, updateWhats, uploadPost, getPosts } from '../../actions/post'


class PostScreen extends React.Component {


  uploadPost = () => {
    this.props.navigation.navigate('Home')
    //alert('posted')
    this.props.uploadPost()
    this.props.getPosts()
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>

        <View style={{margin: 30, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize:25, color: 'white'}}>Share your project</Text>
          <Text style={{fontSize:18, color: 'white', alignItems: 'center'}}>Write a project and choose a price range</Text>
        </View>

          <TextInput 
          placeholder={'Type in your title here :)'} 
          placeholderTextColor={'grey'}
          onChangeText={input=> this.props.updateTitle(input)}
          value={this.props.post.title}
          style={{backgroundColor: 'white', width: '85%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />

          <TextInput 
          placeholder={'Type in your description here :)'} 
          placeholderTextColor={'grey'}
          onChangeText={input=> this.props.updateDescription(input)}
          value={this.props.post.description}
          style={{backgroundColor: 'white', width: '85%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10, height: 200}}
          />

          <TextInput 
          placeholder={'Type in your whatsapp here :)'} 
          placeholderTextColor={'grey'}
          onChangeText={input=> this.props.updateWhats(input)}
          value={this.props.post.whats}
          style={{backgroundColor: 'white', width: '85%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />

              <TouchableOpacity style={{margin:22, flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, borderWidth: 0.5, borderColor: 'white', borderRadius: 8}}
              onPress={()=> this.uploadPost()}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize:16, marginHorizontal:5, bottom:0}}>Post</Text>
                  <FontAwesome name='check' color={'white'} size={20} style={{top:2}} />
              </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, updateDescription, updateTitle, updateWhats, uploadPost, getPosts }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)