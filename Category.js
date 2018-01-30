import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert, Button ,borderRadius,TouchableOpacity} from 'react-native';


export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isSelected:null};
  }

  static navigationOptions = {
    title: 'Category',
  };


  

  render() {
   
    return (
        <View style={styles.container}>
         
          <View style={styles.section1}>
            <Text style={styles.title}>어디가지?</Text>
          </View>
          
          <View style={styles.section2}> 
            <Text style={styles.currentPositionText}>현재위치 : 도봉구 도봉동 도봉산역</Text>
            <View style={styles.scopeButtonWrap}>
                <TouchableOpacity
                   style={(this.state.isSelected==1)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelected:1})}}>
                   <Text>400m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelected==2)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelected:2})}}>
                   <Text>800m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelected==3)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelected:3})}}>
                   <Text>1500m</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryButtonWrap}>
                <TouchableOpacity
                   style={styles.categoryButton}
                   onPress={this._onPressButton}>
                   <Text>카페</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={styles.categoryButton}
                   onPress={this._onPressButton}>
                   <Text>레스토랑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={styles.categoryButton}
                   onPress={this._onPressButton}>
                   <Text>바</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section3}>
            <View style={styles.randomButtonWrap}>
            <TouchableOpacity 
               style={styles.randomButton}
               onPress={() => this.props.navigation.navigate('SearchResult')}>
               <Text>랜덤 검색</Text>
            </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6e5fc'
  },
  section1:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  section2:{
    flex:2,
    
    justifyContent:'center'
    
  },
  section3:{
    flex:1
  },
  title:{
    fontSize:30
  },
  currentPositionText:{
    textAlign:'center',
    margin:20
  },
  scopeButton:{
    backgroundColor: 'pink',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  scopeButtonSelected:{
    backgroundColor: 'red',
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
    backgroundColor: 'pink',
    padding: 20,
    margin:20,
    borderRadius:25
  },
  randomButton:{
    backgroundColor: 'pink',
    padding: 20,
    margin:20,
    borderRadius:25
  }

});
