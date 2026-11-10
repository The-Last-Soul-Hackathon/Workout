import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  WorkoutSession,
  SetLog,
  canonicalExercises,
  RoundTemplate,
  Exercise,
  TechniqueQuality,
} from '../../shared';
import { RestTimerModal } from '../../components/RestTimerModal';

interface LiveWorkoutLoggerProps {
  roundTemplate?: RoundTemplate;
  sessionName?: string;
  onFinishSession: (session: WorkoutSession) => void;
  onCancel: () => void;
}

export const LiveWorkoutLogger: React.FC<LiveWorkoutLoggerProps> = ({
  roundTemplate,
  sessionName,
  onFinishSession,
  onCancel,
}) => {
  const [session, setSession] = useState<WorkoutSession>({
    id: `session_${Date.now()}`,
    roundTemplateId: roundTemplate?.id,
    name: sessionName || roundTemplate?.name || 'Live Workout Session',
    startedAt: new Date().toISOString(),
    completed: false,
    sets: [],
  });

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [restTimerVisible, setRestTimerVisible] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(90);

  // Per-exercise input state
  const [exerciseInputs, setExerciseInputs] = useState<
    Record<
      string,
      {
        value: number;
        rir: number;
        side: 'bilateral' | 'left' | 'right';
        techniqueQuality: TechniqueQuality;
      }
    >
  >({});

  // Initialize exercises from round template or fallback
  const exercisesToLog: Exercise[] = roundTemplate
    ? roundTemplate.exercises
        .map((re) => canonicalExercises.find((e) => e.id === re.exerciseId))
        .filter(Boolean) as Exercise[]
    : canonicalExercises.slice(0, 5);

  useEffect(() => {
    // Populate default values
    const initInputs: Record<string, any> = {};
    exercisesToLog.forEach((ex) => {
      const templateItem = roundTemplate?.exercises.find((re) => re.exerciseId === ex.id);
      initInputs[ex.id] = {
        value: templateItem?.defaultValue || (ex.defaultUnit === 'seconds' ? 15 : 5),
        rir: 2,
        side: ex.unilateral ? 'left' : 'bilateral',
        techniqueQuality: 'good',
      };
    });
    setExerciseInputs(initInputs);

    // Duration timer
    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCompleteSet = (exercise: Exercise) => {
    const input = exerciseInputs[exercise.id] || {
      value: 5,
      rir: 2,
      side: 'bilateral',
      techniqueQuality: 'good',
    };

    const exerciseSets = session.sets.filter((s) => s.exerciseId === exercise.id);
    const setNumber = exerciseSets.length + 1;

    const newSet: SetLog = {
      id: `set_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      sessionId: session.id,
      exerciseId: exercise.id,
      setNumber,
      reps: exercise.defaultUnit === 'reps' ? input.value : undefined,
      holdSeconds: exercise.defaultUnit === 'seconds' ? input.value : undefined,
      side: input.side,
      rir: input.rir,
      restSeconds: 90,
      techniqueQuality: input.techniqueQuality,
      completedAt: new Date().toISOString(),
      synced: false,
    };

    setSession((prev) => ({
      ...prev,
      sets: [...prev.sets, newSet],
    }));

    // If unilateral, flip side from left to right automatically
    if (exercise.unilateral && input.side === 'left') {
      setExerciseInputs((prev) => ({
        ...prev,
        [exercise.id]: { ...prev[exercise.id], side: 'right' },
      }));
    }

    // Trigger auto rest timer
    setRestTimerSeconds(90);
    setRestTimerVisible(true);
  };

  const handleFinish = () => {
    if (session.sets.length === 0) {
      Alert.alert('No sets logged', 'Please complete at least one set before finishing.');
      return;
    }

    const completedSession: WorkoutSession = {
      ...session,
      completed: true,
      endedAt: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
    };

    onFinishSession(completedSession);
  };

  return (
    <View style={styles.container}>
      {/* Active Workout Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.activeTag}>
            <View style={styles.pulsingDot} />
            <Text style={styles.activeTagText}>LIVE WORKOUT • {formatTimer(elapsedSeconds)}</Text>
          </View>
          <Text style={styles.sessionTitle}>{session.name}</Text>
          <Text style={styles.setCounter}>
            {session.sets.length} working sets completed
          </Text>
        </View>

        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelBtnText}>Discard</Text>
        </TouchableOpacity>
      </View>

      {/* Exercises List */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl * 3 }}
      >
        {exercisesToLog.map((ex, index) => {
          const completedSets = session.sets.filter((s) => s.exerciseId === ex.id);
          const input = exerciseInputs[ex.id] || {
            value: 5,
            rir: 2,
            side: 'bilateral',
            techniqueQuality: 'good',
          };

          return (
            <View key={ex.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <View style={styles.sequenceBadge}>
                  <Text style={styles.sequenceText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.categorySub}>{ex.category.toUpperCase()}</Text>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                </View>
                <Text style={styles.setsCountBadge}>{completedSets.length} Sets</Text>
              </View>

              {/* Logged Sets History for this exercise */}
              {completedSets.length > 0 && (
                <View style={styles.completedSetsList}>
                  {completedSets.map((s) => (
                    <View key={s.id} style={styles.setRowHistory}>
                      <Text style={styles.setNumberLabel}>Set {s.setNumber}:</Text>
                      <Text style={styles.setRepVal}>
                        {s.reps ? `${s.reps} reps` : `${s.holdSeconds}s`}
                      </Text>
                      {s.side !== 'bilateral' && (
                        <Text style={styles.setSideLabel}>({s.side})</Text>
                      )}
                      <Text style={styles.setRirLabel}>RIR: {s.rir ?? '-'}</Text>
                      <Text style={styles.setQualityLabel}>✓ {s.techniqueQuality}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Set Input Controls */}
              <View style={styles.inputControlsCard}>
                {/* Quantity Control (+/-) */}
                <View style={styles.controlRow}>
                  <Text style={styles.controlLabel}>
                    {ex.defaultUnit === 'seconds' ? 'Hold Time (s)' : 'Reps'}:
                  </Text>
                  <View style={styles.counterBox}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() =>
                        setExerciseInputs((prev) => ({
                          ...prev,
                          [ex.id]: {
                            ...input,
                            value: Math.max(1, input.value - 1),
                          },
                        }))
                      }
                    >
                      <Text style={styles.counterBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterVal}>{input.value}</Text>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() =>
                        setExerciseInputs((prev) => ({
                          ...prev,
                          [ex.id]: {
                            ...input,
                            value: input.value + 1,
                          },
                        }))
                      }
                    >
                      <Text style={styles.counterBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Effort / RIR Selector */}
                <View style={styles.controlRow}>
                  <Text style={styles.controlLabel}>RIR (Reps in Reserve):</Text>
                  <View style={styles.rirButtonsRow}>
                    {[0, 1, 2, 3].map((r) => (
                      <TouchableOpacity
                        key={r}
                        style={[
                          styles.rirBtn,
                          input.rir === r && styles.rirBtnActive,
                        ]}
                        onPress={() =>
                          setExerciseInputs((prev) => ({
                            ...prev,
                            [ex.id]: { ...input, rir: r },
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.rirBtnText,
                            input.rir === r && styles.rirBtnTextActive,
                          ]}
                        >
                          {r}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Unilateral Side Selector if applicable */}
                {ex.unilateral && (
                  <View style={styles.controlRow}>
                    <Text style={styles.controlLabel}>Side:</Text>
                    <View style={styles.sideButtonsRow}>
                      <TouchableOpacity
                        style={[
                          styles.sideBtn,
                          input.side === 'left' && styles.sideBtnActive,
                        ]}
                        onPress={() =>
                          setExerciseInputs((prev) => ({
                            ...prev,
                            [ex.id]: { ...input, side: 'left' },
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.sideBtnText,
                            input.side === 'left' && styles.sideBtnTextActive,
                          ]}
                        >
                          Left
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.sideBtn,
                          input.side === 'right' && styles.sideBtnActive,
                        ]}
                        onPress={() =>
                          setExerciseInputs((prev) => ({
                            ...prev,
                            [ex.id]: { ...input, side: 'right' },
                          }))
                        }
                      >
                        <Text
                          style={[
                            styles.sideBtnText,
                            input.side === 'right' && styles.sideBtnTextActive,
                          ]}
                        >
                          Right
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Fast Complete Set Button */}
                <TouchableOpacity
                  style={styles.completeSetBtn}
                  onPress={() => handleCompleteSet(ex)}
                >
                  <Text style={styles.completeSetBtnText}>
                    + LOG SET {completedSets.length + 1}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Bottom Finish Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishBtnText}>
            FINISH WORKOUT ({session.sets.length} SETS)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rest Timer Modal */}
      <RestTimerModal
        visible={restTimerVisible}
        initialSeconds={restTimerSeconds}
        onClose={() => setRestTimerVisible(false)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
    backgroundColor: colors.bgSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  activeTagText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sessionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  setCounter: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  cancelBtn: {
    padding: spacing.xs,
  },
  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  body: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sequenceBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sequenceText: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  categorySub: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  exerciseName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  setsCountBadge: {
    color: colors.accentPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  completedSetsList: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  setRowHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  setNumberLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  setRepVal: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  setSideLabel: {
    color: colors.accentSecondary,
    fontSize: 11,
  },
  setRirLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  setQualityLabel: {
    color: colors.success,
    fontSize: 11,
  },
  inputControlsCard: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  controlLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  counterBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  counterVal: {
    color: colors.accentPrimary,
    fontSize: 15,
    fontWeight: '800',
    minWidth: 28,
    textAlign: 'center',
  },
  rirButtonsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  rirBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  rirBtnActive: {
    backgroundColor: colors.accentPrimary,
    borderColor: colors.accentPrimary,
  },
  rirBtnText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  rirBtnTextActive: {
    color: colors.textInverse,
  },
  sideButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sideBtn: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sideBtnActive: {
    backgroundColor: colors.accentSecondary,
    borderColor: colors.accentSecondary,
  },
  sideBtnText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  sideBtnTextActive: {
    color: colors.textPrimary,
  },
  completeSetBtn: {
    backgroundColor: colors.accentPrimary,
    borderRadius: borderRadius.md,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 4,
  },
  completeSetBtnText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bgSecondary,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  finishBtn: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  finishBtnText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
