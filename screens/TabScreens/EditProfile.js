import React from 'react';
import * as firebase from 'firebase'
import PostComponent from '../Components/PostComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { StyleSheet, Image, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { uploadPhoto } from '../../actions/index'
import { getUser, updatePhoto } from '../../actions/user'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


export class EditProfile extends React.Component {

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
        <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
                    {
                        (this.props.user.photo === undefined) ?
                        <TouchableOpacity 
                        style={{marginTop: 60}}
                        onPress={() => this.openLibrary()}>
                            <Image 
                            source={require('../../assets/images/image.jpg')} 
                            style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity 
                        style={{marginTop: 60}}
                        onPress={() => this.openLibrary()}>
                            <Image 
                            source={{uri:this.props.user.photo}} 
                            style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                        </TouchableOpacity>
                    }

                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <Text style={{fontSize:18, marginVertical: 0, color: 'white'}}>{this.props.user.username}</Text>
                    <Text style={{fontSize:15, marginVertical: 20, color: 'white'}}>{this.props.user.bio}</Text>
                </View>

                <TouchableOpacity style={{width: '65%', height: 35, backgroundColor: '#007aff', justifyContent: 'center', alignItems: 'center', borderRadius:8, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize:15, margin:5, color: 'white'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)