import React, { useState, useEffect } from 'react';
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
  canonicalRounds,
  canonicalExercises,
  RoundTemplate,
  WorkoutSession,
} from '../../shared';
import { LiveWorkoutLogger } from './LiveWorkoutLogger';

interface WorkoutsScreenProps {
  sessions: WorkoutSession[];
  initialRoundId?: string | null;
  onSessionFinished: (session: WorkoutSession) => void;
}

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  sessions,
  initialRoundId,
  onSessionFinished,
}) => {
  const [activeTab, setActiveTab] = useState<'rounds' | 'history'>('rounds');
  const [roundFilter, setRoundFilter] = useState<'all' | 'strength' | 'mobility' | 'accessory'>('all');
  const [roundSearch, setRoundSearch] = useState('');
  const [selectedRoundForLive, setSelectedRoundForLive] = useState<RoundTemplate | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(false);

  useEffect(() => {
    if (initialRoundId) {
      const found = canonicalRounds.find((r) => r.id === initialRoundId);
      if (found) {
        setSelectedRoundForLive(found);
        setIsLiveActive(true);
      }
    }
  }, [initialRoundId]);

  const handleStartRound = (round: RoundTemplate) => {
    setSelectedRoundForLive(round);
    setIsLiveActive(true);
  };

  const handleFinishSession = (session: WorkoutSession) => {
    setIsLiveActive(false);
    setSelectedRoundForLive(null);
    onSessionFinished(session);
  };

  if (isLiveActive) {
    return (
      <LiveWorkoutLogger
        roundTemplate={selectedRoundForLive || undefined}
        onFinishSession={handleFinishSession}
        onCancel={() => {
          setIsLiveActive(false);
          setSelectedRoundForLive(null);
        }}
      />
    );
  }

  const getExerciseName = (id: string) => {
    return canonicalExercises.find((e) => e.id === id)?.name || id.replace(/_/g, ' ');
  };

  const filteredRounds = canonicalRounds.filter((r) => {
    const matchesFilter =
      roundFilter === 'all' ||
      (roundFilter === 'strength' && r.type === 'strength_conditioning') ||
      (roundFilter === 'mobility' && r.type === 'mobility') ||
      (roundFilter === 'accessory' && r.type === 'accessory_balance');

    const searchLower = roundSearch.toLowerCase();
    const matchesSearch =
      !roundSearch ||
      r.name.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower) ||
      `round ${r.roundNumber}`.includes(searchLower) ||
      r.exercises.some((item) => getExerciseName(item.exerciseId).toLowerCase().includes(searchLower));

    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>TRAINING TEMPLATES & HISTORY</Text>
          <Text style={styles.title}>My Training</Text>
        </View>
        <TouchableOpacity
          style={styles.quickStartBtn}
          onPress={() => {
            setSelectedRoundForLive(null);
            setIsLiveActive(true);
          }}
        >
          <Text style={styles.quickStartBtnText}>+ Free Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'rounds' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('rounds')}
        >
          <Text style={[styles.segmentText, activeTab === 'rounds' && styles.segmentTextActive]}>
            Round Templates ({canonicalRounds.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'history' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.segmentText, activeTab === 'history' && styles.segmentTextActive]}>
            Session Logs ({sessions.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Round Filter & Search Bar when in Rounds tab */}
      {activeTab === 'rounds' && (
        <View style={styles.filterSection}>
          <TextInput
            style={styles.roundSearchInput}
            placeholder="Search rounds (e.g. Round 23, flow, pull-up, squats)..."
            placeholderTextColor={colors.textMuted}
            value={roundSearch}
            onChangeText={setRoundSearch}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roundCategoryScroll}>
            {[
              { id: 'all', label: `All (${canonicalRounds.length})` },
              { id: 'strength', label: 'Strength (1–22)' },
              { id: 'mobility', label: 'Mobility Flow (23–25)' },
              { id: 'accessory', label: 'Accessory (26)' },
            ].map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.roundChip, roundFilter === cat.id && styles.roundChipActive]}
                onPress={() => setRoundFilter(cat.id as any)}
              >
                <Text style={[styles.roundChipText, roundFilter === cat.id && styles.roundChipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Content Area */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl * 2 }}
      >
        {activeTab === 'rounds' ? (
          /* ROUND TEMPLATES */
          <View>
            <View style={styles.roundCountRow}>
              <Text style={styles.sectionHeader}>
                Showing {filteredRounds.length} of {canonicalRounds.length} Rounds
              </Text>
              {roundFilter === 'mobility' && (
                <View style={styles.mobilityNotice}>
                  <Text style={styles.mobilityNoticeText}>🌿 Dynamic Flows & Mobility Sequences</Text>
                </View>
              )}
            </View>

            {filteredRounds.length === 0 ? (
              <Text style={styles.emptyText}>No matching rounds found.</Text>
            ) : (
              filteredRounds.map((round) => (
                <View
                  key={round.id}
                  style={[
                    styles.roundCard,
                    round.type === 'mobility' && styles.roundCardMobility,
                    round.roundNumber === 23 && styles.roundCardHighlight23,
                  ]}
                >
                  <View style={styles.roundHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.badgeRow}>
                        <Text
                          style={[
                            styles.roundNumber,
                            round.type === 'mobility' && styles.roundNumberMobility,
                          ]}
                        >
                          ROUND {round.roundNumber} • {round.type.toUpperCase().replace(/_/g, ' ')}
                        </Text>
                        {round.roundNumber === 23 && (
                          <View style={styles.tag23}>
                            <Text style={styles.tag23Text}>VINYASA FLOW</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.roundName}>{round.name}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.startRoundBtn,
                        round.type === 'mobility' && styles.startRoundBtnMobility,
                      ]}
                      onPress={() => handleStartRound(round)}
                    >
                      <Text
                        style={[
                          styles.startRoundBtnText,
                          round.type === 'mobility' && styles.startRoundBtnTextMobility,
                        ]}
                      >
                        Start →
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.roundDesc}>{round.description}</Text>

                  {/* Exercises in this round */}
                  <View style={styles.roundExercisesList}>
                    {round.exercises.map((item, idx) => (
                      <View key={idx} style={styles.roundExRow}>
                        <Text style={styles.roundExCategory}>
                          {item.category.toUpperCase()}:
                        </Text>
                        <Text style={styles.roundExName}>
                          {getExerciseName(item.exerciseId)}
                        </Text>
                        <Text style={styles.roundExValue}>
                          {item.defaultValue} {item.unit}
                          {item.sideRule === 'each_side' ? ' / side' : ''}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          /* SESSION LOGS HISTORY */
          <View>
            <Text style={styles.sectionHeader}>Recorded Workout Sessions</Text>
            {sessions.length === 0 ? (
              <Text style={styles.emptyText}>No workout sessions recorded yet.</Text>
            ) : (
              sessions.map((s) => (
                <View key={s.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyTitle}>{s.name}</Text>
                    <Text style={styles.historyDate}>
                      {new Date(s.startedAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.historyMeta}>
                    {s.sets.length} working sets • {Math.round((s.durationSeconds || 1800) / 60)} min
                  </Text>

                  {/* Summary of exercises in session */}
                  <View style={styles.historySetsPreview}>
                    {s.sets.map((set, i) => (
                      <Text key={set.id || i} style={styles.historySetItem}>
                        • {getExerciseName(set.exerciseId)}: {set.reps != null ? `${set.reps} reps` : set.holdSeconds != null ? `${set.holdSeconds}s` : set.distanceMeters != null ? `${set.distanceMeters}m` : set.flightsClimbed != null ? `${set.flightsClimbed} fl` : ''} (RIR: {set.rir ?? '-'})
                      </Text>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  quickStartBtn: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  quickStartBtnText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  segmentBtnActive: {
    backgroundColor: colors.accentPrimary,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.textInverse,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  sectionHeader: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  roundCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  roundHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  roundNumber: {
    color: colors.accentPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  roundName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
  startRoundBtn: {
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  startRoundBtnText: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  roundDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  roundExercisesList: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  roundExRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  roundExCategory: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    width: 50,
  },
  roundExName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  roundExValue: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  historyDate: {
    color: colors.textMuted,
    fontSize: 11,
  },
  historyMeta: {
    color: colors.accentPrimary,
    fontSize: 12,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  historySetsPreview: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
  },
  historySetItem: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  filterSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  roundSearchInput: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  roundCategoryScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  roundChip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginRight: spacing.xs,
  },
  roundChipActive: {
    backgroundColor: colors.accentPrimary,
    borderColor: colors.accentPrimary,
  },
  roundChipText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  roundChipTextActive: {
    color: colors.textInverse,
    fontWeight: '700',
  },
  roundCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  mobilityNotice: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  mobilityNoticeText: {
    color: colors.coverageInTarget,
    fontSize: 11,
    fontWeight: '600',
  },
  roundCardMobility: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  roundCardHighlight23: {
    borderWidth: 1.5,
    borderColor: colors.coverageInTarget,
    backgroundColor: '#0f1f1a',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  roundNumberMobility: {
    color: colors.coverageInTarget,
  },
  tag23: {
    backgroundColor: colors.coverageInTarget,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
  },
  tag23Text: {
    color: colors.textInverse,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  startRoundBtnMobility: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  startRoundBtnTextMobility: {
    color: colors.coverageInTarget,
  },
});
