import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert, Button ,borderRadius,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
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
      photoReference:null,
      photoLink:null,
      isLoad:false
     
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
      this.setState({isLoad:true});
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
    })
    .catch((error) => {
      console.error(error);
    });
    }

    //현재위치 으로부터 radius안에 type의 결과를 배열로 보여줌,,이미지없으면 없는이미지..
    async getplaces(lat,long,radius,type){
      try{
         const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=${type}&key=AIzaSyAP6HlsLehFy7XvVVImDzPcSQdMIYtnzug`);
         const responseJson = await response.json();
      
        
        (responseJson.results.length == 0 ) ?
        Alert.alert('해당 범위 내 선택한 장소가 없습니다') :
         <ActivityIndicator size="large" color="#0000ff" /> ; 

         var placeArray = responseJson.results;
         var pickOneRandom = this.random_item(placeArray);
         var pickOneRandomPlaceName = pickOneRandom.name;
         var lat = pickOneRandom.geometry.location.lat;
         var long=pickOneRandom.geometry.location.lng;
         var isPhoto = pickOneRandom.photos;
         var pickOneRandomPlaceId = pickOneRandom.place_id;
         
      
         (isPhoto !== undefined) ? 
         this.setState({photoReference:isPhoto[0].photo_reference,photoLink:isPhoto[0].html_attributions[0]})  :
         this.setState({photoReference:'사진이없어요'})

         await this.getDestinationAddress(lat,long);

         this.props.navigation.navigate('SearchResult',{
         currentAddressName:this.state.myCurrentPosition,
         name:pickOneRandomPlaceName,
         selectedRadius:this.state.isSelectedRadius,
         selectedDestination:this.state.isSelectedDestination,
         lat:lat,
         lng:long,
         destinationPosition:this.state.destinationPosition,
         photoReference:this.state.photoReference,
         photoLink:this.state.photoLink,
         placeId: pickOneRandomPlaceId,
         });

       }catch(err){  
        console.log('fetch failed',err);
       }
    }

    random_item(items){
      return items[Math.floor(Math.random()*items.length)];
    }

  render() {
    
   var myActivityIndicator =  <ActivityIndicator size="large" color="#0000ff" />;
   var myCurrentLocation = <Text style={styles.currentPositionText}>현재 위치 : {this.state.myCurrentPosition} 으로부터</Text>;
   
   return (
      <LinearGradient colors={['#e6c5f1','#9f9ff2']}  style={styles.container}>
          <View style={styles.section1}>
             <Image  resizeMode="contain" style={styles.titleImage} source={require('./assets/icon.png')}/>
             <Text style={styles.title}>Pickmon</Text>
          </View>
          
          <View style={styles.section2}> 
          {this.state.isLoad == true ? myCurrentLocation : myActivityIndicator}
            
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
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='atm')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'atm'})}
                   }>
                   <Text>atm</Text>
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
                   Alert.alert('선택 해주세요')
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
    backgroundColor: '#d6e5fc',
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
