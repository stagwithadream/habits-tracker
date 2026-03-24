import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

export const EmptyState: React.FC = () => {
  const { colors, spacing, typography } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌱</Text>
      <Text style={[styles.title, { color: colors.text, ...typography.h2 }]}>No habits yet</Text>
      <Text style={[styles.sub, { color: colors.textSecondary, ...typography.body }]}>
        Tap the + button to start your first habit
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { marginBottom: 8, textAlign: 'center' },
  sub: { textAlign: 'center', lineHeight: 22 },
});
