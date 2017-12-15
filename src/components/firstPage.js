import React ,{Component} from 'react';
import  {View , Text ,StyleSheet,Image,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input ,
         Button ,Label,Body,Title,Icon,Left,Right,Card,CardItem,Thumbnail } from 'native-base';
         import { LinearGradient } from 'expo';

import { Col, Row, Grid } from 'react-native-easy-grid';
import DatePicker from 'react-native-datepicker';
import AppFooter from './appFooter.js';
 export default class FirstPage extends Component  // DateAndName
{

  static navigationOptions = {
    header: null
  };

    constructor(props)
    {
        super(props);
        console.ignoredYellowBox = [
  'Setting a timer'
  ];
        this.state = {
                      experienceDescription:"",
                      title:"",
                      date:"",
                      today: new Date()
                     }

    }
    render()
    {
        const {navigate,goBack}= this.props.navigation;


return(
 <Container style={styles.container}>
    <LinearGradient
             colors={['#56CCF2','#2F80ED']}
             style={{ height:'100%'}}
    >
    <Grid style={{flex:1}}>
        <Row style={styles.firstRow}>
          <Form style={styles.form}>
                <Label style={{fontWeight:'bold', color:'white',top:30}}>
                   Give  name to your Experience
                </Label>
                  <Item regular  style={styles.item}>
                      <Input placeholder="Type Here"
                           maxLength={20}
                           placeholderTextColor='white'
                           style={{color:'white',textAlign:'center'}}
                           onChangeText={(title)=> this.setState({title:title})}
                      />
                  </Item>
                  <Item regular style={styles.itemDescription}>
                      <Input placeholder="Describe your experience"
                         numberOfLines={3}
                          multiline={true}
                          maxLength={320}
                          placeholderTextColor='white'
                          style={{color:'white',textAlign:'center'}}
                          onChangeText={(exp)=> this.setState({experienceDescription:exp})}
                      />
                 </Item>
          </Form>
          </Row>
          <Row style={styles.secondRow}>
            <DatePicker
              style={styles.datepicker}
              mode="date"
              placeholder=" select date to start of experience"
              date={this.state.date}
              placeholderTextColor='white'
              format="DD-MM-YYYY"
              minDate={this.state.today}
              maxDate="05-06-2020"
              androidMode='calendar'
              hideText={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {this.setState({date:date})}}
              customStyles={{
                placeholderText:
                {
                  color:'white',
                },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 10
                },
                dateInput: {
                    borderWidth:0.5,
                    borderColor:'white',
                    borderRadius: 10,



                },
                dateText: {color: 'white',}
              }}
          />
            </Row>
    </Grid>
      <Button style={styles.button}
        onPress={() => navigate('tab2',{
          name:this.state.title,
          date:this.state.date,
          experienceDescription:this.state.experienceDescription
        })}
      >
        <Label style={styles.text}>Avanti</Label>
    </Button>
    <AppFooter  navigate={navigate} goBack= {goBack}  />
  </LinearGradient>
</Container>
  );
 }
}

const styles =StyleSheet.create({
    container:
    {
        backgroundColor:'#edae23',
         height:Dimensions.get('window').height,
         width:(Dimensions.get('window').width)
    },

    firstRow:
    {
      flex:1,
      justifyContent:'center'
    },

    secondRow:
    {
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'flex-start',
      top:10
    },

    form:
    {

            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'center',

    },

    item:
    {
        width:'90%',
        height:60,
        top:40,
        marginBottom:20,


    },

    itemDescription:
    {
      width:'90%',
      height:100,
      top:40,
      marginBottom:10,
    },

    datepicker:
    {

        width: 300,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-end',

    },

    button:
    {
        backgroundColor:'blue',
        height:50,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
        backgroundColor:'#4682B4',

    },
    text:
    {
      fontSize:20,
      alignSelf:'center',
      color:'white',
    },

});
