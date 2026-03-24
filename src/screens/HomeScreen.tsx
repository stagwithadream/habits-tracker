import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../constants/ThemeContext';
import { useHabitStore } from '../store/habitStore';
import { HabitCard } from '../components/HabitCard';
import { FAB } from '../components/FAB';
import { EmptyState } from '../components/EmptyState';
import { SkeletonCard } from '../components/SkeletonCard';
import { HomeStackParamList } from '../types';

type NavProp = StackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation<NavProp>();
  const { habits, hydrated, initDefaults } = useHabitStore();

  useEffect(() => {
    if (hydrated) initDefaults();
  }, [hydrated]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: spacing.xxl,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
    greeting: { ...typography.caption, color: colors.textSecondary, marginBottom: 4 },
    title: { ...typography.h1, color: colors.text },
    list: { paddingHorizontal: spacing.md, paddingBottom: 100 },
  });

  if (!hydrated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Habits</Text>
        </View>
        <View style={{ paddingHorizontal: spacing.md }}>
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Good day 👋</Text>
            <Text style={styles.title}>My Habits</Text>
          </View>
        }
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <FAB onPress={() => navigation.navigate('AddHabit')} />
    </View>
  );
};
