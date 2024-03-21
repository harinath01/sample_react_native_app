/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import Video, { DRMType, } from 'react-native-video';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [uri, setUri] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setUri("https://d1uyp6xlgityir.cloudfront.net/institute/support/courses/drm-videos/videos/transcoded/f98d47fd09b942d7aafc25f7a150a000/video.mpd")
    }, 500)
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View>
      <Video
        source={{
          type: "mpd",
          uri: 'https://d1uyp6xlgityir.cloudfront.net/institute/support/courses/drm-videos/videos/transcoded/f98d47fd09b942d7aafc25f7a150a000/video.mpd'
        }}
        drm={{
          type: DRMType.WIDEVINE,
          licenseServer: "https://support.testpress.in/api/v2.5/chapter_contents/70/drm_license/?access_token=73a7af36-91ad-4736-96b3-f718ca253f85"
        }}
        style={styles.videoPlayer}
        resizeMode="contain"
        paused={false}
        controls={true}
        onError={console.log}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  videoPlayer: {
    backgroundColor: "black",
    width: '100%',
    height: 240,
  },
});

export default App;
