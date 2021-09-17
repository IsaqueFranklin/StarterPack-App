import React from 'react';
import firebase from 'firebase/app'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class ProfileScreen extends React.Component {

  componentDidMount = () => {
    const { params } = this.props.route
    if (params !== undefined) {
      this.props.getUser(params, 'GET_PROFILE')
    }
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
            <Image source={{uri: this.props.user?.photo}} style={{width:screenWidth*.3, height:screenWidth*.3, borderRadius: screenWidth*.15}} />
            <Text style={{fontSize:20, fontFamily: 'logo-font', marginVertical: 20, color: 'white'}}>{this.props.user?.username}</Text>
            <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={{borderRadius: 8, borderWidth: 0.5, borderColor: 'white', paddingHorizontal: 20, paddingVertical: 8}}>
              <Text style={{color: 'white'}} >Logout</Text>
            </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)