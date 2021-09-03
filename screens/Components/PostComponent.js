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
            <View style={{margin: 10, width: screenWidth*.8, height:60, flexDirection: 'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07}}>
                    <Image source={{uri: this.props.item?.photo}} style={{width:40, height:40, borderRadius:20, marginLeft:15}} />
                    <Text style={{fontWeight: '400', fontSize:16, color: 'white', marginHorizontal: 20, }}>{this.props.item?.username}</Text>
                    
            </View>

        {/*this is our bottom bar*/}
          
          <View style={{margin: 10, color: 'white', width: screenWidth*.7}}>
                <Text style={{fontWeight: 'bold', marginLeft:10, marginBottom: 10, color: 'white', fontSize:18}}>{this.props.item?.title}</Text>
                <Text style={{color: 'white', marginLeft:10}}>{this.props.item?.description}</Text>
                <Text style={{color: 'white', marginLeft:10}}>{this.props.item?.price}</Text>
                <TouchableOpacity style={{borderRadius: 5, borderWidth: 0.5, borderColor: 'white', width: 80, height: 30, justifyContent: 'center', alignItems: 'center', margin: 10, marginTop: 20}}>
                    <Text style={{color: 'white'}}>Ver mais</Text>
                </TouchableOpacity>
          </View>

          <Text style={{color:'grey', margin:10}}>{moment(this.props.item?.date).format('ll')}.</Text>
        </View>
    );
  }
}