import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  canonicalExercises,
  canonicalMuscles,
  Exercise,
} from '../../shared';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface ExercisesScreenProps {
  onCompareExercises: (exerciseA: Exercise, exerciseB: Exercise) => void;
}

export const ExercisesScreen: React.FC<ExercisesScreenProps> = ({
  onCompareExercises,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeDetailExercise, setActiveDetailExercise] = useState<Exercise | null>(null);
  const [comparisonCandidate, setComparisonCandidate] = useState<Exercise | null>(null);

  const categories = ['all', 'cardio', 'pull', 'core', 'push', 'legs', 'accessory'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredExercises = canonicalExercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.movementPatterns.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || ex.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getPrimaryMuscles = (ex: Exercise) => {
    return ex.muscleMappings
      .filter((m) => m.role === 'primary')
      .map((m) => {
        const found = canonicalMuscles.find((cm) => cm.id === m.muscleId);
        return found?.name || m.muscleId.replace(/_/g, ' ');
      });
  };

  const handleSelectForCompare = (ex: Exercise) => {
    if (!comparisonCandidate) {
      setComparisonCandidate(ex);
    } else if (comparisonCandidate.id === ex.id) {
      setComparisonCandidate(null);
    } else {
      const first = comparisonCandidate;
      setComparisonCandidate(null);
      onCompareExercises(first, ex);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>CANONICAL EXERCISE INVENTORY</Text>
        <Text style={styles.title}>Exercise Library</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by exercise, movement pattern, or category..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Comparison Floating Banner if 1 candidate selected */}
      {comparisonCandidate && (
        <View style={styles.compareBanner}>
          <Text style={styles.compareBannerText}>
            Selected: <Text style={{ fontWeight: '700' }}>{comparisonCandidate.name}</Text>
          </Text>
          <Text style={styles.compareBannerSub}>Select a 2nd exercise to compare</Text>
          <TouchableOpacity
            style={styles.compareCancelBtn}
            onPress={() => setComparisonCandidate(null)}
          >
            <Text style={styles.compareCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Category Filter Chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipRow}
          contentContainerStyle={{ paddingHorizontal: spacing.md }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercises List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl * 2 }}
      >
        <Text style={styles.resultCount}>
          Showing {filteredExercises.length} exercises
        </Text>

        {filteredExercises.map((ex) => {
          const primaries = getPrimaryMuscles(ex);
          const isComparing = comparisonCandidate?.id === ex.id;

          return (
            <TouchableOpacity
              key={ex.id}
              style={[styles.card, isComparing && styles.cardComparing]}
              onPress={() => setActiveDetailExercise(ex)}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.badgeRow}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {ex.category.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.difficultyBadge}>
                      <Text style={styles.difficultyBadgeText}>
                        {ex.difficulty.toUpperCase()}
                      </Text>
                    </View>
                    {ex.unilateral && (
                      <View style={styles.unilateralBadge}>
                        <Text style={styles.unilateralBadgeText}>1-SIDED</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                </View>

                {/* Compare Action Button */}
                <TouchableOpacity
                  style={[
                    styles.compareToggleBtn,
                    isComparing && styles.compareToggleBtnActive,
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSelectForCompare(ex);
                  }}
                >
                  <Text
                    style={[
                      styles.compareToggleText,
                      isComparing && styles.compareToggleTextActive,
                    ]}
                  >
                    {isComparing ? '✓ Selected' : 'Compare'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.movementPatternText}>
                Pattern: {ex.movementPatterns.join(', ').replace(/_/g, ' ')}
              </Text>

              <View style={styles.primaryMusclesBox}>
                <Text style={styles.primaryLabel}>Prime Movers:</Text>
                <Text style={styles.primaryNames}>
                  {primaries.length > 0 ? primaries.join(', ') : 'Conditioning load'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Detail Modal */}
      <ExerciseDetailModal
        exercise={activeDetailExercise}
        visible={!!activeDetailExercise}
        onClose={() => setActiveDetailExercise(null)}
        onCompareWith={(ex) => setComparisonCandidate(ex)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  header: {
    padding: spacing.md,
    paddingBottom: spacing.xs,
  },
  subtitle: {
    color: colors.accentPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  searchInput: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 13,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  compareBanner: {
    backgroundColor: colors.accentSecondary,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compareBannerText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
  compareBannerSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
  },
  compareCancelBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  compareCancelText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  chipRow: {
    marginVertical: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: colors.accentPrimary,
    borderColor: colors.accentPrimary,
  },
  categoryChipText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: colors.textInverse,
  },
  list: {
    flex: 1,
  },
  resultCount: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardComparing: {
    borderColor: colors.accentSecondary,
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryBadgeText: {
    color: colors.accentPrimary,
    fontSize: 9,
    fontWeight: '700',
  },
  difficultyBadge: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyBadgeText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
  },
  unilateralBadge: {
    backgroundColor: 'rgba(129, 140, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  unilateralBadgeText: {
    color: colors.accentSecondary,
    fontSize: 9,
    fontWeight: '700',
  },
  exerciseName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  compareToggleBtn: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  compareToggleBtnActive: {
    backgroundColor: colors.accentSecondary,
    borderColor: colors.accentSecondary,
  },
  compareToggleText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  compareToggleTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  movementPatternText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  primaryMusclesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  primaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  primaryNames: {
    color: colors.textPrimary,
    fontSize: 12,
    flex: 1,
  },
});
