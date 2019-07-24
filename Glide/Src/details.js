import React , {Component} from "react";
import { View, Text , ScrollView , Image ,Dimensions} from "react-native";
const imageHeight =  Dimensions.get('window').height; 
export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            getData:this.props.navigation.getParam('data' , 'not get')
        }
    }
  render() {
    return (
      <ScrollView
      style={{
        flex:1,
        backgroundColor: '#E0E0E0',
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <View style={{flex:1 ,marginHorizontal:5 }}>
      <Text style={{fontSize:20 , fontWeight:'bold', color:"green" , textAlign:'center'}}>Movie Name: 
      <Text style={{fontSize:20 , fontWeight:'bold', color:"green" , textAlign:'center'}}> {this.state.getData.item.title}</Text>
      </Text>
        <Image 
     style={{ height: imageHeight*0.7, width: "100%" ,alignSelf: 'center',}}
     resizeMode='stretch'
     source={{uri: this.state.getData.item.backdrop_path?`https://image.tmdb.org/t/p/w500/${this.state.getData.item.poster_path}`:`https://image.tmdb.org/t/p/w500/${this.state.getData.item.poster_path}`}}
      />
        <Text style={{fontSize:20 , fontWeight:'bold', color:"green" , textAlign:'center', marginTop:10}}>A plot synopsis:</Text>
       <Text style={{fontSize:16 ,marginTop:10 }}>{this.state.getData.item.overview}</Text>
       <Text style={{fontSize:16 , marginTop:10 }}>User Rating: 
       <Text style={{fontSize:16 , }}>{this.state.getData.item.vote_average} </Text> 
        </Text> 
        <Text style={{fontSize:16 , marginVertical:10 }}>release_date: 
       <Text style={{fontSize:16 , }}>{this.state.getData.item.release_date } </Text> 
        </Text>        
 </View>
 </ScrollView>
 
    );
  }
}