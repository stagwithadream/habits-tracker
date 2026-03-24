import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../constants/ThemeContext';

type Props = {
  progress: number; // 0 to 1
  color: string;
  height?: number;
};

export const ProgressBar: React.FC<Props> = ({ progress, color, height = 6 }) => {
  const { colors, borderRadius } = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 600 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={[styles.track, { backgroundColor: colors.border, height, borderRadius: borderRadius.full }]}>
      <Animated.View
        style={[styles.fill, animatedStyle, { backgroundColor: color, height, borderRadius: borderRadius.full }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
