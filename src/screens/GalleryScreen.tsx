import React, { useState, useMemo } from 'react';
import {
  View, Text, SectionList, TouchableOpacity, TextInput, StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useHabitStore } from '../store/habitStore';
import { GALLERY_CATEGORIES, GalleryHabit } from '../constants/galleryHabits';

export const GalleryScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const { habits, addHabit } = useHabitStore();
  const [search, setSearch] = useState('');

  const isAdded = (title: string) => habits.some((h) => h.title === title);

  const sections = useMemo(() => {
    if (!search.trim()) {
      return GALLERY_CATEGORIES.map((c) => ({ title: c.name, icon: c.icon, data: c.data }));
    }
    const q = search.toLowerCase();
    return GALLERY_CATEGORIES
      .map((c) => ({
        title: c.name,
        icon: c.icon,
        data: c.data.filter(
          (h) => h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.data.length > 0);
  }, [search]);

  const handleAdd = (habit: GalleryHabit) => {
    if (isAdded(habit.title)) return;
    addHabit({
      title: habit.title,
      description: habit.description,
      targetDays: habit.targetDays,
      color: habit.color,
      icon: habit.icon,
    });
  };

  const renderItem = ({ item }: { item: GalleryHabit }) => {
    const added = isAdded(item.title);
    return (
      <View style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}>
        {/* Icon */}
        <View style={{
          width: 44, height: 44, borderRadius: 14,
          backgroundColor: item.color + '18',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 14,
        }}>
          <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
        </View>

        {/* Info */}
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 2 }} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={{
            alignSelf: 'flex-start', marginTop: 6,
            backgroundColor: colors.border,
            paddingHorizontal: 8, paddingVertical: 3,
            borderRadius: 6,
          }}>
            <Text style={{ fontSize: 10, fontWeight: '600', color: colors.textSecondary }}>
              {item.targetDays} DAYS
            </Text>
          </View>
        </View>

        {/* Add button */}
        <TouchableOpacity
          onPress={() => handleAdd(item)}
          disabled={added}
          accessibilityLabel={added ? `${item.title} already added` : `Add ${item.title}`}
          activeOpacity={0.7}
          style={{
            paddingHorizontal: 16, paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: added ? colors.border : item.color,
          }}
        >
          {added ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="check" size={14} color={colors.textTertiary} />
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textTertiary, marginLeft: 4 }}>
                Added
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="plus" size={14} color="#fff" />
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#fff', marginLeft: 4 }}>
                Add
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string; icon: string } }) => (
    <View style={{
      paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12,
      backgroundColor: colors.background,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name={section.icon as any} size={18} color={colors.textSecondary} />
        <Text style={{
          fontSize: 14, fontWeight: '700', color: colors.textSecondary,
          marginLeft: 8, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          {section.title}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Fixed Header */}
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: colors.background }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: colors.text }}>
          Discover
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
          Popular habits to kickstart your routine
        </Text>

        {/* Search */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: 14, marginTop: 16,
          paddingHorizontal: 14, height: 46,
        }}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textTertiary} />
          <TextInput
            style={{
              flex: 1, marginLeft: 10,
              fontSize: 15, color: colors.text,
            }}
            placeholder="Search habits..."
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
            accessibilityLabel="Search habits"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search">
              <MaterialCommunityIcons name="close-circle" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <MaterialCommunityIcons name="magnify" size={40} color={colors.textTertiary} />
            <Text style={{ fontSize: 15, color: colors.textSecondary, marginTop: 12 }}>
              No habits match your search
            </Text>
          </View>
        }
      />
    </View>
  );
};
