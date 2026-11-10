import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  canonicalMuscles,
  canonicalExercises,
  MuscleExposure,
  Exercise,
} from '../../shared';
import { AnatomyMap } from '../../components/AnatomyMap';

interface MuscleExplorerScreenProps {
  exposures: MuscleExposure[];
  initialMuscleId?: string | null;
  onSelectExercise: (exercise: Exercise) => void;
}

export const MuscleExplorerScreen: React.FC<MuscleExplorerScreenProps> = ({
  exposures,
  initialMuscleId,
  onSelectExercise,
}) => {
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>(
    initialMuscleId || 'pectoralis_major_sternal'
  );
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const selectedMuscle =
    canonicalMuscles.find((m) => m.id === selectedMuscleId) || canonicalMuscles[0];

  const currentExposure = exposures.find((e) => e.muscleId === selectedMuscle.id) || {
    muscleId: selectedMuscle.id,
    muscleName: selectedMuscle.name,
    region: selectedMuscle.region,
    directSets: 0,
    indirectSets: 0,
    totalExposure: 0,
    status: 'below_target' as const,
    targetMin: selectedMuscle.defaultWeeklyTargetMin,
    targetMax: selectedMuscle.defaultWeeklyTargetMax,
    contributingExercises: [],
  };

  // Find exercises targeting this muscle
  const targetedExercises = canonicalExercises.filter((ex) =>
    ex.muscleMappings.some((m) => m.muscleId === selectedMuscle.id)
  );

  const filteredMuscles =
    regionFilter === 'all'
      ? canonicalMuscles
      : canonicalMuscles.filter((m) => m.region === regionFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_target':
        return { label: 'IN TARGET RANGE', bg: 'rgba(16, 185, 129, 0.15)', color: colors.coverageInTarget };
      case 'above_target':
        return { label: 'ABOVE TARGET', bg: 'rgba(129, 140, 248, 0.15)', color: colors.coverageAbove };
      case 'insufficient_data':
        return { label: 'CALIBRATING', bg: 'rgba(148, 163, 184, 0.15)', color: colors.textSecondary };
      case 'unassessed':
        return { label: 'UNASSESSED', bg: 'rgba(100, 116, 139, 0.15)', color: colors.textMuted };
      default:
        return { label: 'BELOW TARGET', bg: 'rgba(245, 158, 11, 0.15)', color: colors.coverageBelow };
    }
  };

  const badge = getStatusBadge(currentExposure.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>ANATOMICAL TAXONOMY & EXPOSURE</Text>
        <Text style={styles.title}>Muscle Explorer</Text>
      </View>

      {/* Interactive Anatomy Map */}
      <AnatomyMap
        exposures={exposures}
        selectedMuscleId={selectedMuscleId}
        onSelectMuscle={(id) => setSelectedMuscleId(id)}
      />

      {/* Quick Region Selector Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {['all', 'chest', 'back', 'shoulders', 'arms', 'core', 'hips_glutes', 'thighs', 'calves_feet'].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.chip, regionFilter === r && styles.chipActive]}
            onPress={() => setRegionFilter(r)}
          >
            <Text style={[styles.chipText, regionFilter === r && styles.chipTextActive]}>
              {r.toUpperCase().replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Muscle Detail Card */}
      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <View>
            <Text style={styles.latinName}>{selectedMuscle.latinName || 'ANATOMICAL SPECIFICATION'}</Text>
            <Text style={styles.muscleName}>{selectedMuscle.name}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
          </View>
        </View>

        <Text style={styles.description}>{selectedMuscle.description}</Text>

        {/* Joint Actions */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Biomechanical Actions:</Text>
          <View style={styles.actionsWrap}>
            {selectedMuscle.actions.map((act) => (
              <View key={act} style={styles.actionTag}>
                <Text style={styles.actionTagText}>{act}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Exposure Numbers */}
        <View style={styles.exposureSummaryBox}>
          <View style={styles.exposureMetric}>
            <Text style={styles.exposureBigVal}>{currentExposure.totalExposure}</Text>
            <Text style={styles.exposureSubLabel}>Total Sets</Text>
          </View>
          <View style={styles.exposureDivider} />
          <View style={styles.exposureMetric}>
            <Text style={styles.exposureSmallVal}>{currentExposure.directSets}</Text>
            <Text style={styles.exposureSubLabel}>Direct (1.0)</Text>
          </View>
          <View style={styles.exposureDivider} />
          <View style={styles.exposureMetric}>
            <Text style={styles.exposureSmallVal}>{currentExposure.indirectSets}</Text>
            <Text style={styles.exposureSubLabel}>Indirect (0.5/0.2)</Text>
          </View>
          <View style={styles.exposureDivider} />
          <View style={styles.exposureMetric}>
            <Text style={styles.exposureSmallVal}>
              {selectedMuscle.defaultWeeklyTargetMin}-{selectedMuscle.defaultWeeklyTargetMax}
            </Text>
            <Text style={styles.exposureSubLabel}>Target</Text>
          </View>
        </View>

        {/* Exercises targeting this muscle */}
        <Text style={styles.exerciseSectionTitle}>
          Exercises in Library Targeting this Muscle ({targetedExercises.length})
        </Text>

        {targetedExercises.length === 0 ? (
          <Text style={styles.emptyText}>No exercises recorded in current template.</Text>
        ) : (
          targetedExercises.map((ex) => {
            const mapping = ex.muscleMappings.find((m) => m.muscleId === selectedMuscle.id);
            const isPrimary = mapping?.role === 'primary';

            return (
              <TouchableOpacity
                key={ex.id}
                style={styles.exerciseRow}
                onPress={() => onSelectExercise(ex)}
              >
                <View style={styles.exerciseLeft}>
                  <Text style={styles.exerciseItemName}>{ex.name}</Text>
                  <Text style={styles.exercisePattern}>
                    {ex.movementPatterns.join(', ').replace(/_/g, ' ')}
                  </Text>
                </View>
                <View
                  style={[
                    styles.roleBadge,
                    {
                      backgroundColor: isPrimary
                        ? 'rgba(56, 189, 248, 0.15)'
                        : 'rgba(148, 163, 184, 0.15)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.roleBadgeText,
                      { color: isPrimary ? colors.accentPrimary : colors.textSecondary },
                    ]}
                  >
                    {mapping?.role.toUpperCase()} ({mapping?.coefficient})
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* Accessible Muscle List Selector */}
      <Text style={styles.sectionTitle}>All Muscles in Selected Region</Text>
      <View style={styles.listCard}>
        {filteredMuscles.map((m) => {
          const isSelected = m.id === selectedMuscleId;
          const exp = exposures.find((e) => e.muscleId === m.id);
          return (
            <TouchableOpacity
              key={m.id}
              style={[styles.muscleListItem, isSelected && styles.muscleListItemActive]}
              onPress={() => setSelectedMuscleId(m.id)}
            >
              <Text
                style={[
                  styles.muscleListText,
                  isSelected && styles.muscleListTextActive,
                ]}
              >
                {m.name}
              </Text>
              <Text style={styles.muscleListSets}>
                {exp?.totalExposure || 0} sets
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  header: {
    marginBottom: spacing.md,
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
  },
  chipScroll: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  chipActive: {
    backgroundColor: colors.accentPrimary,
    borderColor: colors.accentPrimary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.textInverse,
  },
  detailCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.lg,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  latinName: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  muscleName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  metaRow: {
    marginBottom: spacing.md,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  actionTag: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  actionTagText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  exposureSummaryBox: {
    flexDirection: 'row',
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  exposureMetric: {
    alignItems: 'center',
  },
  exposureBigVal: {
    color: colors.accentPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  exposureSmallVal: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  exposureSubLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  exposureDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.cardBorder,
  },
  exerciseSectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  exerciseLeft: {
    flex: 1,
  },
  exerciseItemName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  exercisePattern: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  listCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  muscleListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  muscleListItemActive: {
    backgroundColor: colors.bgSecondary,
  },
  muscleListText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  muscleListTextActive: {
    color: colors.accentPrimary,
    fontWeight: '700',
  },
  muscleListSets: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
