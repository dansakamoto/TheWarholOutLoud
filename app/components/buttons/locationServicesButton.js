
import React, { PropTypes } from 'react';

import {
  Image,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';

import WideButton from './wideButton';

import {
  LOCATION_SERVICES_STATUS_NOTDETERMINED,
  LOCATION_SERVICES_STATUS_AUTHORIZED,
  LOCATION_SERVICES_STATUS_DENIED,
  requestLocationServicesAuthorization,
} from '../../actions/beacon';

import { OFF_WHITE, OFF_BLACK, TURQUOISE } from '../../styles';

const styles = StyleSheet.create({
  notAllowedText: {
    color: OFF_WHITE,
  },
  notAllowedBackground: {
    backgroundColor: TURQUOISE,
    borderWidth: 0,
    marginBottom: 0,
  },
  allowedBackground: {
    borderColor: OFF_BLACK,
    marginBottom: 0,
  },
});

const LocationServicesButton = (props) => {
  let locationServicesButton;

  switch (props.locationServicesStatus) {
    case LOCATION_SERVICES_STATUS_NOTDETERMINED:
      locationServicesButton = (<WideButton
        style={styles.notAllowedBackground}
        textStyle={styles.notAllowedText}
        text={'Allow location access'}
        onPress={() => {
          requestLocationServicesAuthorization();
        }}
      />);
      break;

    case LOCATION_SERVICES_STATUS_DENIED: {
      locationServicesButton = (<WideButton
        style={styles.notAllowedBackground}
        textStyle={styles.notAllowedText}
        text={'Location access denied'}
        onPress={() => {
          Alert.alert(
            'Location Access',
            'Go to Settings > Privacy > Location Services > The Warhol to allow location access while using this app.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Settings',
                onPress: () => {
                  const url = 'app-settings:';
                  Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                      console.error(`Can\'t handle url: ${url}`);
                      return;
                    }

                    Linking.openURL(url);
                  });
                },
              },
            ],
          );
        }}
      />);
      break;
    }

    case LOCATION_SERVICES_STATUS_AUTHORIZED:
      locationServicesButton = (<WideButton
        style={styles.allowedBackground}
        text={'Location access allowed'}
        disabled={true}
        accessoryView={
          <Image
            source={require('../../assets/checkmark.png')}
          />
        }
      />);
      break;

    // no default
  }

  return locationServicesButton;
};

LocationServicesButton.propTypes = {
  locationServicesStatus: PropTypes.string.isRequired,
};

export default LocationServicesButton;