import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  Exercise,
  canonicalMuscles,
} from '../../shared';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  visible: boolean;
  onClose: () => void;
  onCompareWith?: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  visible,
  onClose,
  onCompareWith,
}) => {
  if (!exercise) return null;

  const getMuscleName = (id: string) => {
    return canonicalMuscles.find((m) => m.id === id)?.name || id.replace(/_/g, ' ');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.accentPrimary;
      case 'advanced':
      case 'elite':
        return colors.warning;
      default:
        return colors.textMuted;
    }
  };

  const getEvidenceCategoryLabel = (category?: string) => {
    if (!category) return 'ANATOMICAL INFERENCE';
    switch (category) {
      case 'emg_excitation_evidence':
        return 'DIRECT SURFACE EMG';
      case 'biomechanical_evidence':
        return 'BIOMECHANICAL MOMENT ARM';
      case 'intervention_study':
        return 'LONGITUDINAL HYPERTROPHY TRIAL';
      case 'expert_consensus':
        return 'EXPERT CONSENSUS';
      default:
        return category.replace(/_/g, ' ').toUpperCase();
    }
  };

  // Aggregate represented evidence types
  const evidenceCategories = Array.from(
    new Set(exercise.muscleMappings.map((m) => m.evidenceCategory).filter(Boolean))
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryLabel}>
                {exercise.category.toUpperCase()} • {exercise.movementPatterns.join(', ').replace(/_/g, ' ').toUpperCase()}
              </Text>
              <Text style={styles.title}>{exercise.name}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close exercise detail">
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            {/* Meta Tags Row */}
            <View style={styles.metaRow}>
              <View style={[styles.tag, { borderColor: getDifficultyColor(exercise.difficulty) }]}>
                <Text style={[styles.tagText, { color: getDifficultyColor(exercise.difficulty) }]}>
                  {exercise.difficulty.toUpperCase()}
                </Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>
                  {exercise.equipment.length > 0
                    ? exercise.equipment.join(', ').replace(/_/g, ' ')
                    : 'No equipment (pure bodyweight)'}
                </Text>
              </View>
              {exercise.unilateral && (
                <View style={[styles.tag, { borderColor: colors.accentSecondary }]}>
                  <Text style={[styles.tagText, { color: colors.accentSecondary }]}>
                    UNILATERAL (ISOLATED)
                  </Text>
                </View>
              )}
            </View>

            {/* Execution Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Execution & Technique</Text>
              <Text style={styles.instructionText}>{exercise.instructions}</Text>
            </View>

            {/* Safety & Prerequisite Notes */}
            {exercise.safetyCautions && (
              <View style={styles.cautionBox}>
                <Text style={styles.cautionTitle}>⚠️ Safety Caution & Form Guardrail</Text>
                <Text style={styles.cautionText}>{exercise.safetyCautions}</Text>
              </View>
            )}

            {/* Muscle Recruitment Roles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Anatomical Muscle Roles & Evidence</Text>
              {exercise.muscleMappings.map((mapping) => {
                const isPrimary = mapping.role === 'primary';
                const confidenceColor =
                  mapping.confidence === 'high'
                    ? colors.success
                    : mapping.confidence === 'moderate'
                    ? colors.info
                    : colors.warning;

                return (
                  <View key={mapping.muscleId} style={styles.muscleRow}>
                    <View style={styles.muscleLeft}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.muscleName}>{getMuscleName(mapping.muscleId)}</Text>
                        <View style={[styles.evidenceBadgeSmall, { borderColor: confidenceColor }]}>
                          <Text style={[styles.evidenceBadgeSmallText, { color: confidenceColor }]}>
                            {mapping.confidence?.toUpperCase() || 'MODERATE'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.jointAction}>Action: {mapping.jointAction}</Text>
                      <Text style={styles.evidenceSourceTag}>
                        Evidence: {getEvidenceCategoryLabel(mapping.evidenceCategory)}
                      </Text>
                      {mapping.notes ? (
                        <Text style={styles.mappingNotes}>• {mapping.notes}</Text>
                      ) : null}
                    </View>
                    <View style={styles.muscleRight}>
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
                          {mapping.role.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.coefficientText}>Coeff: {mapping.coefficient}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Evidence & Scientific Provenance */}
            <View style={styles.evidenceBox}>
              <Text style={styles.evidenceTitle}>Scientific Provenance & Model Limitations</Text>
              <Text style={styles.evidenceText}>
                Supported Evidence Categories:{' '}
                <Text style={{ color: colors.accentPrimary, fontWeight: '700' }}>
                  {evidenceCategories.length > 0
                    ? evidenceCategories.map((c) => getEvidenceCategoryLabel(c)).join(' • ')
                    : 'Biomechanic & Anatomy Inference'}
                </Text>
              </Text>
              <Text style={styles.evidenceSubText}>
                Modelled from published surface EMG trials, inverse dynamic joint torque calculations, and kinematic movement analyses (e.g., Ebben et al. 2011, Contreras et al. 2012, Vigotsky et al. 2018). Quantitative figures and role coefficients represent modelled estimates of mechanical stimulus, not individualized clinical hypertrophy guarantees.
              </Text>
            </View>

            {/* Action Buttons */}
            {onCompareWith && (
              <TouchableOpacity
                style={styles.compareBtn}
                onPress={() => {
                  onClose();
                  onCompareWith(exercise);
                }}
              >
                <Text style={styles.compareBtnText}>Compare with Another Exercise →</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    maxHeight: '90%',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  categoryLabel: {
    color: colors.accentPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  closeBtn: {
    padding: spacing.xs,
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.sm,
  },
  closeBtnText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    marginTop: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.bgSecondary,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  cautionBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.danger,
    marginBottom: spacing.md,
  },
  cautionTitle: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  cautionText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  muscleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  muscleLeft: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  muscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  evidenceBadgeSmall: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  evidenceBadgeSmallText: {
    fontSize: 8,
    fontWeight: '700',
  },
  jointAction: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  evidenceSourceTag: {
    color: colors.accentPrimary,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  mappingNotes: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
    fontStyle: 'italic',
    lineHeight: 14,
  },
  muscleRight: {
    alignItems: 'flex-end',
  },
  roleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  coefficientText: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  evidenceBox: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
  },
  evidenceTitle: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  evidenceText: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  evidenceSubText: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  compareBtn: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.accentPrimary,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  compareBtnText: {
    color: colors.accentPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
