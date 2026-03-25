import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

type Props = {
  progress: number;
  color: string;
  height?: number;
};

export const ProgressBar: React.FC<Props> = ({ progress, color, height = 8 }) => {
  const { colors } = useTheme();
  return (
    <View style={{
      width: '100%', height, borderRadius: height / 2,
      backgroundColor: colors.border, overflow: 'hidden',
    }}>
      <View style={{
        width: `${Math.min(progress * 100, 100)}%`,
        height, borderRadius: height / 2,
        backgroundColor: color,
      }} />
    </View>
  );
};
