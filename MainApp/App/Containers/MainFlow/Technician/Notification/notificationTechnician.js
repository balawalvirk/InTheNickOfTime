import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { totalSize } from 'react-native-dimension';

class NotificationTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions = {
    title:'Notifications'
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txt}> No Older Notifications </Text>
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