import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';

export default class WebViewOpensLink extends Component {
  render() {
    const uri = this.props.navigation.state.params.uri
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}
