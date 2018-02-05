import React from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity,Linking,Button,Dimensions } from 'react-native';
import {LinearGradient} from 'expo';

export default class SearchResult extends React.Component {
 

 static navigationOptions = {
    title: 'SearchResult',
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
  };

 _handlePress = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.props.navigation.state.params.lat},${this.props.navigation.state.params.lat}&query_place_id=${this.props.navigation.state.params.placeId}`);
   
  };

  render() {
  
   //console.log('여기의 props들,,,',this.props.navigation.state.params);
   var currentAddressName = this.props.navigation.state.params.currentAddressName;
   var pickOneRandomPlaceName = this.props.navigation.state.params.name;

   var selectedRadius = this.props.navigation.state.params.selectedRadius;
   var selectedDestination=this.props.navigation.state.params.selectedDestination;
   var destinationPosition = this.props.navigation.state.params.destinationPosition;
   var photoReference = this.props.navigation.state.params.photoReference;
   var photoLink = this.props.navigation.state.params.photoLink;

   const image = (photoReference !== '사진이없어요') ?
                   {uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyAP6HlsLehFy7XvVVImDzPcSQdMIYtnzug`} :
                     {uri:'http://www.taekwangsnc.com/new/shop/img/no_image.png'};
                    

    return (
      <LinearGradient colors={['#eac6f2','#9f9ff2']}  style={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.searchResultText}> {currentAddressName} 로부터 {selectedRadius}m 내 있는 {selectedDestination} 중 Pickmon의 선택 결과 입니다.</Text>
          <View style={{flex:8}}>
            <Image style={styles.searchResultImage}
             source={image} />
          </View>
          <Text style={styles.placeName}>{pickOneRandomPlaceName}</Text>
          <Text>{destinationPosition}</Text>
        </View>

        <View style={styles.section2}>
          <View style={styles.buttonWrap}>
          <TouchableOpacity
                   style={styles.mapButton}
                   onPress={this._handlePress}>
                   <Text >길찾기</Text>
          </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },section1:{
    margin:15,
    flex:5,
  },
  section2:{
    flex:1
  },
  searchResultText:{
    marginTop:80,
    marginBottom:15,
    flex:1
  },
  mapButton:{
    backgroundColor: '#e6c5f1',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  buttonWrap:{
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  placeName:{
    marginTop:15,
    fontSize:20,
    fontWeight:'bold'
  },
  searchResultImage:{
    flex:1,
    justifyContent:'center'

  }
});