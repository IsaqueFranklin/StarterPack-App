import {Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { uploadPhoto } from '../../actions/index'
import { updatePhoto } from '../../actions/user'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class ProfilePicture extends React.Component {

    openLibrary = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if( status === 'granted'){
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true
                })
                if(!image.cancelled){
                    const url = await this.props.uploadPhoto(image)
                    this.props.updatePhoto(url)
                }
            }
        } catch(e){
            alert(e)
        }
    }

  
  render(){
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', bottom:100}}>
        <Text style={{fontWeight: 'bold', fontSize:24, color: 'white', marginTop:140}}>Choose a profile picture</Text>
            {
                (this.props.user.photo === undefined) ?
                <TouchableOpacity 
                style={{marginTop: 100}}
                onPress={() => this.openLibrary()}>
                    <Image 
                    source={require('../../assets/images/image.jpg')} 
                    style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                </TouchableOpacity>
                : 
                <TouchableOpacity 
                style={{marginTop: 100}}
                onPress={() => this.openLibrary()}>
                    <Image 
                    source={{uri:this.props.user.photo}} 
                    style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                </TouchableOpacity>
            }
            <TouchableOpacity style={{margin:70, padding:10, borderRadius:14, backgroundColor: "#007aff", width: 180, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={{fontWeight: 'bold', fontSize:20, color: "white"}}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture)