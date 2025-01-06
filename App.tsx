import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Video, { DRMType } from 'react-native-video';
import axios from 'axios';

const CERT_URL = 'https://static.testpress.in/static/fairplay.cer';

function App(): React.JSX.Element {
  const getDrmConfig = () => {
    if (Platform.OS === 'ios') {
      return {
        type: DRMType.FAIRPLAY,
        licenseServer: 'https://app.tpstreams.com/api/v1/6eafqn/assets/AgAFNEJn3kt/drm_license/?access_token=f9b11692-78c5-4d14-9385-5f1efb0b8f4e&drm_type=fairplay',
        certificateUrl: CERT_URL,
        getLicense: (spcString: string, contentId: string, licenseUrl: string) => {
          return axios
            .post(
              licenseUrl,
              JSON.stringify({ spc: spcString, assetId: contentId }),
              {
                headers: { 'Content-type': 'application/json' },
                responseType: 'arraybuffer',
              },
            )
            .then(res => {
              return Buffer.from(res.data, 'binary').toString('base64');
            })
            .catch(err => {
              console.error('DRM ERROR', err);
            });
        },
      };
    }
    
    return {
      type: DRMType.WIDEVINE,
      licenseServer: "https://app.tpstreams.com/api/v1/6eafqn/assets/AgAFNEJn3kt/drm_license/?access_token=f9b11692-78c5-4d14-9385-5f1efb0b8f4e&drm_type=widevine"
    };
  };

  return (
    <View>
      <Video
        source={{
          type: "mpd",
          uri: 'https://d384padtbeqfgy.cloudfront.net/transcoded/AgAFNEJn3kt/video.mpd'
        }}
        drm={getDrmConfig()}
        style={styles.videoPlayer}
        resizeMode="contain"
        paused={false}
        controls={true}
        onError={(err) => console.error('Player onError', err)}
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
