import React from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity,Linking,Button } from 'react-native';


export default class SearchResult extends React.Component {
 

 static navigationOptions = {
    title: 'SearchResult',
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
  };




 _handlePress = () => {
    Linking.openURL('https://maps.google.com/maps/contrib/103459249503880993115/photos');
   
  };




  render() {
   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
   console.log('여기의 props들,,,',this.props.navigation.state.params);
   var currentAddressName = this.props.navigation.state.params.currentAddressName;
   var pickOneRandomPlaceName = this.props.navigation.state.params.name;
   var selectedRadius = this.props.navigation.state.params.selectedRadius;
   var selectedDestination=this.props.navigation.state.params.selectedDestination;
   var destinationPosition = this.props.navigation.state.params.destinationPosition;
   var photoReference = this.props.navigation.state.params.photoReference;
   var photoLink = this.props.navigation.state.params.photoLink;
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.searchResultText}> {currentAddressName} 로부터 {selectedRadius}m 내 있는 {selectedDestination} 중 Pickmon의 선택 결과 입니다.</Text>
          <Image
          style={{height: 350}}
          source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyAP6HlsLehFy7XvVVImDzPcSQdMIYtnzug`}} />
          <Text style={styles.placeName}>{pickOneRandomPlaceName}</Text>
          <Text>{destinationPosition}</Text>
        </View>

        <View style={styles.section2}>
          <View style={styles.buttonWrap}>
          <TouchableOpacity
                   style={styles.mapButton}
                   onPress={() => this.props.navigation.navigate('ShowMap')}>
                   <Text >지도보기</Text>
          </TouchableOpacity>
         <Button
          title="Open URL with ReactNative.Linking"
          onPress={this._handlePress}
         
        />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },section1:{
    margin:15,
    flex:5
  },
  section2:{
    flex:1
  },
  searchResultText:{
    marginTop:80,
    marginBottom:15
  },
  mapButton:{
    backgroundColor: 'pink',
    padding: 20,
    margin:20
  },
  buttonWrap:{
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  placeName:{
    marginTop:15,
    fontSize:20,
    fontWeight:'bold'
  }
});