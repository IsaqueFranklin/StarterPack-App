import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


export default class PostComponent extends React.Component {


  static propTypes = {
      prop: PropTypes
  }

  state = {
      liked: undefined,
      numLike: 0,
      saved: undefined,
  }

  goToPost = (post) => {
    this.props.getPost(post)
    this.props.navigation.navigate('OnePost')
  }

  likePost = () => {
    if((this.props.item?.likes.includes(this.props.user.uid)) || this.state.liked == true){
      if(this.state.liked == false){
        this.setState({liked: true});
        this.setState({numLike:this.state.numLike+1});
        this.props.likePost(this.props.item)
      } else {
        this.setState({liked: false});
        this.setState({numLike:this.state.numLike-1})
        this.props.unLikePost(this.props.item)
      }
    } else {
      this.setState({liked: true})
      this.props.likePost(this.props.item)
      this.setState({numLike:this.state.numLike+1})
    }
  }

  savePost = () => {
    if((this.props.item.savedBy.includes(this.props.user.uid)) || this.state.saved == true){
      if(this.state.liked ==false){
        this.setState({saved:true})
        this.props.savePost(this.props.item)
      } else {
        this.setState({saved:false})
        this.props.unSavePost(this.props.item)
      }
    } else {
      this.setState({saved: true})
      this.props.savePost(this.props.item)
    }
  }


  render(){
    return (
        <View style={{marginBottom:10, color: 'white', justifyContent: 'center', borderBottomColor:'black', borderBottomWidth:10}}>
            <View style={{backgroundColor: '#1a1a1a', margin: 10, width: screenWidth*.8, marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07}}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileScreen', this.props.item.uid)} 
                style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                    <Image source={{uri: this.props.user?.photo}} style={{width:40, height:40, borderRadius:20, marginLeft:0}} />
                    <Text style={{fontWeight: '400', fontSize:16, color: 'white', marginHorizontal: 20, }}>{this.props.user?.username}</Text>
            </TouchableOpacity>   
            </View>
            <View>
              <ScrollView 
                horizontal={true}
                pagingEnabled={true}>
                {
                    this.props.item?.photos?.map(e=>
                        <Image source={{uri: e}} style={{width:screenWidth, height:360,}} />
                    )
                }
              </ScrollView>
          </View>

        {/*this is our bottom bar*/}
          <View style={(this.props.item?.photos == undefined || this.props.item.photos == null ? {margin: 10, marginTop: 0, color: 'white'} : {margin: 10, marginTop: 20, color: 'white'})}>
                {/*<Text style={{fontWeight: '400', fontSize:16, color: 'white', marginHorizontal: 0, }}>{this.props.item?.username}</Text>*/}
                <Text style={{color: 'white', marginLeft:0}}>{this.props.item?.description}</Text>
          </View>

          <Text style={{color:'grey', margin:10, marginLeft:10, marginBottom: 20}}>{moment(this.props.item?.date).format('ll')}.</Text>
          <View style={{width:screenWidth, height:50, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                    onPress={() => this.likePost()}>
                        {
                            (this.props.item?.likes?.includes(this.props.user.uid) && this.state.liked == undefined)
                            ?
                            <Image source={require('../../assets/images/liked.png')} style={{width: 20, height:20, margin:10}} />
                            :
                                (this.state.liked == true) 
                                ?
                                <Image source={require('../../assets/images/liked.png')} style={{width: 20, height:20, margin:10}} />
                                :
                                <Image source={require('../../assets/images/heart.png')} style={{width: 20, height:20, margin:10}} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this.goToPost(this.props.item)}>
                        <Image source={require('../../assets/images/comment.png')} style={{width: 20, height:20, margin:10}} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/images/share.png')} style={{width: 20, height:20, margin:10}} />
              </View>
              <TouchableOpacity onPress={() => this.savePost()}>
                {
                    (this.props.item?.savedBy.includes(this.props.user.uid) && this.state.saved == undefined)
                    ?
                    <Image source={require('../../assets/images/saved.png')} style={{width: 20, height:20, margin:10}} />
                    :
                    (this.state.saved == true) ?
                    <Image source={require('../../assets/images/saved.png')} style={{width: 20, height:20, margin:10}} />
                    :
                    <Image source={require('../../assets/images/save.png')} style={{width: 20, height:20, margin:10}} />
                }
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}