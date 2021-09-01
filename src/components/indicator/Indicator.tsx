import React from 'react';
import {ActivityIndicator} from 'react-native';
interface props {
  color?: string;
  size?: number;
  showScreenCenter?: boolean;
}

const Indicator: React.FC<props> = ({
  color = 'green',
  size = 30,
  showScreenCenter = false,
}) => {
  return showScreenCenter ? (
    <ActivityIndicator
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
      size={size}
      color={color}
    />
  ) : (
    <ActivityIndicator
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
      }}
      size={size}
      color={color}
    />
  );
};
export default Indicator;
