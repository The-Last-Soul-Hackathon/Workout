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

type FilterTab = 'all' | 'gaps' | 'asymmetry' | 'workload';

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  exposures,
  gaps,
  onSelectExercise,
  onNavigateToMuscles,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [expandedMuscleId, setExpandedMuscleId] = useState<string | null>(null);

  const getExercise = (id: string) => {
    return canonicalExercises.find((e) => e.id === id);
  };

  // Aggregate workloads across all muscles
  const totalResistanceVolume = exposures.reduce((acc, m) => acc + m.totalResistanceExposure, 0);
  const totalMobilityVolume = exposures.reduce((acc, m) => acc + (m.mobilityWorkload || 0), 0);
  const totalConditioningVolume = exposures.reduce((acc, m) => acc + (m.conditioningWorkload || 0), 0);

  // Muscles with single-limb asymmetry
  const asymmetricMuscles = exposures.filter(
    (m) => m.unilateralBreakdown && m.unilateralBreakdown.asymmetryDelta > 0
  );

  // Filtered exposures
  const filteredExposures = exposures.filter((m) => {
    if (activeTab === 'gaps') return m.status === 'below_target';
    if (activeTab === 'asymmetry') return m.unilateralBreakdown && m.unilateralBreakdown.asymmetryDelta > 0;
    if (activeTab === 'workload') return (m.mobilityWorkload || 0) > 0 || (m.conditioningWorkload || 0) > 0;
    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>EVIDENCE-INFORMED WORKLOAD & GAP ENGINE</Text>
        <Text style={styles.title}>Coverage & Balance</Text>
      </View>

      {/* Scientific Principle Disclaimer Banner */}
      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Scientific Model Specification:</Text>
        <Text style={styles.disclaimerText}>
          Workload is segregated into resistance (hypertrophy), mobility (range-of-motion/decompression), and conditioning. Unilateral sets aggregate via paired-limb accounting (0.5 + 0.5 = 1.0 bilateral equivalent) to prevent volume inflation.
        </Text>
      </View>

      {/* Workload Summary Cards Row */}
      <View style={styles.workloadGrid}>
        <View style={styles.workloadCard}>
          <Text style={styles.workloadValue}>{totalResistanceVolume.toFixed(1)}</Text>
          <Text style={styles.workloadLabel}>Resistance Sets</Text>
          <Text style={styles.workloadSub}>Hypertrophy dose</Text>
        </View>
        <View style={styles.workloadCard}>
          <Text style={[styles.workloadValue, { color: colors.info }]}>
            {totalMobilityVolume.toFixed(1)}
          </Text>
          <Text style={styles.workloadLabel}>Mobility Units</Text>
          <Text style={styles.workloadSub}>Joint decompression</Text>
        </View>
        <View style={styles.workloadCard}>
          <Text style={[styles.workloadValue, { color: colors.warning }]}>
            {totalConditioningVolume.toFixed(1)}
          </Text>
          <Text style={styles.workloadLabel}>Cardio Units</Text>
          <Text style={styles.workloadSub}>Aerobic stimulus</Text>
        </View>
      </View>

      {/* Unilateral Asymmetry Diagnostic Alert Box */}
      {asymmetricMuscles.length > 0 && (
        <View style={styles.asymmetryCard}>
          <View style={styles.asymmetryHeader}>
            <View style={styles.asymmetryBadge}>
              <Text style={styles.asymmetryBadgeText}>UNILATERAL ASYMMETRY</Text>
            </View>
            <Text style={styles.asymmetryCount}>
              {asymmetricMuscles.length} Muscle{asymmetricMuscles.length > 1 ? 's' : ''} Affected
            </Text>
          </View>
          <Text style={styles.asymmetryTitle}>Single-Limb Volume Imbalance Detected</Text>
          <Text style={styles.asymmetryDesc}>
            Uneven left vs. right sets can promote functional torque compensation or strength imbalances. Paired bilateral equivalents are maintained.
          </Text>
          <View style={styles.asymmetryList}>
            {asymmetricMuscles.map((m) => (
              <View key={m.muscleId} style={styles.asymmetryItem}>
                <Text style={styles.asymmetryItemName}>{m.muscleName}</Text>
                <Text style={styles.asymmetryItemDetail}>
                  Left: <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{m.unilateralBreakdown.leftSets}</Text> | Right:{' '}
                  <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>{m.unilateralBreakdown.rightSets}</Text>{' '}
                  (Δ {m.unilateralBreakdown.asymmetryDelta} set{m.unilateralBreakdown.asymmetryDelta > 1 ? 's' : ''})
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'all' && styles.tabBtnTextActive]}>
            All ({exposures.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'gaps' && styles.tabBtnActive]}
          onPress={() => setActiveTab('gaps')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'gaps' && styles.tabBtnTextActive]}>
            Gaps ({gaps.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'asymmetry' && styles.tabBtnActive]}
          onPress={() => setActiveTab('asymmetry')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'asymmetry' && styles.tabBtnTextActive]}>
            Asymmetries ({asymmetricMuscles.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'workload' && styles.tabBtnActive]}
          onPress={() => setActiveTab('workload')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'workload' && styles.tabBtnTextActive]}>
            Mobility/Cardio
          </Text>
        </TouchableOpacity>
      </View>

      {/* Identified Training Gaps Section */}
      {activeTab === 'gaps' && (
        <View>
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
        </View>
      )}

      {/* Weekly Exposure Breakdown Table */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
        Muscle Exposure & Biomechanical Breakdown ({filteredExposures.length})
      </Text>

      <View style={styles.tableCard}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCol, { flex: 2.2 }]}>Muscle</Text>
          <Text style={styles.tableHeaderCol}>Direct</Text>
          <Text style={styles.tableHeaderCol}>Indir.</Text>
          <Text style={styles.tableHeaderCol}>Total</Text>
          <Text style={[styles.tableHeaderCol, { flex: 1.2 }]}>Status</Text>
        </View>

        {filteredExposures.map((item) => {
          const isExpanded = expandedMuscleId === item.muscleId;
          const confidenceColor =
            item.confidence === 'high'
              ? colors.success
              : item.confidence === 'moderate'
              ? colors.info
              : colors.warning;

          return (
            <View key={item.muscleId} style={styles.tableRowContainer}>
              <TouchableOpacity
                style={styles.tableRow}
                onPress={() => setExpandedMuscleId(isExpanded ? null : item.muscleId)}
              >
                <View style={{ flex: 2.2 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={styles.tableCellMuscle}>{item.muscleName}</Text>
                    {item.isTargetPersonalized && (
                      <View style={styles.personalizedBadge}>
                        <Text style={styles.personalizedBadgeText}>P</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.tableCellRegion}>{item.region.toUpperCase()}</Text>
                </View>

                <Text style={styles.tableCellNum}>{item.directSets}</Text>
                <Text style={styles.tableCellNum}>{item.indirectSets}</Text>
                <Text style={[styles.tableCellNum, { fontWeight: '700', color: colors.textPrimary }]}>
                  {item.totalResistanceExposure}
                </Text>

                <View style={[styles.statusTag, { flex: 1.2 }]}>
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

              {/* Expanded Scientific Breakdown Drawer */}
              {isExpanded && (
                <View style={styles.expandedDrawer}>
                  <View style={styles.expandedHeaderRow}>
                    <Text style={styles.drawerTitle}>Biomechanical Evidence & Stimulus</Text>
                    <View style={[styles.confidenceBadge, { borderColor: confidenceColor }]}>
                      <Text style={[styles.confidenceBadgeText, { color: confidenceColor }]}>
                        {item.confidence.toUpperCase()} CONFIDENCE
                      </Text>
                    </View>
                  </View>

                  {/* Sets Breakdown Details */}
                  <View style={styles.drawerMetricsRow}>
                    <View style={styles.drawerMetricCol}>
                      <Text style={styles.drawerMetricLabel}>Direct (1.0x)</Text>
                      <Text style={styles.drawerMetricVal}>{item.directSets}</Text>
                    </View>
                    <View style={styles.drawerMetricCol}>
                      <Text style={styles.drawerMetricLabel}>Indirect (0.5x)</Text>
                      <Text style={styles.drawerMetricVal}>{item.indirectSets}</Text>
                    </View>
                    <View style={styles.drawerMetricCol}>
                      <Text style={styles.drawerMetricLabel}>Stabiliser (0.2x)</Text>
                      <Text style={styles.drawerMetricVal}>{item.stabiliserSets}</Text>
                    </View>
                    <View style={styles.drawerMetricCol}>
                      <Text style={styles.drawerMetricLabel}>Mobility</Text>
                      <Text style={styles.drawerMetricVal}>{item.mobilityWorkload || 0}</Text>
                    </View>
                  </View>

                  {/* Target & Personalization */}
                  <View style={styles.drawerInfoRow}>
                    <Text style={styles.drawerInfoLabel}>Weekly Target:</Text>
                    <Text style={styles.drawerInfoValue}>
                      {item.targetMin} - {item.targetMax} sets{' '}
                      {item.isTargetPersonalized ? '(Personalized User Target)' : '(Canonical Baseline)'}
                    </Text>
                  </View>

                  {/* Unilateral Accounting Breakdown */}
                  <View style={styles.drawerInfoRow}>
                    <Text style={styles.drawerInfoLabel}>Single-Limb Distribution:</Text>
                    <Text style={styles.drawerInfoValue}>
                      Left: {item.unilateralBreakdown.leftSets} | Right: {item.unilateralBreakdown.rightSets} | Bilateral: {item.unilateralBreakdown.bilateralSets} (Paired: {item.unilateralBreakdown.pairedSets})
                    </Text>
                  </View>

                  {/* Contributing Exercises List */}
                  <Text style={styles.contributingTitle}>Contributing Exercises:</Text>
                  {item.contributingExercises.length === 0 ? (
                    <Text style={styles.drawerEmptyText}>No recorded working sets for this muscle yet.</Text>
                  ) : (
                    item.contributingExercises.map((c) => (
                      <View key={c.exerciseId} style={styles.contribItem}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.contribName}>{c.exerciseName}</Text>
                          <Text style={styles.contribRole}>
                            {c.workloadType.toUpperCase()} • {c.role.toUpperCase()}{' '}
                            {c.evidenceCategory ? `• ${c.evidenceCategory.replace(/_/g, ' ')}` : ''}
                          </Text>
                        </View>
                        <Text style={styles.contribVolume}>
                          +{c.contribution} dose ({c.sets} sets)
                        </Text>
                      </View>
                    ))
                  )}

                  <TouchableOpacity
                    style={styles.inspectAnatomyBtn}
                    onPress={() => onNavigateToMuscles(item.muscleId)}
                  >
                    <Text style={styles.inspectAnatomyBtnText}>
                      Inspect in 3D/2D Anatomy Explorer →
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
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
    marginBottom: spacing.md,
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
  workloadGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  workloadCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  workloadValue: {
    color: colors.accentPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  workloadLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  workloadSub: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 1,
  },
  asymmetryCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  asymmetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  asymmetryBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  asymmetryBadgeText: {
    color: colors.warning,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  asymmetryCount: {
    color: colors.textMuted,
    fontSize: 11,
  },
  asymmetryTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  asymmetryDesc: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  asymmetryList: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  asymmetryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  asymmetryItemName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  asymmetryItemDetail: {
    color: colors.textMuted,
    fontSize: 11,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tabBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tabBtnActive: {
    backgroundColor: colors.accentPrimary,
    borderColor: colors.accentPrimary,
  },
  tabBtnText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: colors.bgPrimary,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  balancedBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginBottom: spacing.md,
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
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  suggestionsTitle: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
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
    fontSize: 13,
    fontWeight: '600',
  },
  suggestedExPattern: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 1,
  },
  inspectBtnText: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  tableCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.bgSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    alignItems: 'center',
  },
  tableHeaderCol: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  tableRowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tableRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'center',
  },
  tableCellMuscle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  tableCellRegion: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 1,
  },
  personalizedBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  personalizedBadgeText: {
    color: colors.accentPrimary,
    fontSize: 8,
    fontWeight: '700',
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
  expandedDrawer: {
    backgroundColor: colors.bgSecondary,
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  expandedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  drawerTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  confidenceBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  confidenceBadgeText: {
    fontSize: 8,
    fontWeight: '700',
  },
  drawerMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    marginVertical: spacing.xs,
  },
  drawerMetricCol: {
    alignItems: 'center',
    flex: 1,
  },
  drawerMetricLabel: {
    color: colors.textMuted,
    fontSize: 9,
  },
  drawerMetricVal: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  drawerInfoRow: {
    marginVertical: 2,
  },
  drawerInfoLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  drawerInfoValue: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
  contributingTitle: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: spacing.xs,
    marginBottom: 4,
  },
  drawerEmptyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  contribItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  contribName: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  contribRole: {
    color: colors.textMuted,
    fontSize: 9,
  },
  contribVolume: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  inspectAnatomyBtn: {
    marginTop: spacing.sm,
    paddingVertical: 6,
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  inspectAnatomyBtnText: {
    color: colors.accentPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
});
