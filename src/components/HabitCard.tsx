import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  const { colors } = useTheme();
  const { toggleCheckIn, getHabitStats } = useHabits();
  const stats = getHabitStats(habit);

  const handleCheckIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleCheckIn(habit.id);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 20,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
        flexDirection: 'row',
        overflow: 'hidden',
      }}
      onPress={onPress}
      accessibilityLabel={`${habit.title} habit card`}
      activeOpacity={0.7}
    >
      {/* Left content */}
      <View style={{ flex: 1, padding: 18 }}>
        {/* Icon + Title + Streak */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 44, height: 44, borderRadius: 14,
            backgroundColor: habit.color + '18',
            alignItems: 'center', justifyContent: 'center',
            marginRight: 12,
          }}>
            <MaterialCommunityIcons name={habit.icon as any} size={22} color={habit.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text }} numberOfLines={1}>
              {habit.title}
            </Text>
            {habit.description ? (
              <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 2 }} numberOfLines={1}>
                {habit.description}
              </Text>
            ) : null}
          </View>
          {stats.currentStreak > 0 && (
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: '#FF9500' + '15',
              paddingHorizontal: 10, paddingVertical: 5,
              borderRadius: 12, marginLeft: 8,
            }}>
              <MaterialCommunityIcons name="fire" size={14} color="#FF9500" />
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#FF9500', marginLeft: 3 }}>
                {stats.currentStreak}
              </Text>
            </View>
          )}
        </View>

        {/* Progress */}
        <View style={{ marginTop: 16 }}>
          <ProgressBar progress={stats.progress} color={habit.color} />
          <Text style={{ fontSize: 11, color: colors.textTertiary, marginTop: 6 }}>
            {habit.completedDates.length} of {habit.targetDays} days
          </Text>
        </View>
      </View>

      {/* Right: Check-in panel */}
      <TouchableOpacity
        onPress={handleCheckIn}
        accessibilityLabel={stats.isCheckedInToday ? 'Uncheck today' : 'Check in today'}
        activeOpacity={0.6}
        style={{
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: stats.isCheckedInToday ? habit.color : habit.color + '08',
        }}
      >
        {stats.isCheckedInToday ? (
          <>
            <MaterialCommunityIcons name="check-bold" size={24} color="#fff" />
            <Text style={{
              fontSize: 11, fontWeight: '700', color: '#ffffffCC',
              marginTop: 6, letterSpacing: 0.5,
            }}>
              DONE
            </Text>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="plus" size={24} color={habit.color + '70'} />
            <Text style={{
              fontSize: 11, fontWeight: '700', color: habit.color + '70',
              marginTop: 6, letterSpacing: 0.5,
            }}>
              LOG
            </Text>
          </>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
