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
        <View style={{marginBottom:10, color: 'white', borderRadius:10, borderWidth: 0.5, borderColor: 'white', margin:20, width: screenWidth*.9, justifyContent: 'center'}}>
            <View style={{width: screenWidth*.8, height:60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07}}>
                    <Image source={{uri: this.props.item?.photo}} style={{width:40, height:40, borderRadius:20, marginLeft:15}} />
                    <Text style={{fontWeight: '400', fontSize:16, color: 'white'}}>{this.props.item?.username}</Text>
                    <Text style={{color: 'white'}}>{moment(this.props.item?.date).format('ll')}</Text>
            </View>

        {/*this is our bottom bar*/}
          
          <View style={{marginTop:5, color: 'white', width: screenWidth*.7}}>
                <Text style={{fontWeight: 'bold', marginLeft:10, color: 'white'}}>{this.props.item?.title}</Text>
                <Text style={{color: 'white', marginLeft:10}}>{this.props.item?.description}</Text>
          </View>

          <Text style={{color:'grey', margin:10}}>{moment(this.props.item?.date).format('ll')}.</Text>
        </View>
    );
  }
}