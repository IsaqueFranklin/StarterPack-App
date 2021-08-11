import {Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { signup, updateEmail, updatePassword, updateUsername } from '../../actions/user'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class Signup extends React.Component {

  state = {
    repeat: ''
  }

  onLoginPress  = () => {
    if(this.props.user.password == this.state.repeat && this.props.user.username !== ''){
      this.props.signup()
    } else {
      alert('the passwords are not identical')
    }
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Text style={{fontSize:35, fontFamily: 'logo-font', marginTop: 0}}>NotInstagram</Text>
        <Text>SignUp page</Text>

          <View style={{width:screenWidth*0.9, marginTop:10,}}>
              <Text style={{left:15}}>Username</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'black', paddingHorizontal: 20, margin: 0, borderRadius:10, borderColor: 'grey', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'Your username'} 
          onChangeText={input=>this.props.updateUsername(input)}
          value={this.props.user.username} />

          <View style={{width:screenWidth*0.9, marginTop:10,}}>
              <Text style={{left:15}}>Email</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'black', paddingHorizontal: 20, margin: 0, borderRadius:10, borderColor: 'grey', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'example@example.com'} 
          onChangeText={input=>this.props.updateEmail(input)}
          value={this.props.user.email} />

          <View style={{width:screenWidth*0.9, marginTop:10,}}>
              <Text style={{left:15}}>Password</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'black', paddingHorizontal: 20, margin: 0, borderRadius:10, borderColor: 'grey', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'Passcode123'} 
          onChangeText={input=>this.props.updatePassword(input)}
          value={this.props.user.password}
          secureTextEntry={true} />

          <View style={{width:screenWidth*0.9, marginTop:10,}}>
              <Text style={{left:15}}>Repeat Password</Text>
          </View>

          <TextInput 
          style={{height: 50, width: screenWidth*0.9, color: 'black', paddingHorizontal: 20, margin: 0, borderRadius:10, borderColor: 'grey', borderWidth: 1}}
          placeholderTextColor={'grey'} 
          placeholder={'Repeat Passcode123'} 
          onChangeText={input=>this.setState({repeat: input})}
          value={this.state.repeat}
          secureTextEntry={true} />

          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity style={{width: screenWidth*0.6, height: 50, borderRadius: 30, backgroundColor: '#0095f6', justifyContent: 'center', alignItems: 'center'}}
            onPress={()=>this.onLoginPress()}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', margin:10}}
            onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{fontSize: 18}}>Already have an account? </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#0095f6'}}>Login</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signup, updateEmail, updatePassword, updateUsername }, dispatch)
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    post: state.post
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)