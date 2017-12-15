import React, { Component } from 'react';
import {AddActions} from '../actions/AddActions';
import { connect } from 'react-redux';
import { AppRegistry, Text,StyleSheet,View , Platform,Image } from 'react-native';
import {DrawerNavigator } from 'react-navigation';
import { Container, Content ,Header,Card,CardItem,Footer
        ,Left,Button,Icon ,Body,Right,Title,Font,Input,Label,
         Thumbnail,List,ListItem,Form,Picker,Item as FormItem} from 'native-base';


import DatePicker from 'react-native-datepicker';
const Item = Picker.Item;

 class NumberItem extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
                  selected1:"numero persone",
                  information :"",
                  city:"",
                  date:"",
                  CAP:"",
                }
  }


   onValueChange(value) {


    this.setState({
      selected1: parseInt(value) // Difficile passare int
    });
    this.props.updateParentState(parseInt(value));

  }

  render()
  {
    const number=["1","2","3","4","5","6","7"];


    return(
      <Picker
             style={{borderColor: '#2ac', alignSelf:'center',height:50,width:'88%'}}
              mode="dropdown"
              selectedValue={this.state.selected1.toString()}
              onValueChange= {(value) => {this.onValueChange(value)}}
            >
          {number.map((val, index) => {
              return <Item key={index} label={val} value={val} />
            })}


    </Picker>
    );
  }

}

 class myHome extends Component {

  constructor(props){

    super(props)
    this.state ={
                  name:"",
                  date:"",
                  city:"",
                  cap:"",
                  information:"",
                  number:"0"  ,
                  currentDay:new Date()
                }
  }



     updateState = (data)=> {
        this.setState({number: data})
    }




  render() {
    var numberArray=[1,2,3,4,5];


    console.log(numberArray);
    return (
    <Container>
      <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>

 <Body style={styles.body}>
      <Form style={styles.form}>
      <FormItem>
        <Icon name='people'/>
       <Input
         placeholder='Dai un nome alla tua esperienza! '
         onChangeText={(name)=>this.setState({name})}
      />
      </FormItem>
    </Form>

   <Form style={{width:'98%',flexDirection:'row',justifyContent:'flex-start'}}>
     <Icon name="calendar" style={{alignSelf:'center',marginLeft:11}}/>
           <DatePicker
              style={{width: '100%' ,bottom:4 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate= {this.state.currentDay}
              maxDate="2016-06-50"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}

             customStyles={{

                dateInput: {
                   marginRight:250,
                   top:4,
                   bottom:2,
                   left:0,
                   borderWidth: 0,
                  marginLeft: 0,
                },

                placeholderText:
                {
                  marginRight:250,
                  fontSize:18,
                  top:5,
                  color:'#A9A9A9'
                }

        }}
                onDateChange={(date) => {this.setState({date: date})}}
      />
  </Form>



      <Form style={styles.formNumber}>
               <Icon name='person' style={{left:0}}/>
              <NumberItem updateParentState={this.updateState}
              />
      </Form>

       <Form style={styles.form}>
            <FormItem style={{height:80}}>
              <Icon name='information-circle' />
              <Input
                onChangeText={(information) => this.setState({information})}
                placeholder= 'Informazioni'
                multiline = {true}
                numberOfLines = {4}
                />
        </FormItem>
    </Form>

    <Form style={styles.form}>
      <FormItem>
        <Icon name='image'/>
       <Input
         placeholder='Città'
         onChangeText={(city)=>this.setState({city})}
      />
      </FormItem>
    </Form>

     <Form style={styles.form}>
      <FormItem>
        <Icon name='checkmark-circle'/>
       <Input
         placeholder='CAP'
         onChangeText={(cap)=>this.setState({cap: parseInt(cap)})}
      />
      </FormItem>
    </Form>
     <Form style={styles.form}>
      <FormItem>
        <Icon name='ios-card'/>
       <Input
         placeholder='Indirizzo'
      />
      </FormItem>
    </Form>
   </Body>
 </Content>

   <Button primary style={styles.button}
      onPress={()=>this.props.AddActions(this.state)
      }
   >
     <Text style={{fontSize:20,color:'white'}}> Aggiungi  </Text>
   </Button>

  </Container>


    );
  }
}


const styles = StyleSheet.create({

header:
{
  backgroundColor:'#FFA500',
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',



},
body:
{
  top:10,
  display:'flex',
  flexDirection:'column',
  alignSelf:'center',
  width:'100%'
},

card :
{
  width:'98%'
},

form:
{
  width:'99%',
  alignSelf:'center'
},

formNumber:
{
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:'98%'
},

button:
{
  backgroundColor:'#B22222',
  width:' 95%',
  flexDirection:'row',
  bottom:10,
  alignSelf:'center',
  justifyContent:'center'

}




});



  export default connect(null,{AddActions})(myHome);
