import {Dimensions, Platform} from 'react-native';
export {TABS} from './tab';
export {LEVELS} from './level';
export * from './color';
export * from './orientation';

export const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

export const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

export const IS_IPAD = Platform.isPad;

export function IS_IPHONE_X() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}
