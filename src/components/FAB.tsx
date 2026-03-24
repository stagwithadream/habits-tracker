import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../constants/ThemeContext';

type Props = {
  onPress: () => void;
  label?: string;
};

export const FAB: React.FC<Props> = ({ onPress, label = '+' }) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => { scale.value = withSpring(1); });
    onPress();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}
        onPress={handlePress}
        accessibilityLabel="Add new habit"
      >
        <Text style={[styles.label, { color: '#fff', ...typography.h2 }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  label: {},
});
