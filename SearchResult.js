import React from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity} from 'react-native';


export default class SearchResult extends React.Component {
 static navigationOptions = {
    title: 'SearchResult',
  };
  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.searchResultText}>도봉구 도봉동 도봉산역 으로부터 300m 이내 카페 랜덤검색 결과</Text>
          <Image
          style={{height: 350}}
          source={{uri:'http://images.huffingtonpost.com/2017-04-03-1491194782-7689759-qpdms3.PNG'}} />
          <Text style={styles.placeName}>투썸플레이스</Text>
          <Text>위치 : 논현동 어쩌구 저쩌구......</Text>
        </View>

        <View style={styles.section2}>
          <View style={styles.buttonWrap}>
          <TouchableOpacity
                   style={styles.mapButton}
                   onPress={() => this.props.navigation.navigate('ShowMap')}>
                   <Text >지도보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
                   style={styles.backButton}
                   onPress={() => this.props.navigation.navigate('Category')}>
                   <Text>뒤로가기</Text>
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
    flex:3
  },
  section2:{
    flex:1
  },
  searchResultText:{
    marginTop:20,
    marginBottom:10
  },
  mapButton:{
    backgroundColor: 'pink',
    padding: 20,
    margin:20
  },
  backButton:{
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