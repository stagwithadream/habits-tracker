import React, { useEffect } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../constants/ThemeContext';
import { useHabitStore } from '../store/habitStore';
import { HabitCard } from '../components/HabitCard';
import { EmptyState } from '../components/EmptyState';
import { SkeletonCard } from '../components/SkeletonCard';
import { HomeStackParamList } from '../types';

type NavProp = StackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const { colors, typography, isDark } = useTheme();
  const navigation = useNavigation<NavProp>();
  const { habits, hydrated, initDefaults } = useHabitStore();

  useEffect(() => {
    if (hydrated) initDefaults();
  }, [hydrated]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
          <Text style={{ ...typography.h1, color: colors.text }}>My Habits</Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Fixed Header */}
      <View style={{
        paddingTop: 60,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text }}>
              My Habits
            </Text>
            <Text style={{ fontSize: 13, color: colors.textTertiary, marginTop: 4 }}>
              {habits.length} {habits.length === 1 ? 'habit' : 'habits'} tracked
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddHabit')}
            accessibilityLabel="Add new habit"
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons name="plus" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
