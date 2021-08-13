import {Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login } from '../../actions/user'


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Login extends React.Component {
  
  render(){
    return (
      <View style={styles.container}>
        <Text style={{fontSize:35, fontFamily: 'logo-font', marginTop: 170, color: '#007aff'}}>StarterPack</Text>
        <View style={{top:100}}>
          <View style={{width:screenWidth*0.9, marginTop:15,}}>
              <Text style={{left:10, color: 'white'}}>Email</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'white', paddingHorizontal: 20, margin: 10, borderRadius:10, borderColor: 'white', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'example@example.com'} 
          onChangeText={input=>this.props.updateEmail(input)}
          value={this.props.user.email} />

          <View style={{width:screenWidth*0.9, marginTop:15,}}>
              <Text style={{left:10, color: 'white'}}>Password</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'white', paddingHorizontal: 20, margin: 10, borderRadius:10, borderColor: 'white', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'Passcode123'} 
          onChangeText={input=>this.props.updatePassword(input)}
          value={this.props.user.password}
          secureTextEntry={true} />

          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', margin: 30, marginTop: 50}}>
            <TouchableOpacity style={{width: 180, height: 50, borderRadius: 30, backgroundColor: '#0a0a0a', color: 'white', justifyContent: 'center', alignItems: 'center'}}
              onPress={()=>this.props.login()}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', margin:10}}
            onPress={() => this.props.navigation.navigate('ProfilePicture')}>
                <Text style={{fontSize: 18, color: 'white'}}>Don't have an account? </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#0095f6'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{position: 'absolute', bottom:60, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15, color:'white'}}>from </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Horizon</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch)
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    post: state.post
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)