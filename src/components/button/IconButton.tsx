import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import stylenames from 'react-native-style-names';
import Indicator from '../indicator/Indicator';
interface props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  Icon?: any;
  style?: StyleProp<ViewStyle>;
}
const IconButton: React.FC<props> = ({
  children,
  Icon,
  onPress,
  text,
  loading,
  disabled,
  style,
}) => {
  return (
    <TouchableOpacity
      key={text}
      disabled={disabled}
      onPress={onPress}
      style={style}>
      {loading ? (
        <Indicator color="white" showScreenCenter={true} />
      ) : Icon ? (
        Icon
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
export default IconButton;
