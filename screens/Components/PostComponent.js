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


  render(){
    return (
        <View style={{marginBottom:10, color: 'white', justifyContent: 'center', borderBottomColor:'black', borderBottomWidth:10}}>
            <View style={{margin: 10, width: screenWidth*.8, marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07}}>
                    <Image source={{uri: this.props.item?.photo}} style={{width:40, height:40, borderRadius:20, marginLeft:0}} />
                    <Text style={{fontWeight: '400', fontSize:16, color: 'white', marginHorizontal: 20, }}>{this.props.item?.username}</Text>   
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
        </View>
    );
  }
}