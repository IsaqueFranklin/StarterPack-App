import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
//import { uploadPost } from '../actions/post'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../actions/user'


const Stack = createStackNavigator();

function MyStack(){

  /*uploadPost=()=>{
    this.props.navigation.navigate('TabNavigator')
    //alert('posted')
    this.props.uploadPost()
    //this.props.getPosts()
  }*/

    return (
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return{
      user: state.user,
      post: state.post
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStack)