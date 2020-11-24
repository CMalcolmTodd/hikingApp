/**
 * This Screen should display the information about a particular users goals accordingly. 
 * It should pull from the database and populate sections. 
 * 
 * Improvements: 
 * Fix error lol Nov 23 
 */
import React, { Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import { StackRouter } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import {ProgressBar} from '@react-native-community/progress-bar-android';


  class GoalScreen extends Component {
    state = {
        myGoals: {
          DistanceHiked:0,
          ElevationClimbed: 0,
          HikesCompleted: 0,
          DistanceGoal:0,
          ElevationGoal: 0,
          HikeCountGoal: 0,
          DaysToComplete: 0,
        }
    }

    constructor(props){
      super(props);
      this.getUser();
      var clientId = firebase.auth().currentUser.uid;
      this.getUser(clientId);
      this.subscriber = firestore().collection('Profiles')
      .doc(clientId).onSnapshot( doc => {
          this.setState({
              myGoals: {
                DistanceHiked: parseInt(doc.data().DistanceHiked),
                ElevationClimbed: parseInt(doc.data().ElevationClimbed),
                HikesCompleted: parseInt(doc.data().HikesCompleted),
                DistanceGoal: parseInt(doc.data().DistanceGoal),
                ElevationGoal: parseInt(doc.data().ElevationGoal),
                HikeCountGoal: parseInt(doc.data().HikeCountGoal),
                DaysToComplete: parseInt(doc.data().DaysToComplete),
              }
          });
      })
  }

  getUser = async() => {
    const userDocument = await firestore().collection('Profiles')
        .doc('ProfileTemplate').get();
    console.log(userDocument);
  }
  onPressAdd = () => {
    if(this.state === '') {
        alert('task name is blank');
        return;
    }
    this.ref.update({
        DistanceGoal: this.state.myGoals.DistanceGoal,
        ElevationGoal: this.state.myGoals.ElevationGoal,
        HikeCountGoal: this.state.myGoals.HikeCountGoal,
        DaysToComplete: this.state.myGoals.DaysToComplete,

    }).then((data) => {
        console.log(`added data = ${data}`);
        this.setState({
            Distance:'',
            Elevation:'',
            NumHikes:'',
            DaysToComplete:'',
            loading: true
        });
    }).catch((error) => {
        console.log(`error adding Firestore document = ${error}`);
        this.setState({
            Distance:'',
            Elevation:'',
            NumHikes:'',
            DaysToComplete:'',
            loading: true
        });
    });
}


render() {
 
    return (
      <>
        <View style={styles.container}>
        <ImageBackground 
          source={ {uri: "https://www.srectrade.com/assets/img/public_site/homepage/stock-illustration-23256124-stock-market-chart.jpg" }}
          resizeMode='cover' 
          style={styles.backgroundImage}
          imageStyle={{opacity: 0.15}}
        >            
          <View style={styles.box}>
            <View style={styles.info}>
              <Text  style={styles.name}>Your Goal! </Text>
              
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{uri: "https://cdn2.iconfinder.com/data/icons/road-and-navigation/180/02-512.png"}} />
                    <Text>Distance</Text>
                    <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.DistanceGoal))/ 100}
                    />
                    <Text>{(parseInt(this.state.myGoals.DistanceGoal))} Km</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{uri: "https://cdn0.iconfinder.com/data/icons/travel-37/94/mountain-512.png"}} />
                    <Text>Elevation</Text>
                    <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.ElevationGoal))/ 100}
                    />
                      <Text>{(parseInt(this.state.myGoals.ElevationGoal))} </Text>
                </View>
                
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{uri: "https://image.flaticon.com/icons/png/512/55/55281.png"}} />
                    <Text>Days</Text>
                    <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.DaysToComplete))/ 100}
                    />
                    <Text>{(parseInt(this.state.myGoals.DaysToComplete))} </Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{uri: "https://static.thenounproject.com/png/204712-200.png"}} />
                    <Text>Hikes:</Text>
                    <Text>{parseInt(this.state.myGoals.HikeCountGoal)}</Text>
                    
                </View>
                
                
              </View>
            </View>
          </View>
          <View style = {styles.box2}>
          <View style={{flex: 1, flexDirection: 'column'}}>
          <View style = {{flexDirection: 'row'}, styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Distance: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "in km "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                      DistanceGoal: (parseInt(e) * 1000)
                     });
                     }
                 }/>
                    </View> 

                    <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Elevation: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "in km "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       ElevationGoal: (parseInt(e) * 1000)
                     });
                     }
                 }/>
                    </View> 

                    <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Number of Hikes: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "0 "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       HikeCountGoal: parseInt(e),
                     });
                     }
                 }/>
                    </View> 

                 <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Days to complete: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "0 "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       DaysToComplete: parseInt(e),
                     });
                     }
                 }/>
                    </View> 
                 
                 <TouchableOpacity
                    style = {styles.buttonContainer, styles.submitButton}
                    onPress={this.onPressAdd}
                    >
                    <Text style = {styles.buttonTextStyle}> Save </Text>
                 </TouchableOpacity>
                 
                 </View>
                 </View>

          </ImageBackground>
        </View>
      </>
     )
  }
}
export default GoalScreen; 

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#3C413E',
    marginTop: 0,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#3C413E",
  },
  separator: {
    marginTop: 30,
  },
  example: {
    marginVertical: 24,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    marginHorizontal: 60, 
    paddingHorizontal: 16,
    backgroundColor:"#BECEB4"
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },

  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  /********* trial ****************/
  icon:{
    width:30,
    height:30,
  },
  image: {
    width: 100,
    height:100
  },
  box: {
    backgroundColor: '#BECEB4',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    marginHorizontal: 20, 
    height: 140,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  box2: {
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: .2,
    marginHorizontal: 50, 
    paddingTop: 30,
    height: 400,
    width: 300,
    marginTop:20,
    shadowOffset: {
      height:1,
      width:-2

    },
    elevation:2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize:20,
    marginTop:10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop:10
  },
  iconContainer: {
    flex: 1,
    alignItems:'center'
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
    backgroundColor: '#3C413E',
    justifyContent: 'center',
    alignItems: 'center',
},
inputContainer:{
  borderBottomColor: '#453D5F',
  backgroundColor: '#BECEB4',
  borderRadius:30,
  borderBottomWidth: 1,
  width:300,
  height:45,
  marginBottom:20,
  flexDirection: 'row',
  alignItems:'center',

  shadowColor: "#808080",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
},
inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:300,
  borderRadius:30,
  backgroundColor:'transparent'
},
  submitButton: {
      backgroundColor: '#C98F39',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#C98F39',
      height: 60,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 70,
      marginRight: 10,
      marginTop: 0,
  },
  buttonTextStyle: {
    color: '#C9C8B9',
    paddingVertical:10,
    fontSize: 25,

  },
   TextStyle: {
    color: '#453D5F',
    paddingVertical:10,
    fontSize: 16,
    margin: 20,
  },
}); 