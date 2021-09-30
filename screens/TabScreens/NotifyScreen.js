import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getNotifications } from '../../actions/post'


class NotifyScreen extends React.Component {
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
            {
                    this.props.post?.notifications?.notifications.map((e, index)=>
                        <View key={index}>
                            <View style={{backgroundColor: '#1a1a1a', Width: '100%', marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 5}}>
                                <View style={{maxWidth: '85%'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('ProfileScreen', e.by.uid)} 
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
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getNotifications }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyScreen)