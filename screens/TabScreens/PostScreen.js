import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { uploadPhoto } from '../../actions/index'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { updateNextPhoto, removeImage } from '../../actions/post'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class PostScreen extends React.Component {

  state = {
    urlChosen: undefined,
  }
  
  openLibrary = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(status === 'granted') {
        const image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        })
        if(!image.cancelled){
          const url = await this.props.uploadPhoto(image)
          //this.setState({url:url})
          this.props.updateNextPhoto(url)
          this.setState({urlChosen:url})
        }
      }
    } catch(error) {
      alert(error.message)
    }
  }

  changeChosenUrl = (url) => {
    this.setState({urlChosen:url})
  }

  removeImage = (url) => {
    const position = this.props.post.photos.indexOf(url)
    this.props.removeImage(position)
    if(this.props.post.photos.length == 2){
      this.setState({urlChosen: this.props.post.photos[0]})
    } else {
      this.setState({urlChosen: undefined})
    }
  }

  uploadPost = () => {
    this.props.navigation.navigate('PostCheckout')
  }

  /*onSubmit = () => {
    if(this.props.post.title == undefined || this.props.post.title <= 4) {
      alert('Título inexistente ou muito pequeno')
    }

    if(this.props.post.description == undefined || this.props.post.description <= 10) {
      alert('Descrição inexistente ou muito pequena')
    }

    if(this.props.post.whats == undefined || this.props.post.whats <= 8) {
      alert('Número muito pequeno ou nulo.')
    }

    else {
      this.uploadPost()
    }
  }*/
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#1a1a1a'}}>
          <View style={(Platform.OS == 'ios' ? {width: screenWidth, height:55, borderBottomColor: 'grey', borderBottomWidth:1} : {width: screenWidth, height: 55, borderBottomColor:'gray', borderBottomWidth:1, marginTop:30, justifyContent: 'space-between', alignItems: 'center', flexDirection:'row'})}>
              <Text style={{margin:10, fontWeight: 'bold', fontSize:22, color: 'white'}}>Create a new post</Text>
              <TouchableOpacity style={{margin:10}}
                onPress={() => this.uploadPost()}>
                  <Text style={{margin:10, fontWeight: 'bold', fontSize:22, color:'#007aff'}}>Upload</Text>
              </TouchableOpacity>
          </View>

          <View style={{width:screenWidth, height:360,}}>
              {(this.state.urlChosen == undefined) ? 
                <TouchableOpacity style={{width:screenWidth, height:360, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.openLibrary()}>
                    <View style={{width:65, height:65, borderRadius:65/2, backgroundColor:'rgba(0, 0, 0, 0.1)', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'white', fontSize:40}}>+</Text>
                    </View>
                </TouchableOpacity>
              : <View>
                    <Image source={{uri: this.state.urlChosen}} style={{width:screenWidth, height:360,}} />
                    <TouchableOpacity onPress={()=> this.removeImage(this.state.urlChosen)} style={{position: 'absolute', bottom:30, right:40}}>
                        <FontAwesome name='trash' color={'black'} size={40} />
                    </TouchableOpacity>
                </View>
              }
          </View>

          <View style={{flexDirection:'row', width:screenWidth, justifyContent:'center',alignItems:'center', flex:1}}>
                    {
                        (this.props.post.photos == undefined || this.props.post.photos?.length == 3  || this.props.post.photos?.length == 0)
                        ?
                        null
                        :
                        <TouchableOpacity style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center', borderRadius:12, margin:10 }}
                        onPress={()=> this.openLibrary()}>
                            <View style={{width:40, height:40, borderRadius:20, backgroundColor:'rgba(0,0,0,0.1)', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'white', fontSize:30}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        this.props.post.photos?.map(e=>
                            <TouchableOpacity
                            onPress={()=> this.changeChosenUrl(e)}>
                                <Image source={{uri: e}} style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', borderRadius:12, margin:10}} />
                            </TouchableOpacity>
                        )
                    }
                </View>
      </SafeAreaView>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto, removeImage }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)