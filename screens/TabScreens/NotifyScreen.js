import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getNotifications, getPost2 } from '../../actions/post'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class NotifyScreen extends React.Component {
  
  componentDidMount = () => {
    this.props.getNotifications(this.props.user.uid)
  }

  getNotifications = (uid) => {
    this.props.getNotifications(uid)
  }

  goToPost = (post) => {
    this.props.getPost2(post)
    this.props.navigation.navigate('OnePost')
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white',  backgroundColor: '#1a1a1a'}}>
        <View style={{height:60, marginTop:10, width:screenWidth, borderBottomColor:'black', borderBottomWidth:10, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:25, fontFamily: 'logo-font', color: '#007aff', marginLeft: 10}}>Notificações</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Post')}  style={{width:screenWidth, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{width:40, height:40, borderRadius:40/2, backgroundColor:'#007aff', marginLeft: 170, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'white', fontSize:25}}>+</Text>
                    </View>
              </TouchableOpacity>
            </View>
        <ScrollView>
            {
                    this.props.user.notifications.map((e)=>
                        <View>
                            <View style={{backgroundColor: '#1a1a1a', Width: '100%', marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 5}}>
                                <View style={{maxWidth: '85%'}}>
                                    <Text style={{fontWeight: '600', fontSize:15, color: 'white', margin: 20}}>Nova notificação de</Text>
                                    <TouchableOpacity
                                        onPress={() => this.goToPost(e.postId)} 
                                        style={{flexDirection: 'row', marginHorizontal:20, marginVertical: 10, alignItems: 'center'}}>
                                            <Image source={{uri: e.by.photo}} style={{width:35, height:35, borderRadius:35/2, marginLeft:0}} />
                                            <Text style={{fontWeight: '600', fontSize:15, color: 'white', marginLeft:10}}>{e.by.username}</Text>
                                    </TouchableOpacity>  
                                </View> 
                                <Text style={{fontWeight: '300', fontSize:14, color: 'white', marginHorizontal:20, marginTop:10, marginBottom:20, alignItems: 'center'}}>{e.comment}</Text>
                            </View>
                        </View>
                    )
                }
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getNotifications, getPost2 }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyScreen)