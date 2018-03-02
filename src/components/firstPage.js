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
    header: null,
    tabBarLabel:'Add',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" style={{fontSize:26,color: tintColor }}/>
    )
  };
    constructor(props)
    {
        super(props);

        this.state = {
                      experienceDescription:"",
                      title:"",
                      date:"",
                      today: new Date()
        }
      console.ignoredYellowBox = true;
    }
    render()
    {
        const {navigate,goBack}= this.props.navigation;


return(
<Content style={{ flex:1,backgroundColor:'red' }} scrollEnabled={false}>
 <Container style={styles.container}>
    <LinearGradient
             colors={['#56CCF2','#2F80ED']}
             style={{ height:'100%'}}
    >

    <Grid style={{flex:1}}>
        <Row style={styles.firstRow}>
          <Form style={styles.form}>

                  <Item regular  style={styles.item}>
                      <Input placeholder="Give name to your experience"
                           maxLength={20}
                           placeholderTextColor='white'
                           style={{color:'white',textAlign:'center'}}
                           onChangeText={(title)=> this.setState({title:title})}
                      />
                  </Item>
                  <Item regular style={styles.itemDescription}>
                      <Input placeholder="Describe with just a few words your experience"
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
            <Row style={styles.thirdRow}>
              <Button rounded iconLeft light style={styles.button}
                onPress={() => navigate('tab2',{
                  name:this.state.title,
                  date:this.state.date,
                  experienceDescription:this.state.experienceDescription
                })}
              >
                <Label style={styles.text}>Next</Label>
            </Button>
            </Row>

    </Grid>


  </LinearGradient>
</Container>
</Content>
  );
 }
}

const styles =StyleSheet.create({
    container:
    {
      //  backgroundColor:'#edae23',
        // height:Dimensions.get('window').height,
        //  width:(Dimensions.get('window').width)
    },

    firstRow:
    {
      flex:1,
      justifyContent:'center'
    },

    secondRow:
    {
    //  backgroundColor:'red',
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      top:10
    },

    thirdRow:
    {
      flex:0.5,
    //  backgroundColor:'red',
      justifyContent:'center',
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
        backgroundColor:'#feda4b',
      //  height:50,
        width:'90%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',


    },
    text:
    {
      fontSize:20,
      alignSelf:'center',
      color:'black',
    },

});
