import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import PostCheckout from '../screens/TabScreens/upload/PostCheckout'
import TextCheckout from '../screens/TabScreens/upload/TextCheckout'
import ProfileScreen from '../screens/TabScreens/ProfileScreen'
import OnePost from '../screens/TabScreens/OnePost'
import EditProfile from '../screens/TabScreens/EditProfile'
import SavedPosts from '../screens/TabScreens/SavedPosts'

import { uploadPost, updateDescription, uploadTextPost, getPosts, getFeedPosts } from '../actions/post'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../actions/user'


const Stack = createStackNavigator();

class MyStack extends React.Component{

  uploadPost = () =>{
    this.props.navigation.navigate('Home')
    //alert('posted')
    this.props.uploadPost()
    this.props.getFeedPosts()
    this.props.updateDescription()
  }

  uploadTextPost = () =>{
    this.props.navigation.navigate('Home')
    //alert('posted')
    this.props.uploadTextPost()
    this.props.getFeedPosts()
    this.props.updateDescription()
  }

    render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
        <Stack.Screen name="OnePost" component={OnePost} 
        options={{
          headerStyle: {
            backgroundColor: '#1a1a1a', borderWidth: 0
          },
          headerTintColor: '#fff',
          cardStyle: { backgroundColor: '#1a1a1a' }
        }} />
        <Stack.Screen name="SavedPosts" component={SavedPosts} 
        options={{
          headerStyle: {
            backgroundColor: '#1a1a1a', borderWidth: 0
          },
          headerTintColor: '#fff',
          cardStyle: { backgroundColor: '#1a1a1a' }
        }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#1a1a1a', borderWidth: 0
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="PostCheckout" component={PostCheckout} 
        options={{
          headerShown: true, 
          headerTitle: 'See your post',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerRight: () => (
              <TouchableOpacity style={{margin:22, flexDirection: 'row'}}
              onPress={()=> this.uploadPost()}>
                <Text style={{color: 'blue', fontWeight: 'bold', fontSize:22, marginHorizontal:5, bottom:0}}>Post</Text>
                  <FontAwesome name='check' color={'blue'} size={25} style={{top:2}} />
              </TouchableOpacity>
          )
          }} />
          <Stack.Screen name="EditProfile" component={EditProfile} 
          options={{
            headerTitle: 'Editar perfil',
            headerStyle: {
              backgroundColor: '#1a1a1a', borderWidth: 0
            },
            headerTintColor: '#fff',
            cardStyle: { backgroundColor: '#1a1a1a' }
          }} />
          <Stack.Screen name="TextCheckout" component={TextCheckout} 
        options={{
          headerShown: true, 
          headerTitle: 'Write a tweet',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerRight: () => (
              <TouchableOpacity style={{margin:22, flexDirection: 'row'}}
              onPress={()=> this.uploadTextPost()}>
                <Text style={{color: 'blue', fontWeight: 'bold', fontSize:22, marginHorizontal:5, bottom:0}}>Post</Text>
                  <FontAwesome name='check' color={'blue'} size={25} style={{top:2}} />
              </TouchableOpacity>
          )
          }} />
      </Stack.Navigator>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser, uploadPost, updateDescription, uploadTextPost, getPosts, getFeedPosts }, dispatch)
}

const mapStateToProps = (state) => {
  return{
      user: state.user,
      post: state.post
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStack)