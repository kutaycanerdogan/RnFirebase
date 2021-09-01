import React, {
  useState,
  forwardRef,
  useRef,
  MutableRefObject,
  ForwardRefRenderFunction,
  ReactElement,
  ForwardedRef,
} from 'react';
import {Input, Icon} from 'native-base';
import {
  Keyboard,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Indicator from '../indicator/Indicator';
interface props {
  height?: number;
  iconName?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  borderColor?: string;
  focusedBorderColor?: string;
  secureTextEntry?: boolean;
  onIconPress?: any;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
  labelColor?: string;
  labelSize?: number;
  labelText?: string;
  onChangeText?: any;
  value?: string;
  iconColor?: string;
}

const CustomInput: ForwardRefRenderFunction<unknown, props> = (
  {
    height = 47,
    iconName,
    placeholder,
    autoFocus = false,
    onEndEditing = () => {},
    onSubmitEditing = () => {},
    borderColor,
    focusedBorderColor,
    secureTextEntry,
    onIconPress,
    keyboardType,
    defaultValue = '',
    labelColor = 'black',
    labelSize = 12,
    labelText,
    onChangeText,
    value,
    iconColor,
  }: props,
  ref: ForwardedRef<unknown>,
): ReactElement => {
  return (
    <>
      {labelText && (
        <Text
          style={[styles.labelText, {color: labelColor, fontSize: labelSize}]}>
          {labelText}
        </Text>
      )}
      <Input
        value={value}
        selectTextOnFocus={true}
        defaultValue={defaultValue}
        onBlur={() => Keyboard.dismiss()}
        ref={ref}
        InputLeftElement={
          iconName &&
          (iconName === 'loading' ? (
            <Indicator size={20} />
          ) : (
            <Icon
              as={<AntDesign name={iconName} />}
              size="sm"
              m={2}
              onPress={onIconPress}
              color={iconColor}
            />
          ))
        }
        onEndEditing={onEndEditing}
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
        w="90%"
        mx={3}
        placeholder={placeholder}
        borderWidth={1}
        keyboardType={keyboardType}
        borderColor={borderColor}
        margin={1}
        secureTextEntry={secureTextEntry}
        borderRadius={15}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        height={height}
        _focus={{
          borderColor: focusedBorderColor,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: '6%',
  },
});
export default forwardRef(CustomInput);
