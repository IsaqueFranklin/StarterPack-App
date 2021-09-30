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
import { getUser, updatePhoto, updateUsername, updateBio, editProfile } from '../../actions/user'

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

    editProfile = () =>{
        this.props.navigation.navigate('Profile')
        //alert('posted')
        this.props.editProfile()
    }


  render(){
    return (
        <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
                    {
                        (this.props.user.photo === undefined) ?
                        <TouchableOpacity 
                        style={{marginTop: 20}}
                        onPress={() => this.openLibrary()}>
                            <Image 
                            source={require('../../assets/images/image.jpg')} 
                            style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                        </TouchableOpacity>
                        : 
                        <TouchableOpacity 
                        style={{marginTop: 20}}
                        onPress={() => this.openLibrary()}>
                            <Image 
                            source={{uri:this.props.user.photo}} 
                            style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius: screenWidth*.25, backgroundColor: "beige"}}/>
                        </TouchableOpacity>
                    }

                <View style={{marginTop: 30, alignItems: 'center'}}>
                    
                        <TextInput 
                        placeholder={'Seu novo nome de usuário'} 
                        placeholderTextColor={'white'}
                        onChangeText={input=> this.props.updateUsername(input)}
                        value={this.props.user.username}
                        style={{backgroundColor: '#0a0a0a', color: '#fff', marginBottom: 10, width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
                        />
                    
                        <TextInput 
                        placeholder={'Sua nova bio'} 
                        placeholderTextColor={'white'}
                        onChangeText={input=> this.props.updateBio(input)}
                        value={this.props.user.bio}
                        style={{backgroundColor: '#0a0a0a', color: '#fff', marginBottom: 20, width: '95%', fontSize:20, paddingVertical:10, paddingHorizontal:15, margin:20, borderRadius:10}}
                        />
                </View>

                <TouchableOpacity onPress={()=> this.editProfile()} style={{width: '65%', height: 35, backgroundColor: '#007aff', justifyContent: 'center', alignItems: 'center', borderRadius:8, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize:15, margin:5, color: 'white'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, updatePhoto, updateUsername, updateBio, editProfile }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)