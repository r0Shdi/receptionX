import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Call() {
  const webViewRef = useRef<WebView>(null);
  const jitsiUrl = 'https://meet.jit.si/your-meeting-id';

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  return (
    <View style={styles.container}>
      
      <WebView
        ref={webViewRef}
        source={{ uri: jitsiUrl }}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
  },
});
