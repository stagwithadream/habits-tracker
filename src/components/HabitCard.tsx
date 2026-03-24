import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Habit } from '../types';
import { useTheme } from '../constants/ThemeContext';
import { useHabits } from '../hooks/useHabits';
import { ProgressBar } from './ProgressBar';

type Props = {
  habit: Habit;
  onPress: () => void;
};

export const HabitCard: React.FC<Props> = ({ habit, onPress }) => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { toggleCheckIn, getHabitStats } = useHabits();
  const stats = getHabitStats(habit);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCheckIn = async () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleCheckIn(habit.id);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderLeftWidth: 4,
      borderLeftColor: habit.color,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      fontSize: 24,
      marginRight: spacing.sm,
    },
    title: {
      ...typography.h3,
      color: colors.text,
      flex: 1,
    },
    checkInBtn: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.full,
      backgroundColor: stats.isCheckedInToday ? habit.color : colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkMark: {
      fontSize: 16,
      color: stats.isCheckedInToday ? '#fff' : colors.textSecondary,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      ...typography.h3,
      color: habit.color,
    },
    statLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    progressLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      textAlign: 'right',
    },
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        accessibilityLabel={`${habit.title} habit card`}
        activeOpacity={0.9}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>{habit.icon}</Text>
            <Text style={styles.title} numberOfLines={1}>{habit.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkInBtn}
            onPress={handleCheckIn}
            accessibilityLabel={stats.isCheckedInToday ? 'Uncheck today' : 'Check in today'}
          >
            <Text style={styles.checkMark}>{stats.isCheckedInToday ? '✓' : '○'}</Text>
          </TouchableOpacity>
        </View>

        <ProgressBar progress={stats.progress} color={habit.color} />
        <Text style={styles.progressLabel}>
          {habit.completedDates.length} / {habit.targetDays} days
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥 {stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.completionPercentage}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{habit.targetDays - habit.completedDates.length > 0 ? habit.targetDays - habit.completedDates.length : 0}</Text>
            <Text style={styles.statLabel}>Days Left</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
