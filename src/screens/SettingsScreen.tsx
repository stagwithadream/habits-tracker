import React from 'react';
import { View, Text, TouchableOpacity, Switch, StatusBar, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

export const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: colors.text }}>
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <Text style={{
          fontSize: 12, fontWeight: '700', color: colors.textSecondary,
          letterSpacing: 0.5, textTransform: 'uppercase',
          marginLeft: 4, marginBottom: 10, marginTop: 8,
        }}>
          Appearance
        </Text>
        <View style={{
          backgroundColor: colors.card, borderRadius: 16,
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
        }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            padding: 16,
          }}>
            <View style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: isDark ? '#FF9F0A18' : '#7C6EF618',
              alignItems: 'center', justifyContent: 'center',
              marginRight: 14,
            }}>
              <MaterialCommunityIcons
                name={isDark ? 'weather-night' : 'weather-sunny'}
                size={20}
                color={isDark ? '#FF9F0A' : '#7C6EF6'}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: colors.text }}>
                Dark Mode
              </Text>
              <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 2 }}>
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={isDark ? colors.primary : '#f4f4f4'}
              accessibilityLabel="Toggle dark mode"
            />
          </View>
        </View>

        {/* About Section */}
        <Text style={{
          fontSize: 12, fontWeight: '700', color: colors.textSecondary,
          letterSpacing: 0.5, textTransform: 'uppercase',
          marginLeft: 4, marginBottom: 10, marginTop: 28,
        }}>
          About
        </Text>
        <View style={{
          backgroundColor: colors.card, borderRadius: 16,
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
        }}>
          {[
            { icon: 'information-outline', label: 'Version', value: '1.0.0', color: '#64D2FF' },
            { icon: 'code-tags', label: 'Built with', value: 'Expo + React Native', color: '#30D158' },
          ].map((item, index, arr) => (
            <View key={item.label} style={{
              flexDirection: 'row', alignItems: 'center',
              padding: 16,
              borderBottomWidth: index < arr.length - 1 ? 0.5 : 0,
              borderBottomColor: colors.border,
            }}>
              <View style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: item.color + '18',
                alignItems: 'center', justifyContent: 'center',
                marginRight: 14,
              }}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: colors.text }}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 14, color: colors.textTertiary }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};
