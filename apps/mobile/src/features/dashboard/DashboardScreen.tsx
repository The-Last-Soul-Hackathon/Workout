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
  WorkoutSession,
  MuscleExposure,
  CoverageGap,
} from '../../shared';
import { AnatomyMap } from '../../components/AnatomyMap';

interface DashboardScreenProps {
  sessions: WorkoutSession[];
  exposures: MuscleExposure[];
  gaps: CoverageGap[];
  onNavigateToMuscles: (muscleId?: string) => void;
  onNavigateToWorkouts: (roundId?: string) => void;
  onNavigateToAnalysis: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  sessions,
  exposures,
  gaps,
  onNavigateToMuscles,
  onNavigateToWorkouts,
  onNavigateToAnalysis,
}) => {
  // Aggregate summary
  const totalCompletedSessions = sessions.filter((s) => s.completed).length;
  const totalWorkingSets = sessions.reduce((acc, s) => acc + s.sets.length, 0);
  const activeDays = new Set(
    sessions.map((s) => new Date(s.startedAt).toDateString())
  ).size;

  // Top 5 exposed muscles
  const sortedExposures = [...exposures]
    .sort((a, b) => b.totalExposure - a.totalExposure)
    .slice(0, 6);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandSubtitle}>BODYWEIGHT TRAINING PLATFORM</Text>
          <Text style={styles.brandTitle}>Muscle Intelligence</Text>
        </View>
        <TouchableOpacity style={styles.quickStartBtn} onPress={() => onNavigateToWorkouts()}>
          <Text style={styles.quickStartBtnText}>+ Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Metric Cards Row */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{totalCompletedSessions}</Text>
          <Text style={styles.metricLabel}>Sessions</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{totalWorkingSets}</Text>
          <Text style={styles.metricLabel}>Working Sets</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{activeDays}</Text>
          <Text style={styles.metricLabel}>Active Days</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: colors.accentPrimary }]}>
            {gaps.length > 0 ? `${gaps.length} Gaps` : 'Balanced'}
          </Text>
          <Text style={styles.metricLabel}>Plan Status</Text>
        </View>
      </View>

      {/* Featured Routine Highlight */}
      <View style={styles.featuredCard}>
        <View style={styles.featuredTag}>
          <Text style={styles.featuredTagText}>FEATURED MOBILITY ROUTINE</Text>
        </View>
        <Text style={styles.featuredTitle}>Round 23 — Dynamic Flow Mobility</Text>
        <Text style={styles.featuredDesc}>
          Full 5-movement vinyasa flow: Surya Namaskar, Tadasana, Ardha Uttanasana, Downward Dog, and Cat–Cow for whole-body posterior chain release.
        </Text>
        <TouchableOpacity
          style={styles.featuredBtn}
          onPress={() => onNavigateToWorkouts('round_23')}
        >
          <Text style={styles.featuredBtnText}>Start Round 23 Now →</Text>
        </TouchableOpacity>
      </View>

      {/* Whole Body Coverage & Interactive Anatomy Map */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Whole-Body Coverage</Text>
        <TouchableOpacity onPress={() => onNavigateToMuscles()}>
          <Text style={styles.sectionLink}>Full Explorer →</Text>
        </TouchableOpacity>
      </View>
      <AnatomyMap
        exposures={exposures}
        onSelectMuscle={(id) => onNavigateToMuscles(id)}
      />

      {/* Priority Gap Alerts */}
      {gaps.length > 0 && (
        <View style={styles.gapCard}>
          <View style={styles.gapHeader}>
            <View style={styles.gapBadge}>
              <Text style={styles.gapBadgeText}>PRIORITY ATTENTION</Text>
            </View>
            <TouchableOpacity onPress={onNavigateToAnalysis}>
              <Text style={styles.gapLink}>Details →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.gapTitle}>{gaps[0].muscleName}</Text>
          <Text style={styles.gapReason}>{gaps[0].reason}</Text>
          <TouchableOpacity
            style={styles.gapActionBtn}
            onPress={onNavigateToAnalysis}
          >
            <Text style={styles.gapActionBtnText}>
              View Recommended Exercises
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Weekly Muscle Exposure Bars */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Weekly Exposure (Fractional Sets)</Text>
        <TouchableOpacity onPress={onNavigateToAnalysis}>
          <Text style={styles.sectionLink}>Full Analysis →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.exposureCard}>
        {sortedExposures.map((item) => {
          const maxScale = Math.max(item.targetMax, 16);
          const directPercent = (item.directSets / maxScale) * 100;
          const indirectPercent = (item.indirectSets / maxScale) * 100;

          return (
            <TouchableOpacity
              key={item.muscleId}
              style={styles.exposureItem}
              onPress={() => onNavigateToMuscles(item.muscleId)}
            >
              <View style={styles.exposureInfoRow}>
                <Text style={styles.exposureMuscleName}>{item.muscleName}</Text>
                <Text style={styles.exposureTotalValue}>
                  {item.totalExposure} sets{' '}
                  <Text style={styles.exposureTargetLabel}>
                    (Target: {item.targetMin}-{item.targetMax})
                  </Text>
                </Text>
              </View>

              {/* Stacked bar */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarDirect,
                    { width: `${Math.min(directPercent, 100)}%` },
                  ]}
                />
                <View
                  style={[
                    styles.progressBarIndirect,
                    { width: `${Math.min(indirectPercent, 100)}%` },
                  ]}
                />
              </View>

              <View style={styles.exposureLegendRow}>
                <Text style={styles.exposureLegendText}>
                  Direct: {item.directSets}
                </Text>
                <Text style={styles.exposureLegendText}>
                  Indirect: {item.indirectSets}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Recent Sessions */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        <TouchableOpacity onPress={() => onNavigateToWorkouts()}>
          <Text style={styles.sectionLink}>View All →</Text>
        </TouchableOpacity>
      </View>
      {sessions.slice(0, 3).map((s) => (
        <View key={s.id} style={styles.sessionCard}>
          <View style={styles.sessionHeaderRow}>
            <Text style={styles.sessionName}>{s.name}</Text>
            <Text style={styles.sessionDate}>
              {new Date(s.startedAt).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.sessionDetail}>
            {s.sets.length} working sets logged •{' '}
            {s.completed ? 'Completed' : 'In Progress'}
          </Text>
          {s.notes ? <Text style={styles.sessionNotes}>{s.notes}</Text> : null}
        </View>
      ))}
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
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  brandSubtitle: {
    color: colors.accentPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  brandTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  quickStartBtn: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  quickStartBtnText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  sectionLink: {
    color: colors.accentPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  gapCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
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
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  gapBadgeText: {
    color: colors.warning,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  gapLink: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  gapTitle: {
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
  gapActionBtn: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.sm,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  gapActionBtnText: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  exposureCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  exposureItem: {
    marginBottom: spacing.md,
  },
  exposureInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  exposureMuscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  exposureTotalValue: {
    color: colors.accentPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  exposureTargetLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '400',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: colors.bgSecondary,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarDirect: {
    backgroundColor: colors.accentPrimary,
    height: '100%',
  },
  progressBarIndirect: {
    backgroundColor: colors.accentSecondary,
    height: '100%',
  },
  exposureLegendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  exposureLegendText: {
    color: colors.textMuted,
    fontSize: 10,
  },
  sessionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sessionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  sessionDate: {
    color: colors.textMuted,
    fontSize: 11,
  },
  sessionDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  sessionNotes: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  featuredCard: {
    backgroundColor: '#0d221c',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  featuredTagText: {
    color: colors.coverageInTarget,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  featuredTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  featuredDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  featuredBtn: {
    backgroundColor: colors.coverageInTarget,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
  },
  featuredBtnText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
});
