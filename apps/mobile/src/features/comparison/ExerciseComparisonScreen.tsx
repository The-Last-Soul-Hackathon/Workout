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
  canonicalExercises,
  Exercise,
  compareExercises,
} from '../../shared';

interface ExerciseComparisonScreenProps {
  initialExerciseA?: Exercise;
  initialExerciseB?: Exercise;
  onClose?: () => void;
}

export const ExerciseComparisonScreen: React.FC<ExerciseComparisonScreenProps> = ({
  initialExerciseA,
  initialExerciseB,
  onClose,
}) => {
  const [exerciseA, setExerciseA] = useState<Exercise>(
    initialExerciseA || canonicalExercises[1] // Standard pull-up
  );
  const [exerciseB, setExerciseB] = useState<Exercise>(
    initialExerciseB ||
      canonicalExercises.find((e) => e.id === 'pullup_archer') ||
      canonicalExercises[4]
  );

  const [pickerTarget, setPickerTarget] = useState<'A' | 'B' | null>(null);

  const comparison = compareExercises(exerciseA, exerciseB);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>SIDE-BY-SIDE BIOMECHANICAL ANALYSIS</Text>
          <Text style={styles.title}>Exercise Comparison</Text>
        </View>
        {onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selector Cards Row */}
      <View style={styles.selectorRow}>
        <TouchableOpacity
          style={[styles.selectorCard, pickerTarget === 'A' && styles.selectorCardActive]}
          onPress={() => setPickerTarget(pickerTarget === 'A' ? null : 'A')}
        >
          <Text style={styles.selectorTargetLabel}>EXERCISE A (TAP TO SWAP)</Text>
          <Text style={styles.selectorExerciseName}>{exerciseA.name}</Text>
          <Text style={styles.selectorSub}>
            {exerciseA.difficulty.toUpperCase()} • {exerciseA.category.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <TouchableOpacity
          style={[styles.selectorCard, pickerTarget === 'B' && styles.selectorCardActive]}
          onPress={() => setPickerTarget(pickerTarget === 'B' ? null : 'B')}
        >
          <Text style={styles.selectorTargetLabel}>EXERCISE B (TAP TO SWAP)</Text>
          <Text style={styles.selectorExerciseName}>{exerciseB.name}</Text>
          <Text style={styles.selectorSub}>
            {exerciseB.difficulty.toUpperCase()} • {exerciseB.category.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exercise Picker List if Open */}
      {pickerTarget && (
        <View style={styles.pickerDropdown}>
          <Text style={styles.pickerTitle}>
            Select Exercise for Slot {pickerTarget}:
          </Text>
          <ScrollView style={{ maxHeight: 180 }}>
            {canonicalExercises.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.pickerItem}
                onPress={() => {
                  if (pickerTarget === 'A') setExerciseA(item);
                  if (pickerTarget === 'B') setExerciseB(item);
                  setPickerTarget(null);
                }}
              >
                <Text style={styles.pickerItemText}>{item.name}</Text>
                <Text style={styles.pickerItemCategory}>{item.category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Similarity Score Banner */}
      <View style={styles.similarityCard}>
        <View style={styles.similarityScoreCircle}>
          <Text style={styles.similarityScoreVal}>
            {Math.round(comparison.similarityScore * 100)}%
          </Text>
          <Text style={styles.similarityScoreSub}>SIMILARITY</Text>
        </View>
        <View style={styles.similarityInfo}>
          <Text style={styles.similarityRecommendation}>
            {comparison.practicalRecommendation}
          </Text>
        </View>
      </View>

      {/* Shared Muscles & Role Changes */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>
          Shared Target Muscles ({comparison.sharedMuscles.length})
        </Text>
        <Text style={styles.cardSectionSub}>
          Muscles recruited by both exercises and how their loading roles compare:
        </Text>

        {comparison.sharedMuscles.map((sm) => {
          const roleMatch = sm.roleA === sm.roleB;
          return (
            <View key={sm.muscleId} style={styles.sharedMuscleItem}>
              <Text style={styles.sharedMuscleName}>{sm.muscleName}</Text>
              <View style={styles.rolesRow}>
                <View
                  style={[
                    styles.rolePill,
                    sm.roleA === 'primary' && styles.rolePillPrimary,
                  ]}
                >
                  <Text style={styles.rolePillText}>A: {sm.roleA.toUpperCase()}</Text>
                </View>
                <Text style={{ color: colors.textMuted }}>→</Text>
                <View
                  style={[
                    styles.rolePill,
                    sm.roleB === 'primary' && styles.rolePillPrimary,
                  ]}
                >
                  <Text style={styles.rolePillText}>B: {sm.roleB.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Distinct Muscles */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Unique / Distinct Muscle Recruitment</Text>
        <View style={styles.distinctCol}>
          <Text style={styles.distinctHeader}>Trained only by {exerciseA.name}:</Text>
          {comparison.distinctMusclesA.length === 0 ? (
            <Text style={styles.distinctEmpty}>None</Text>
          ) : (
            comparison.distinctMusclesA.map((d) => (
              <Text key={d.muscleId} style={styles.distinctText}>
                • {d.muscleName} ({d.role})
              </Text>
            ))
          )}
        </View>

        <View style={[styles.distinctCol, { marginTop: spacing.md }]}>
          <Text style={styles.distinctHeader}>Trained only by {exerciseB.name}:</Text>
          {comparison.distinctMusclesB.length === 0 ? (
            <Text style={styles.distinctEmpty}>None</Text>
          ) : (
            comparison.distinctMusclesB.map((d) => (
              <Text key={d.muscleId} style={styles.distinctText}>
                • {d.muscleName} ({d.role})
              </Text>
            ))
          )}
        </View>
      </View>

      {/* Mechanical Differences */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Differences That Matter</Text>
        {comparison.mechanicalDifferences.map((diff, idx) => (
          <View key={idx} style={styles.diffRow}>
            <Text style={styles.diffBullet}>•</Text>
            <Text style={styles.diffText}>{diff}</Text>
          </View>
        ))}

        <View style={styles.diffRow}>
          <Text style={styles.diffBullet}>•</Text>
          <Text style={styles.diffText}>
            Equipment: {exerciseA.name} ({exerciseA.equipment.join(', ') || 'None'}) vs.{' '}
            {exerciseB.name} ({exerciseB.equipment.join(', ') || 'None'}).
          </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  closeBtn: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  closeBtnText: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  selectorCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  selectorCardActive: {
    borderColor: colors.accentPrimary,
    backgroundColor: colors.bgSecondary,
  },
  selectorTargetLabel: {
    color: colors.accentPrimary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  selectorExerciseName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  selectorSub: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  vsBadge: {
    backgroundColor: colors.bgSecondary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  vsText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  pickerDropdown: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentPrimary,
  },
  pickerTitle: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  pickerItemText: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  pickerItemCategory: {
    color: colors.textMuted,
    fontSize: 11,
  },
  similarityCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  similarityScoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accentPrimary,
    marginRight: spacing.md,
  },
  similarityScoreVal: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  similarityScoreSub: {
    color: colors.accentPrimary,
    fontSize: 8,
    fontWeight: '700',
  },
  similarityInfo: {
    flex: 1,
  },
  similarityRecommendation: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardSectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSectionSub: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  sharedMuscleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  sharedMuscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  rolesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rolePill: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  rolePillPrimary: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  rolePillText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  distinctCol: {},
  distinctHeader: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  distinctEmpty: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  distinctText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    gap: 6,
  },
  diffBullet: {
    color: colors.accentPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  diffText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
});
