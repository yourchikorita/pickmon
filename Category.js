import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert, Button ,borderRadius,TouchableOpacity,Image} from 'react-native';
import {LinearGradient} from 'expo';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedRadius:null,
      isSelectedDestination:null,
      myCurrentPosition:null,
      currentLatitude:null,
      currentLongitude:null,
      destinationPosition:null,
      photoReference:'ttttttfirst'
     
    };
  }

    static navigationOptions = {
    title: 'Home',
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    
     };

   componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getAddress(position.coords.latitude,position.coords.longitude);
        this.setState({currentLatitude:position.coords.latitude,currentLongitude:position.coords.longitude});
      }
      );
    }

    getAddress(lat,long){
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=ko&key=AIzaSyBvDaOsK-zIfGOg92DbiDrgKeiFsROad1w`)
    .then((responseJson) => {
      return responseJson.json();
    })
    .then((responseJson) => {
      this.setState({myCurrentPosition:responseJson.results[2].formatted_address});
    })
    .catch((error) => {
      console.error(error);
    });
    }

     getDestinationAddress(lat,long){
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=ko&key=AIzaSyBvDaOsK-zIfGOg92DbiDrgKeiFsROad1w`)
    .then((responseJson) => {
      return responseJson.json();
    })
    .then((responseJson) => {
      this.setState({destinationPosition:responseJson.results[2].formatted_address});
      console.log('getDestinationAddress 안..!!!!!',this.state.destinationPosition);
    })
    .catch((error) => {
      console.error(error);
    });
    }

    //location 으로부터 radius안에 type의 결과를 배열로 보여줌,,이미지없으면 없는이미지..
    getplaces(lat,long,radius,type){
      return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=${type}&key=AIzaSyAP6HlsLehFy7XvVVImDzPcSQdMIYtnzug`)
    .then((response) => {
      return response.json();
    }).
    then((responseJson)=>{
       console.log('getplace 속#########################');
 
       var placeArray = responseJson.results;
       var pickOneRandom = this.random_item(placeArray);
       var pickOneRandomPlaceName = pickOneRandom.name;
       var lat = pickOneRandom.geometry.location.lat;
       var long=pickOneRandom.geometry.location.lng;
    this.getDestinationAddress(lat,long);
       

       (pickOneRandom.photos == undefined) ? 
       this.setState({photoReference:'사진없음'}) : 
       this.setState({photoReference:pickOneRandom.photos[0].photo_reference})
   
       this.props.navigation.navigate('SearchResult',{
        currentAddressName:this.state.myCurrentPosition,
        name:pickOneRandomPlaceName,
        selectedRadius:this.state.isSelectedRadius,
        selectedDestination:this.state.isSelectedDestination,
        lat:lat,
        destinationAddress: this.state.destinationPosition,
        photoReference:this.state.photoReference
       

        });
 console.log('끝난부분#########################');

    })
    .catch((error) => {
      console.error(error);
    });
    }

    random_item(items){
      return items[Math.floor(Math.random()*items.length)];
    }

  render() {
   
   return (
      <LinearGradient colors={['#eac6f2','#9f9ff2']}  style={styles.container}>
          <View style={styles.section1}>
             <Image  resizeMode="contain" style={styles.titleImage} source={require('./assets/icon.png')}/>
             <Text style={styles.title}>Pickmon</Text>
          </View>
          
          <View style={styles.section2}> 
            <Text style={styles.currentPositionText}>현재 위치 : {this.state.myCurrentPosition} 으로부터</Text>
            <View style={styles.scopeButtonWrap}>
                <TouchableOpacity
                   style={(this.state.isSelectedRadius==350)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedRadius:350}) } }>
                   <Text>350m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedRadius==800)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedRadius:800})}}>
                   <Text>800m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedRadius==1500)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedRadius:1500})}}>
                   <Text>1500m</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryButtonWrap}>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='cafe')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'cafe'})}
                   }>
                   <Text>cafe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='restaurant')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'restaurant'})}
                   }>
                   <Text>restaurant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='bar')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'bar'})}
                   }>
                   <Text>bar</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section3}>
            <View style={styles.randomButtonWrap}>
            <TouchableOpacity 
               style={styles.randomButton}
               onPress={
                ()=>{
                   (this.state.isSelectedScope !==null && this.state.isSelectedDestination !== null) ?
                   this.getplaces(this.state.currentLatitude,this.state.currentLongitude,this.state.isSelectedRadius,this.state.isSelectedDestination) :
                   Alert.alert('선택해주세요')
                 }

              }>
               <Text style={styles.randomButtonText}>랜덤 검색</Text>
            </TouchableOpacity>
            </View>
          </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6e5fc'
  },
  titleImage:{
   
   flex:4,
   marginTop:90,

  },
  section1:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:2,
   
  },
  section2:{
    flex:2,
    
    justifyContent:'center'
    
  },
  section3:{
    flex:1
  },
  title:{
    flex:1,
    fontSize:30,

  },
  currentPositionText:{
    textAlign:'center',
    margin:20
  },
  scopeButton:{
    backgroundColor: '#c5c7f1',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  scopeButtonSelected:{
    backgroundColor: '#c4f0ef',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  scopeButtonWrap:{
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  categoryButtonWrap:{
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  randomButtonWrap:{
    margin:30
  },
  categoryButton:{
    backgroundColor: '#c5c7f1',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  categoryButtonSelected:{
    backgroundColor: '#c4f0ef',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  randomButton:{
    backgroundColor: '#eac6f2',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  randomButtonText:{
    textAlign:'center'
  }

});
