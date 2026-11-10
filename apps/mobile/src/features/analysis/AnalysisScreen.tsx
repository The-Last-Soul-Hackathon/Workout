import React from 'react';
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
  MuscleExposure,
  CoverageGap,
  Exercise,
  canonicalExercises,
} from '../../shared';

interface AnalysisScreenProps {
  exposures: MuscleExposure[];
  gaps: CoverageGap[];
  onSelectExercise: (exercise: Exercise) => void;
  onNavigateToMuscles: (muscleId: string) => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  exposures,
  gaps,
  onSelectExercise,
  onNavigateToMuscles,
}) => {
  const getExercise = (id: string) => {
    return canonicalExercises.find((e) => e.id === id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>EVIDENCE-INFORMED GAP ANALYSIS</Text>
        <Text style={styles.title}>Coverage & Balance</Text>
      </View>

      {/* Scientific Principle Disclaimer Banner */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Model Specification:</Text>
        <Text style={styles.disclaimerText}>
          Muscle exposure is computed via fractional-set accounting:
          1.0 direct set for prime movers, 0.5 for synergists, 0.2 for stabilizers. Scores represent training dose, not absolute hypertrophy guarantees.
        </Text>
      </View>

      {/* Identified Training Gaps */}
      <Text style={styles.sectionTitle}>
        Identified Coverage Gaps ({gaps.length})
      </Text>

      {gaps.length === 0 ? (
        <View style={styles.balancedBox}>
          <Text style={styles.balancedTitle}>✓ Balanced Exposure</Text>
          <Text style={styles.balancedText}>
            All major muscle groups have met their minimal weekly direct/indirect target thresholds!
          </Text>
        </View>
      ) : (
        gaps.map((gap) => (
          <View key={gap.muscleId} style={styles.gapCard}>
            <View style={styles.gapHeader}>
              <View style={styles.gapBadge}>
                <Text style={styles.gapBadgeText}>POTENTIAL DEFICIT</Text>
              </View>
              <TouchableOpacity onPress={() => onNavigateToMuscles(gap.muscleId)}>
                <Text style={styles.inspectMuscleLink}>Inspect Muscle →</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.gapMuscleName}>{gap.muscleName}</Text>
            <Text style={styles.gapReason}>{gap.reason}</Text>

            <View style={styles.gapExposureRow}>
              <Text style={styles.gapExposureText}>
                Logged Exposure: <Text style={{ color: colors.warning, fontWeight: '700' }}>{gap.exposure} sets</Text>
              </Text>
              <Text style={styles.gapExposureText}>
                Target: {gap.targetMin} sets / week
              </Text>
            </View>

            {/* Recommended exercises to bridge the gap */}
            {gap.suggestedExerciseIds.length > 0 && (
              <View style={styles.suggestionsBox}>
                <Text style={styles.suggestionsTitle}>
                  Recommended Bodyweight Exercises:
                </Text>
                {gap.suggestedExerciseIds.map((exId) => {
                  const ex = getExercise(exId);
                  if (!ex) return null;
                  return (
                    <TouchableOpacity
                      key={ex.id}
                      style={styles.suggestedExItem}
                      onPress={() => onSelectExercise(ex)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.suggestedExName}>{ex.name}</Text>
                        <Text style={styles.suggestedExPattern}>
                          {ex.category.toUpperCase()} • {ex.difficulty}
                        </Text>
                      </View>
                      <Text style={styles.inspectBtnText}>View →</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        ))
      )}

      {/* Weekly Exposure Breakdown Table */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
        Full Muscle Accounting (Fractional Sets)
      </Text>

      <View style={styles.tableCard}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCol, { flex: 2 }]}>Muscle</Text>
          <Text style={styles.tableHeaderCol}>Direct</Text>
          <Text style={styles.tableHeaderCol}>Indirect</Text>
          <Text style={styles.tableHeaderCol}>Total</Text>
          <Text style={[styles.tableHeaderCol, { flex: 1.5 }]}>Status</Text>
        </View>

        {exposures.map((item) => {
          const isGap = item.status === 'below_target';
          return (
            <TouchableOpacity
              key={item.muscleId}
              style={styles.tableRow}
              onPress={() => onNavigateToMuscles(item.muscleId)}
            >
              <Text style={[styles.tableCellMuscle, { flex: 2 }]}>
                {item.muscleName}
              </Text>
              <Text style={styles.tableCellNum}>{item.directSets}</Text>
              <Text style={styles.tableCellNum}>{item.indirectSets}</Text>
              <Text style={[styles.tableCellNum, { fontWeight: '700', color: colors.textPrimary }]}>
                {item.totalExposure}
              </Text>
              <View style={[styles.statusTag, { flex: 1.5 }]}>
                <Text
                  style={[
                    styles.statusTagText,
                    {
                      color:
                        item.status === 'in_target'
                          ? colors.coverageInTarget
                          : item.status === 'above_target'
                          ? colors.coverageAbove
                          : colors.coverageBelow,
                    },
                  ]}
                >
                  {item.status === 'in_target'
                    ? 'In Range'
                    : item.status === 'above_target'
                    ? 'High'
                    : 'Gap'}
                </Text>
              </View>
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
  disclaimerBox: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  disclaimerTitle: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  disclaimerText: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  balancedBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  balancedTitle: {
    color: colors.success,
    fontSize: 15,
    fontWeight: '700',
  },
  balancedText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  gapCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  gapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  gapBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  gapBadgeText: {
    color: colors.warning,
    fontSize: 9,
    fontWeight: '700',
  },
  inspectMuscleLink: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  gapMuscleName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  gapReason: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  gapExposureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  gapExposureText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  suggestionsBox: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  suggestionsTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  suggestedExItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  suggestedExName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  suggestedExPattern: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  inspectBtnText: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  tableCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    paddingBottom: spacing.xs,
    marginBottom: spacing.xs,
  },
  tableHeaderCol: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tableCellMuscle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  tableCellNum: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  statusTag: {
    alignItems: 'center',
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
