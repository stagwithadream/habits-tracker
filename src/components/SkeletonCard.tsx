import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme } from '../constants/ThemeContext';

export const SkeletonCard: React.FC = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 800 }), -1, true);
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[styles.card, animStyle, { backgroundColor: colors.card, borderRadius: borderRadius.lg, marginBottom: spacing.sm }]}>
      <View style={[styles.line, { backgroundColor: colors.border, borderRadius: 4, width: '60%', height: 20, marginBottom: spacing.sm }]} />
      <View style={[styles.line, { backgroundColor: colors.border, borderRadius: 4, width: '100%', height: 8 }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16 },
  line: {},
});
