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
        <View style={{marginBottom:10, backgroundColor: 'red'}}>
            <View style={{width:screenWidth, height:60, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07}}>
                    <Image source={{uri: this.props.item?.photo}} style={{width:40, height:40, borderRadius:20, margin:15}} />
                    <Text style={{fontWeight: '400', fontSize:16}}>{this.props.item?.username}</Text>
                <Text style={{margin:15}}>{moment(this.props.item?.date).format('ll')}</Text>
            </View>

        {/*this is our bottom bar*/}
          
          <View style={{flexDirection: 'row', marginTop:5, color: 'white'}}>
                <Text style={{fontWeight: 'bold', marginLeft:10}}>{this.props.item?.title} </Text>
                <Text>{this.props.item?.description}</Text>
          </View>

          <Text style={{color:'grey', margin:10}}>{moment(this.props.item?.date).format('ll')}.</Text>
        </View>
    );
  }
}