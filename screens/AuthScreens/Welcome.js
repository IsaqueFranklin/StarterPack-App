import {Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase/app'
import { getFeedPosts } from '../../actions/post'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'


class Welcome extends React.Component {

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.props.getUser(user.uid)
                if(this.props.user !== null){
                    this.props.navigation.navigate('StackNavigator')
                    this.props.getFeedPosts(50);
                    this.props.navigation.reset({
                        index:0,
                        routes: [{ name: 'StackNavigator'}]
                    })
                }
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }
  
  render(){
    return (
      <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:35, fontFamily: 'logo-font', color: '#007aff', marginLeft: 10}}>Starter</Text>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUser, getFeedPosts}, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)