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
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
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
                <Text style={styles.cautionTitle}>⚠️ Safety Caution</Text>
                <Text style={styles.cautionText}>{exercise.safetyCautions}</Text>
              </View>
            )}

            {/* Muscle Recruitment Roles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Anatomical Muscle Roles</Text>
              {exercise.muscleMappings.map((mapping) => {
                const isPrimary = mapping.role === 'primary';
                return (
                  <View key={mapping.muscleId} style={styles.muscleRow}>
                    <View style={styles.muscleLeft}>
                      <Text style={styles.muscleName}>{getMuscleName(mapping.muscleId)}</Text>
                      <Text style={styles.jointAction}>Action: {mapping.jointAction}</Text>
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
              <Text style={styles.evidenceTitle}>Scientific Provenance</Text>
              <Text style={styles.evidenceText}>
                Confidence: <Text style={{ color: colors.success, fontWeight: '700' }}>MODERATE / HIGH</Text>
              </Text>
              <Text style={styles.evidenceSubText}>
                Modelled from surface EMG activation studies, musculoskeletal joint moment calculations, and biomechanical torque vectors.
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
    maxHeight: '88%',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    paddingBottom: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryLabel: {
    color: colors.accentPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  closeBtnText: {
    color: colors.textMuted,
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  tag: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.lg,
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
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  cautionTitle: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  cautionText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  muscleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  muscleLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  muscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  jointAction: {
    color: colors.accentPrimary,
    fontSize: 11,
    marginTop: 2,
  },
  mappingNotes: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  muscleRight: {
    alignItems: 'flex-end',
  },
  roleBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  roleBadgeText: {
    fontSize: 10,
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
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  evidenceTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  evidenceText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  evidenceSubText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
    lineHeight: 15,
  },
  compareBtn: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  compareBtnText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
});
