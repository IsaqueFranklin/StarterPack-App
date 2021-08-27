import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts } from '../../actions/post'


import PostComponent from '../Components/PostComponent'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class HomeScreen extends React.Component {

  componentDidMount = () => {
    this.props.getPosts(30);
    /*if (this.props.user.uid !== undefined) {
      this.props.getUser(this.props.user.uid, 'GET_PROFILE')
    }*/
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
            <View style={{height:50, width:screenWidth,borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth:0.5, justifyContent: 'space-between', flexDirection: 'row', marginTop:60}}>
            <Text style={{fontSize:25, fontFamily: 'logo-font', color: '#007aff', marginLeft: 30}}>NotInstagram</Text>
            </View>
            <FlatList 
            refreshing={true} 
            data={this.props.user}
            keyExtractor={(item) => JSON.stringify(item.uid)}
            renderItem={({item}) => (
              <PostComponent 
              item={item} 
              user={this.props.user}
              navigation={this.props.navigation} 
              />
            )}
            style={{}} />
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)