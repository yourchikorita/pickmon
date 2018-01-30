import React from 'react';
import { StyleSheet, View,Text,Image,TouchableOpacity} from 'react-native';

export default class ShowMap extends React.Component {
  static navigationOptions = {
    title: 'ShowMap',
  };
  render() {
   
    return (
      <View style={styles.container}>

        <View style={styles.mapPicture}>
        <Image
          style={{flex:1,marginTop:20}}
          source={{uri:'http://cfile22.uf.tistory.com/image/240B614559366C2F295E09'}} />
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Category')}
                   style={styles.homeButton}
                   >
                   <Text >처음화면가기,!</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapPicture:{
    margin:20,
    flex:4
   
  },
  buttonWrap:{
    flex:1,
    justifyContent:'space-around'
  },
  homeButton:{
    backgroundColor: 'pink',
    padding: 20,
    margin:20
  }
});