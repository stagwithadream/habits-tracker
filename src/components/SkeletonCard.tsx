import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

export const SkeletonCard: React.FC = () => {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{
      opacity, backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12,
      shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.border }} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ width: '60%', height: 16, borderRadius: 4, backgroundColor: colors.border }} />
        </View>
      </View>
      <View style={{ width: '100%', height: 8, borderRadius: 4, backgroundColor: colors.border }} />
    </Animated.View>
  );
};
