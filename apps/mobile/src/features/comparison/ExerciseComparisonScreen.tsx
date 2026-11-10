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
  SubstitutionFeasibility,
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

  // Feasibility UI configuration
  const getFeasibilityConfig = (feasibility: SubstitutionFeasibility) => {
    switch (feasibility) {
      case 'direct_equivalent':
        return {
          label: 'DIRECT BIOMECHANICAL EQUIVALENT',
          color: colors.success,
          bg: 'rgba(16, 185, 129, 0.15)',
          description:
            'Target muscles, joint moments and movement patterns align closely. High functional interchangeability.',
        };
      case 'regression_suitable':
        return {
          label: 'SUITABLE DELOAD REGRESSION',
          color: colors.info,
          bg: 'rgba(59, 130, 246, 0.15)',
          description:
            'Shares core motor patterns with reduced leverage or stability demand. Ideal entry point or deload substitute.',
        };
      case 'progression_suitable':
        return {
          label: 'SUITABLE OVERLOAD PROGRESSION',
          color: '#8B5CF6',
          bg: 'rgba(139, 92, 246, 0.15)',
          description:
            'Increases torque, unilateral coordination, or stability demand. Progressive overload advancement.',
        };
      case 'partial_complement':
        return {
          label: 'PARTIAL COMPLEMENT',
          color: colors.warning,
          bg: 'rgba(245, 158, 11, 0.15)',
          description:
            'Recruits overlapping muscle groups at different joint angles or contraction modes. Useful complement, not a 1:1 substitute.',
        };
      case 'biomechanically_incompatible':
      default:
        return {
          label: 'BIOMECHANICALLY INCOMPATIBLE',
          color: colors.danger,
          bg: 'rgba(239, 68, 68, 0.15)',
          description:
            'Distinct primary movement planes and joint actions. Cannot serve as an interchangeable substitute.',
        };
    }
  };

  const feasibilityConfig = getFeasibilityConfig(comparison.substitutionFeasibility);
  const scores = comparison.scores;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>5-DIMENSIONAL BIOMECHANICAL ANALYSIS</Text>
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
          <Text style={styles.selectorTargetLabel}>EXERCISE A (TAP TO CHANGE)</Text>
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
          <Text style={styles.selectorTargetLabel}>EXERCISE B (TAP TO CHANGE)</Text>
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
          <ScrollView style={{ maxHeight: 200 }}>
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
                <Text style={styles.pickerItemCategory}>
                  {item.category.toUpperCase()} • {item.difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Feasibility Classification Banner */}
      <View style={styles.feasibilityCard}>
        <View style={[styles.feasibilityBadge, { backgroundColor: feasibilityConfig.bg }]}>
          <Text style={[styles.feasibilityBadgeText, { color: feasibilityConfig.color }]}>
            {feasibilityConfig.label}
          </Text>
        </View>

        <View style={styles.feasibilityRow}>
          <View style={styles.similarityScoreCircle}>
            <Text style={styles.similarityScoreVal}>
              {Math.round(comparison.similarityScore * 100)}%
            </Text>
            <Text style={styles.similarityScoreSub}>COMPOSITE</Text>
          </View>
          <View style={styles.feasibilityTextCol}>
            <Text style={styles.feasibilityDesc}>{feasibilityConfig.description}</Text>
            <Text style={styles.practicalRecommendation}>
              {comparison.practicalRecommendation}
            </Text>
          </View>
        </View>
      </View>

      {/* 5-Dimensional Kinematic Scoring Breakdown */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>5-Dimensional Kinematic Analysis</Text>
        <Text style={styles.cardSectionSub}>
          Substitutions are evaluated across physiological roles, joint actions, ROM, stability and progression links:
        </Text>

        {/* Dimension 1: Muscle Role & Evidence */}
        <View style={styles.dimensionRow}>
          <View style={styles.dimensionHeader}>
            <Text style={styles.dimensionLabel}>1. Muscle Roles & Evidence</Text>
            <Text style={styles.dimensionVal}>
              {Math.round(scores.muscleRoleAndEvidence * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(scores.muscleRoleAndEvidence * 100)}%`,
                  backgroundColor: colors.accentPrimary,
                },
              ]}
            />
          </View>
        </View>

        {/* Dimension 2: Movement Pattern & Joint Kinematics */}
        <View style={styles.dimensionRow}>
          <View style={styles.dimensionHeader}>
            <Text style={styles.dimensionLabel}>2. Movement Pattern & Joint Actions</Text>
            <Text style={styles.dimensionVal}>
              {Math.round(scores.movementPatternAndJointActions * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(scores.movementPatternAndJointActions * 100)}%`,
                  backgroundColor: colors.info,
                },
              ]}
            />
          </View>
        </View>

        {/* Dimension 3: ROM & Resistance Profile */}
        <View style={styles.dimensionRow}>
          <View style={styles.dimensionHeader}>
            <Text style={styles.dimensionLabel}>3. ROM & Resistance Profile</Text>
            <Text style={styles.dimensionVal}>
              {Math.round(scores.romAndResistanceProfile * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(scores.romAndResistanceProfile * 100)}%`,
                  backgroundColor: colors.warning,
                },
              ]}
            />
          </View>
        </View>

        {/* Dimension 4: Unilateral & Stability Demands */}
        <View style={styles.dimensionRow}>
          <View style={styles.dimensionHeader}>
            <Text style={styles.dimensionLabel}>4. Unilateral & Stability Demands</Text>
            <Text style={styles.dimensionVal}>
              {Math.round(scores.unilateralAndStabilityDemand * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(scores.unilateralAndStabilityDemand * 100)}%`,
                  backgroundColor: '#8B5CF6',
                },
              ]}
            />
          </View>
        </View>

        {/* Dimension 5: Prerequisites & Regressions */}
        <View style={styles.dimensionRow}>
          <View style={styles.dimensionHeader}>
            <Text style={styles.dimensionLabel}>5. Prerequisite & Regression Linkage</Text>
            <Text style={styles.dimensionVal}>
              {Math.round(scores.hierarchicalRelationship * 100)}%
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.round(scores.hierarchicalRelationship * 100)}%`,
                  backgroundColor: colors.success,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.scientificFootnote}>
          <Text style={styles.footnoteText}>
            * Scientific Note: Muscle overlap alone does not guarantee movement equivalency. Unilateral loading introduces rotational torque and spinal stabiliser demands not captured by basic prime-mover lists.
          </Text>
        </View>
      </View>

      {/* Shared Target Muscles & Role Progression */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>
          Shared Target Muscles ({comparison.sharedMuscles.length})
        </Text>
        <Text style={styles.cardSectionSub}>
          Muscles recruited by both exercises and how their loading roles compare:
        </Text>

        {comparison.sharedMuscles.map((sm) => {
          return (
            <View key={sm.muscleId} style={styles.sharedMuscleItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sharedMuscleName}>{sm.muscleName}</Text>
                {sm.evidenceA && (
                  <Text style={styles.evidenceTagText}>
                    Evidence: {sm.evidenceA.replace(/_/g, ' ')}
                  </Text>
                )}
              </View>
              <View style={styles.rolesRow}>
                <View
                  style={[
                    styles.rolePill,
                    sm.roleA === 'primary'
                      ? styles.rolePillPrimary
                      : sm.roleA === 'stabiliser'
                      ? styles.rolePillStabiliser
                      : styles.rolePillSecondary,
                  ]}
                >
                  <Text style={styles.rolePillText}>A: {sm.roleA.toUpperCase()}</Text>
                </View>
                <Text style={{ color: colors.textMuted, marginHorizontal: 4 }}>→</Text>
                <View
                  style={[
                    styles.rolePill,
                    sm.roleB === 'primary'
                      ? styles.rolePillPrimary
                      : sm.roleB === 'stabiliser'
                      ? styles.rolePillStabiliser
                      : styles.rolePillSecondary,
                  ]}
                >
                  <Text style={styles.rolePillText}>B: {sm.roleB.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Distinct Muscles Recruitment */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Distinct Muscle Recruitment</Text>
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

      {/* Mechanical & Stability Differences */}
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
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  selectorSub: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  vsBadge: {
    paddingHorizontal: spacing.xs,
  },
  vsText: {
    color: colors.textMuted,
    fontWeight: '800',
    fontSize: 11,
  },
  pickerDropdown: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentPrimary,
  },
  pickerTitle: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  pickerItem: {
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerItemText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  pickerItemCategory: {
    color: colors.textMuted,
    fontSize: 10,
  },
  feasibilityCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  feasibilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  feasibilityBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  feasibilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  similarityScoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 2,
    borderColor: colors.accentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  similarityScoreVal: {
    color: colors.accentPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  similarityScoreSub: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '700',
  },
  feasibilityTextCol: {
    flex: 1,
  },
  feasibilityDesc: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  practicalRecommendation: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
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
  },
  cardSectionSub: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  dimensionRow: {
    marginBottom: spacing.sm,
  },
  dimensionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dimensionLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  dimensionVal: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: colors.bgSecondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  scientificFootnote: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  footnoteText: {
    color: colors.textMuted,
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 14,
  },
  sharedMuscleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  sharedMuscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  evidenceTagText: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 1,
  },
  rolesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rolePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.bgSecondary,
  },
  rolePillPrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
  },
  rolePillSecondary: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  rolePillStabiliser: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
  },
  rolePillText: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: '700',
  },
  distinctCol: {
    marginTop: 4,
  },
  distinctHeader: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  distinctEmpty: {
    color: colors.textMuted,
    fontSize: 11,
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
    gap: 6,
    marginBottom: 4,
  },
  diffBullet: {
    color: colors.accentPrimary,
    fontSize: 12,
    lineHeight: 16,
  },
  diffText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
});
