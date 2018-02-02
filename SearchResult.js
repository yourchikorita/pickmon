import React from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity} from 'react-native';


export default class SearchResult extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      photoReference:'ttttttfirst'
     
    };
  }

 static navigationOptions = {
    title: 'SearchResult',
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
  };

  render() {
   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
   console.log('여기의 props들,,,',this.props.navigation.state.params);
   var currentAddressName = this.props.navigation.state.params.currentAddressName;
   var pickOneRandomPlaceName = this.props.navigation.state.params.name;
   var selectedRadius = this.props.navigation.state.params.selectedRadius;
   var selectedDestination=this.props.navigation.state.params.selectedDestination;
   var lat = this.props.navigation.state.params.lat;
   var photoReference = this.props.navigation.state.params.photoReference;
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.searchResultText}> {currentAddressName} 로부터 {selectedRadius}m 내 있는 {selectedDestination} 중 Pickmon의 선택 결과 입니다.</Text>
          <Image
          style={{height: 350}}
          source={{uri:'http://images.huffingtonpost.com/2017-04-03-1491194782-7689759-qpdms3.PNG'}} />
          <Text style={styles.placeName}>{pickOneRandomPlaceName}</Text>
          <Text>위치 : {lat}</Text>
        </View>

        <View style={styles.section2}>
          <View style={styles.buttonWrap}>
          <TouchableOpacity
                   style={styles.mapButton}
                   onPress={() => this.props.navigation.navigate('ShowMap')}>
                   <Text >지도보기</Text>
          </TouchableOpacity>
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
    marginTop:15
  }
});