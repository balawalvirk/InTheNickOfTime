import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ScrollView } from 'react-native-gesture-handler';

class NotificationTechnician extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: this.props.navigation.getParam("notif")
    };
  }
  static navigationOptions = {
    title:'Notifications'
}

async componentWillMount(){

  this.state.notification = await this.props.navigation.getParam("notif")
  this.setState(this.state)
  
}

  render() {
    console.log(this.state.notification)
    return (
      <View style={styles.container}>
      {
        this.state.notification ?
        (
      <ScrollView>
        { 
         this.state.notification.map((item, key) => {
          return (
            <Text style={[styles.txt,{borderColor: 'grey', borderWidth: 1, padding: 10 }]}>{item}</Text>
          )

        })
      }
      </ScrollView>
        )
      :
      <Text style={styles.txt}> No Older Notifications </Text>


      }
        
      </View>
    );
  }
}

export default NotificationTechnician;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    marginTop: 10,
    fontSize: totalSize(2),
  }
})