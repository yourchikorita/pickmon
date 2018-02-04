import React from 'react';
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';

export default class NoResult extends React.Component {

  render() {
   
    return (
      <View style={styles.container}>
        <Text >도봉역으로부터 350m내 카페 가 없습니다.</Text>
        <TouchableOpacity
                   style={styles.homeButton}
                   >
                   <Text >처음화면가기</Text>
          </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  
  homeButton:{
   
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'pink',
    padding: 20,
    margin:20
    
  }
});