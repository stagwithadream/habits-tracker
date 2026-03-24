import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../constants/ThemeContext';
import { useHabitStore } from '../store/habitStore';
import { colors as themeColors } from '../constants/theme';

const ICONS = ['💪', '📖', '💧', '🏃', '🌙', '🧘', '🥗', '✍️', '🎯', '🎸', '🧹', '💤'];
const TARGET_PRESETS = [7, 14, 21, 30, 60, 90];

export const AddHabitScreen: React.FC = () => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation();
  const { addHabit } = useHabitStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDays, setTargetDays] = useState(21);
  const [customTarget, setCustomTarget] = useState('');
  const [selectedColor, setSelectedColor] = useState(themeColors.habitColors[0]);
  const [selectedIcon, setSelectedIcon] = useState('💪');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    const target = customTarget ? parseInt(customTarget) : targetDays;
    if (isNaN(target) || target < 1) {
      Alert.alert('Invalid target', 'Please enter a valid number of days');
      return;
    }
    addHabit({ title: title.trim(), description: description.trim() || undefined, targetDays: target, color: selectedColor, icon: selectedIcon });
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: spacing.md },
    label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.xs, marginTop: spacing.md },
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      ...typography.body,
      borderWidth: 1,
      borderColor: colors.border,
    },
    error: { ...typography.caption, color: colors.error, marginTop: 4 },
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
    presetBtn: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      borderWidth: 1,
    },
    colorDot: { width: 32, height: 32, borderRadius: 16 },
    iconBtn: {
      width: 44,
      height: 44,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    iconText: { fontSize: 22 },
    submitBtn: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      alignItems: 'center',
      marginTop: spacing.xl,
      marginBottom: spacing.xxl,
    },
    submitText: { ...typography.h3, color: '#fff' },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xxl,
      paddingBottom: spacing.md,
    },
    headerTitle: { ...typography.h2, color: colors.text },
    cancelBtn: { ...typography.body, color: colors.primary },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Cancel">
          <Text style={styles.cancelBtn}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Habit</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>TITLE *</Text>
        <TextInput
          style={[styles.input, titleError ? { borderColor: colors.error } : {}]}
          placeholder="e.g. Morning Run"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={(t) => { setTitle(t); setTitleError(''); }}
          accessibilityLabel="Habit title"
        />
        {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

        <Text style={styles.label}>DESCRIPTION (OPTIONAL)</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="What's your goal?"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          accessibilityLabel="Habit description"
        />

        <Text style={styles.label}>TARGET DAYS</Text>
        <View style={styles.row}>
          {TARGET_PRESETS.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.presetBtn, {
                backgroundColor: targetDays === d && !customTarget ? selectedColor + '33' : colors.card,
                borderColor: targetDays === d && !customTarget ? selectedColor : colors.border,
              }]}
              onPress={() => { setTargetDays(d); setCustomTarget(''); }}
              accessibilityLabel={`${d} days target`}
            >
              <Text style={{ color: targetDays === d && !customTarget ? selectedColor : colors.text, ...typography.body }}>{d}d</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[styles.input, { marginTop: spacing.sm }]}
          placeholder="Custom (e.g. 45)"
          placeholderTextColor={colors.textSecondary}
          value={customTarget}
          onChangeText={setCustomTarget}
          keyboardType="number-pad"
          accessibilityLabel="Custom target days"
        />

        <Text style={styles.label}>COLOR</Text>
        <View style={styles.row}>
          {themeColors.habitColors.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.colorDot, { backgroundColor: c, borderWidth: selectedColor === c ? 3 : 0, borderColor: '#fff' }]}
              onPress={() => setSelectedColor(c)}
              accessibilityLabel={`Color ${c}`}
            />
          ))}
        </View>

        <Text style={styles.label}>ICON</Text>
        <View style={styles.row}>
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon}
              style={[styles.iconBtn, {
                backgroundColor: selectedIcon === icon ? selectedColor + '33' : colors.card,
                borderColor: selectedIcon === icon ? selectedColor : colors.border,
              }]}
              onPress={() => setSelectedIcon(icon)}
              accessibilityLabel={`Icon ${icon}`}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} accessibilityLabel="Create habit">
          <Text style={styles.submitText}>Create Habit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
