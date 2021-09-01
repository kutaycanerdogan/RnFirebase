import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import stylenames from 'react-native-style-names';
import Indicator from '../indicator/Indicator';
interface props {
  buttonStyle?: string | object;
  textStyle?: string | object;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
}
const Button: React.FC<props> = ({
  buttonStyle,
  textStyle,
  onPress,
  text,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      key={text}
      disabled={disabled}
      style={stylenames(styles.button, buttonStyle)}
      onPress={onPress}>
      <Text key={text + '1'} style={stylenames(styles.buttonText, textStyle)}>
        {loading ? <Indicator color="white" showScreenCenter={true} /> : text}
      </Text>
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
export default Button;
