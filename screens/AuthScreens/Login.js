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
        <Text style={{fontSize:35, fontFamily: 'logo-font', marginVertical: 60}}>StarterPack</Text>
        <View style={{top:100}}>
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

          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity style={{width: screenWidth*0.6, height: 50, borderRadius: 30, backgroundColor: '#0a0a0a', color: 'white', justifyContent: 'center', alignItems: 'center'}}
            onPress={()=>this.props.login()}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', margin:10}}
            onPress={() => this.props.navigation.navigate('ProfilePicture')}>
                <Text style={{fontSize: 18}}>Don't have an account? </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#0095f6'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{position: 'absolute', bottom:60, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>from </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Horizon</Text>
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