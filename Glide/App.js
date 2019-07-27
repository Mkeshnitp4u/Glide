import React, { Component } from 'react';
import details from './Src/details'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import HttpUtill from './Src/Common/HttpUtils/httpUtils'
import {FETCH_POPULAR_MOVIE , FETCH_MOVIE_LIST , FETCH_HEIGHEST_RATED_MOVIE} from './Src/Common/HttpUtils/constant'
var tempArray=[]
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import {createAppContainer , createStackNavigator} from 'react-navigation'
class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      isVisible:false,
      spinner:true,
      dataArray:'',
      ratePage:0,
      rate:false,
      popularPage:0,
      popular:false,
      page:1,
      sortBy:'',
      search:'',
      showFullList:true,
      dataSearch:false
    }
  }
 static navigationOptions = {
    header: null
  }
  updateSearch = search => {
    this.setState({ search });
  };
  renderHeader=()=>{
    const { search } = this.state;

    return(
    <SearchBar
    ref={search => this.search = search}
    inputContainerStyle={{backgroundColor:'#FFFFFF'}}
    containerStyle={{backgroundColor:'#E0E0E0'}}
    lightTheme={true}
    round={true}
    placeholder="Type Here..."
    onChangeText={text => this.SearchFilterFunction(text)}   
    value={search}
    />
      )
  }

  SearchFilterFunction=(text)=> {
    const newData = tempArray.filter(function(item) {
      const itemData = item.original_title ? item.original_title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSearch:true,
      dataArray: newData,
      search:text,
    });
  }
  // ListViewItemSeparator=()=>{
  //   this.setState({showFullList:false},()=>{tempArray= this.state.dataSource})

  // }
  renderItem=(item)=>{
    return(
     <View style={{flex:1 , flexDirection:'row' }}>
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {data:item})}>
        <Image 
      style={{width:screenWidth*0.46, height:screenHeight*0.3,       
      alignSelf: 'center',
    }}
    resizeMode='cover'
    source={{uri: item.item.backdrop_path?`https://image.tmdb.org/t/p/w500/${item.item.backdrop_path}`:`https://image.tmdb.org/t/p/w500/${item.item.poster_path}`}}
      />
      <Text 
      numberOfLines={1}
      style={{textAlign:"center", marginBottom:10 , fontWeight:'bold', fontSize:16}}>{item.item.original_title}</Text>
      </TouchableOpacity>
     </View>)
  }
  componentDidMount=()=>{
    this.fetchMovieList()
  }

  fetchMovieList=()=>{
    let mThis = this
    let url = FETCH_MOVIE_LIST+this.state.page
    HttpUtill.getAPICallWithHeader(url , function(onSuccess){
      if(onSuccess.length<=3){
        tempArray.push(...onSuccess)
        mThis.setState({page: mThis.state.page + 1},()=>{mThis.fetchMovieList()})  
      }
      else{
        tempArray.push(...onSuccess)
        mThis.setState({spinner: false , dataArray: tempArray})
      }
    }, 
    function(onFailure){
      mThis.handleLoadMore()
   console.log(onFailure)
    })
  }

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1 , dataSearch:false}, () => {
      this.fetchMovieList();
    });
  };

  fetchHeighestPopular=()=>{
    var mThis=this
    this.setState({page:this.state.page +1},()=>{
      let url = FETCH_POPULAR_MOVIE+this.state.page 
      HttpUtill.getAPICallWithoutHeader(url , function(onSuccess){
        if(onSuccess.length<=3){
          tempArray.push(...onSuccess)
          mThis.setState({page: mThis.state.page + 1},()=>{mThis.fetchHeighestPopular()})  
        }  else{
          tempArray.push(...onSuccess)
          mThis.setState({spinner: false , dataArray: tempArray})
        }
      }, 
      function(onFailure){
        mThis.setState({page: mThis.state.page + 1},()=>{
          mThis.fetchHeighestPopular()
        })
        console.log(onFailure)   
      }
      )
    })
  }

  heighestPopular=()=>{
  let mThis = this
  tempArray=[]
  this.setState({sortBy:"Most Popular",dataSearch:false ,rate:false,popular:true,spinner:true , isVisible:!this.state.isVisible ,page:0, dataArray:tempArray},()=>{
    mThis.fetchHeighestPopular()
  })
  }

  fetchHeighestRated=()=>{
    var mThis=this
    this.setState({page:this.state.page +1},()=>{
      let url = FETCH_HEIGHEST_RATED_MOVIE+this.state.page 
      HttpUtill.getAPICallWithoutHeader(url , function(onSuccess){
        if(onSuccess.length<=3){
          tempArray.push(...onSuccess)
          mThis.setState({page: mThis.state.page + 1},()=>{mThis.fetchHeighestRated()})  
        }  else{
          tempArray.push(...onSuccess)
          mThis.setState({spinner: false , dataArray: tempArray})
        }
      }, 
      function(onFailure){
        mThis.setState({page: mThis.state.page + 1},()=>{
          mThis.fetchHeighestRated()
        })
        console.log(onFailure)   
      }
      )
    })
  }

  heighestRated=()=>{
    let mThis = this
  tempArray=[]
  this.setState({sortBy:"Heighest Rated",dataSearch:false,popular:false,rate:true,spinner:true , isVisible:!this.state.isVisible ,page:0, dataArray:tempArray},()=>{
    mThis.fetchHeighestRated()
  })
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.spinner?<View style={{justifyContent:'center', alignItems:'center', flex:1}}>
        <ActivityIndicator size="large" color="#0000ff" />
        </View>:
        <View style={styles.main}>
     <View style={{marginTop:30, height:"5%", width:"100%", justifyContent:'center',flexDirection:'row', alignItems:'center' }}>
     <Text style={{fontWeight:'bold', fontSize:25 , color:'#008B8B'}}>Movie List </Text>
     <TouchableOpacity onPress = {() => {this.setState({ isVisible: true})}} style={{position:'absolute', right:10}}>
      <Image 
      style={{width:25 , height:25}}
      source = {require('./Src/Common/Image/settingIcon.png')} 
      />
      </TouchableOpacity>
     </View>
    {this.state.sortBy==""?null:
     <Text style={{fontWeight:'bold', fontSize:14 , color:'#008B8B'}}>Sort By: 
     <Text style={{fontWeight:'bold', fontSize:18 , color:'#008B8B'}}>{ this.state.sortBy} </Text>
     </Text>
    }
     <Modal visible={this.state.isVisible}
     transparent={true}
     >
      <TouchableOpacity  style={{flex:1}} onPress={()=>{this.setState({isVisible:false})}}>
     <View style={{backgroundColor:'black', marginTop:30, height:"15%", width:"40%", justifyContent:'center', alignItems:'center', position:'absolute', right:10,}}>
          <View style={{width:'100%', height:'30%', justifyContent:'center', alignItems:'center',}}>
             <Text style={{fontWeight:'bold', fontSize:18 , color:'white'}}>Sort By:</Text>
           </View>
           <View style={{width:'100%', height:1}}></View>
           <View style={{width:'100%', height:'35%',justifyContent:'center', alignItems:'center',}}>
           <TouchableOpacity
            style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}
            onPress={()=>this.heighestPopular()}>
             <Text style={{fontWeight:'bold', fontSize:18 , color:'white'}}>Most Popular</Text>
             </TouchableOpacity>  
           </View>
           <View style={{width:'100%', height:'35%' }}>
            <TouchableOpacity
            style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}
            onPress={()=>this.heighestRated()}>
              <Text style={{fontWeight:'bold', fontSize:18 , color:'white'}}>Heighest Rated</Text>
            </TouchableOpacity>         
            </View>
      </View>
      </TouchableOpacity>
        </Modal>
     <View style={{  width:"100%"  }}>
     <FlatList
   data={this.state.dataArray}
   //ItemSeparatorComponent={this.state.dataSource && this.ListViewItemSeparator()}
   renderItem={this.renderItem}
   keyExtractor={(item , index)=>index}
   numColumns={2}
   stickyHeaderIndices={[0]}
   onEndReachedThreshold={0.05}
   ListHeaderComponent = {this.renderHeader()}
   onCancel={()=>this.setState({dataArray:tempArray ,search:''})}
   onEndReached={(distanceFromEnd)=>{
     if(!this.state.dataSearch){
      if(this.state.popular){
        this.fetchHeighestPopular()
      }else if(this.state.rate){
        this.fetchHeighestRated()
      }else{
      this.handleLoadMore()
      }
     }
    
   }
  }
   />
     </View>
     </View>
        }
      </View>
      
    )
  }
}
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Details: {screen:details}
});
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
main:{
 flex:1,
 alignItems:'center',
 paddingHorizontal:5,
 backgroundColor:"#E0E0E0"
},
});