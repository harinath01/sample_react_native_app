import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video, { DRMType } from 'react-native-video';

function App(): React.JSX.Element {
  return (
    <View>
      <Video
        source={{
          type: "mpd",
          uri: 'https://d384padtbeqfgy.cloudfront.net/transcoded/AgAFNEJn3kt/video.mpd'
        }}
        drm={{
          type: DRMType.WIDEVINE,
          licenseServer: "https://app.tpstreams.com/api/v1/6eafqn/assets/AgAFNEJn3kt/drm_license/?access_token=f9b11692-78c5-4d14-9385-5f1efb0b8f4e&drm_type=widevine"
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
  videoPlayer: {
    backgroundColor: "black",
    width: '100%',
    height: 240,
  },
});

export default App;
