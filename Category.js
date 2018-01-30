import React from 'react';
import { StyleSheet, Text, View,TextInput,Alert, Button ,borderRadius,TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedScope:null,
      isSelectedDestination:null
    };
  }

  static navigationOptions = {
    title: 'Category',
  };


  

  render() {
   
    return (<LinearGradient colors={['#eac6f2','#9f9ff2']}  style={styles.container}>
        
         
          <View style={styles.section1}>
            <Text style={styles.title}>Title</Text>
          </View>
          
          <View style={styles.section2}> 
            <Text style={styles.currentPositionText}>현재위치 : 도봉구 도봉동 도봉산역 으로부터</Text>
            <View style={styles.scopeButtonWrap}>
                <TouchableOpacity
                   style={(this.state.isSelectedScope==1)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedScope:1})}}>
                   <Text>400m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedScope==2)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedScope:2})}}>
                   <Text>800m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedScope==3)?styles.scopeButtonSelected:styles.scopeButton}
                   onPress={()=>{this.setState({isSelectedScope:3})}}>
                   <Text>1500m</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryButtonWrap}>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='cafe')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'cafe'})}
                   }>
                   <Text>카페</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='restaurant')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'restaurant'})}
                   }>
                   <Text>레스토랑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={(this.state.isSelectedDestination=='bar')?styles.categoryButtonSelected:styles.categoryButton}
                   onPress={
                    ()=>{this.setState({isSelectedDestination:'bar'})}
                   }>
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
      </LinearGradient>
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
  }

});
