import React from 'react';
import { StyleSheet, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { updateDescription, uploadPost } from '../../../actions/post'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class TextCheckout extends React.Component {
  
  render(){
    return (
      <View style={{flex: 1, alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
          <TextInput 
          multiline
          numberOfLines={10}
          placeholder={'Type in your description here :)'} 
          placeholderTextColor={'white'}
          onChangeText={input=> this.props.updateDescription(input)}
          value={this.props.post.description}
          style={{backgroundColor: '#0a0a0a', color: '#fff',  marginTop: 100, marginBottom: 50, width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
          />
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription, uploadPost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextCheckout)