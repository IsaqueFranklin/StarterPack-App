import React from 'react';
import firebase from 'firebase/app'
import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, Image, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getUser, followUser, unFollowUser } from '../../actions/user'
import { getPost, likePost, unLikePost, savePost, unSavePost } from '../../actions/post'
import PostComponent from '../Components/PostComponent'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


class ProfileScreen extends React.Component {

  componentDidMount = () => {
    const { params } = this.props.route
    if (params !== undefined) {
      this.props.getUser(params, 'GET_PROFILE')
    }
  }

  follow = () => {
    this.props.followUser(this.props.profile.uid)
  }

  unFollow = () => {
    this.props.unFollowUser(this.props.profile.uid);
  }

  goToPost = (post) => {
    this.props.getPost(post)
    this.props.navigation.navigate('OnePost')
  }
  
  render(){
    const { params } = this.props.route

    this.props.navigation.setOptions({
      title: this.props.profile.username
    })

    if(params == undefined || params == this.props.user.uid){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#1a1a1a'}}>
        <View style={{height:60, marginTop:10, width:screenWidth, borderBottomColor:'black', borderBottomWidth:10, justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:25, fontFamily: 'logo-font', color: '#007aff', marginLeft: 30}}>Starter</Text>
            <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={{width: '20%', height: 35, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderWidth:1, borderColor: 'grey', borderRadius:7, margin:screenWidth*0.0125, marginBottom:10, marginRight:10}}>
                  <Text style={{color: 'white'}} >Logout</Text>
            </TouchableOpacity>
        </View>
      
      <ScrollView style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <SafeAreaView style={{flex: 1, alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
            <Image source={{uri: this.props.user?.photo}} style={{width:screenWidth*.3, height:screenWidth*.3, borderRadius: screenWidth*.15}} />
            <Text style={{fontSize:18, marginVertical: 20, color: 'white'}}>{this.props.user?.username}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                    {this.props.user?.posts?.length}
                </Text>
                <Text style={{fontSize:15, color: 'white'}}>
                    Posts
                </Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                    {this.props.user?.followers?.length}
                </Text>
                <Text style={{fontSize:15, color: 'white'}}>
                    Followers
                </Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
                <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                    {this.props.user?.following?.length}
                </Text>
                <Text style={{fontSize:15, color: 'white'}}>
                    Following
                </Text>
              </View>
            </View>
            <Text style={{maxWidth: '65%', fontSize: 16, color: 'white', marginTop: 20, marginBottom: 20}}>
                {this.props.user?.bio}
            </Text>
            <View style={{borderBottomColor:'black', borderBottomWidth:10, height:100, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={{width: '65%', height: 35, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderWidth:1, borderColor: 'grey', borderRadius:7, margin:screenWidth*0.0125}}>
                    <Text style={{margin:5, color: 'white'}}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            <FlatList
            data={this.props.user.posts}
            keyExtractor={(item) => JSON.stringify(item.date) }
            style={{flex: 1,}}
            renderItem={({item}) => 
                <TouchableOpacity
                onPress={() => this.goToPost(item)}>
                    <PostComponent 
                    item={item} 
                    user={this.props.user}
                    likePost={(item) => this.props.likePost(item)} 
                    unLikePost={(item) => this.props.unLikePost(item)}
                    savePost={(item) => this.props.savePost(item)}
                    unSavePost={(item) => this.props.unSavePost(item)}
                    navigation={this.props.navigation}
                    profile={this.props.profile} />
                </TouchableOpacity>
            }
            />
      </SafeAreaView>
      </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
    <ScrollView style={{flex: 1, backgroundColor: '#1a1a1a'}}>
    <SafeAreaView style={{flex: 1, alignItems: 'center',  backgroundColor: '#1a1a1a'}}>
          <Image source={{uri: this.props.profile?.photo}} style={{width:screenWidth*.3, height:screenWidth*.3, borderRadius: screenWidth*.15}} />
          <Text style={{fontSize:18, marginVertical: 20, color: 'white'}}>{this.props.profile?.username}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
              <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                  {this.props.profile?.posts?.length}
              </Text>
              <Text style={{fontSize:15, color: 'white'}}>
                  Posts
              </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
              <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                  {this.props.profile?.followers?.length}
              </Text>
              <Text style={{fontSize:15, color: 'white'}}>
                  Followers
              </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', margin:8}}>
              <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                  {this.props.profile?.following?.length}
              </Text>
              <Text style={{fontSize:15, color: 'white'}}>
                  Following
              </Text>
            </View>
          </View>
          <Text style={{fontSize: 16, color: 'white', marginTop: 20, marginBottom: 20, maxWidth: '65%'}}>
              {this.props.profile?.bio}
          </Text>
          {
              (this.props.profile.followers?.includes(this.props.user.uid))?
                <View style={{borderBottomColor:'black', borderBottomWidth:10, height:80, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity 
                  onPress={() => this.unFollow()}
                  style={{flexDirection: 'row', width:screenWidth*.45, height:35, justifyContent: 'center',alignItems: 'center', borderWidth:0.5, borderColor: 'grey', borderRadius:7, margin:screenWidth*0.0125}}>
                      <Text style={{color: 'white', margin:5}}>Following</Text>
                      <Image source={require('../../assets/images/check.png')} style={{width:15, height:15, marginTop:2}} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{width:screenWidth*.45, height:35, justifyContent: 'center',alignItems: 'center', borderWidth:0.5, borderColor: 'grey', borderRadius:7, margin:screenWidth*0.0125}}>
                      <Text style={{color: 'white'}}>Message</Text>
                  </TouchableOpacity>
                </View>
              :
                <View style={{borderBottomColor:'black', borderBottomWidth:10,height:80, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity 
                  onPress={() => this.follow()}
                  style={{width: '65%', height: 35, backgroundColor: '#007aff', justifyContent: 'center', alignItems: 'center', borderRadius:8}}>
                      <Text style={{fontWeight: 'bold', fontSize:18, margin:5, color: 'white'}}>Follow</Text>
                  </TouchableOpacity>
                </View>

            }

          <FlatList
          data={this.props.profile.posts}
          keyExtractor={(item) => JSON.stringify(item.date) }
          style={{flex: 1,}}
          renderItem={({item}) => 
              <TouchableOpacity
              onPress={() => this.goToPost(item)}>
                  <PostComponent 
                  item={item} 
                  user={this.props.profile}
                  likePost={(item) => this.props.likePost(item)} 
                  unLikePost={(item) => this.props.unLikePost(item)}
                  savePost={(item) => this.props.savePost(item)}
                  unSavePost={(item) => this.props.unSavePost(item)}
                  navigation={this.props.navigation}
                  profile={this.props.profile} />
              </TouchableOpacity>
          }
          />
    </SafeAreaView>
    </ScrollView>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, followUser, unFollowUser, likePost, unLikePost, savePost, unSavePost, getPost }, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)