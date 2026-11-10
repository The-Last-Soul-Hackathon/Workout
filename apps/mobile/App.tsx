import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  colors,
  spacing,
  borderRadius,
  canonicalExercises,
  canonicalMuscles,
  calculateWeeklyExposure,
  analyzeCoverageGaps,
  WorkoutSession,
  Exercise,
  MuscleExposure,
  CoverageGap,
} from './src/shared';
import { storageService } from './src/services/storage';
import { DashboardScreen } from './src/features/dashboard/DashboardScreen';
import { MuscleExplorerScreen } from './src/features/muscles/MuscleExplorerScreen';
import { ExercisesScreen } from './src/features/exercises/ExercisesScreen';
import { WorkoutsScreen } from './src/features/workouts/WorkoutsScreen';
import { AnalysisScreen } from './src/features/analysis/AnalysisScreen';
import { ExerciseComparisonScreen } from './src/features/comparison/ExerciseComparisonScreen';
import { ExerciseDetailModal } from './src/features/exercises/ExerciseDetailModal';

type NavTab = 'overview' | 'muscles' | 'exercises' | 'workouts' | 'analysis';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [exposures, setExposures] = useState<MuscleExposure[]>([]);
  const [gaps, setGaps] = useState<CoverageGap[]>([]);

  // Navigation parameter states
  const [initialMuscleId, setInitialMuscleId] = useState<string | null>(null);
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);

  // Comparison Modal state
  const [comparisonPair, setComparisonPair] = useState<{
    exerciseA: Exercise;
    exerciseB: Exercise;
  } | null>(null);

  // Initial load
  useEffect(() => {
    async function loadData() {
      const loaded = await storageService.initSampleDataIfEmpty();
      setSessions(loaded);
    }
    loadData();
  }, []);

  // Re-calculate exposure whenever sessions update
  useEffect(() => {
    const output = calculateWeeklyExposure(sessions, canonicalExercises, canonicalMuscles);
    setExposures(output.value);
    const identifiedGaps = analyzeCoverageGaps(output.value, canonicalExercises);
    setGaps(identifiedGaps);
  }, [sessions]);

  const handleSessionFinished = async (newSession: WorkoutSession) => {
    await storageService.saveSession(newSession);
    const updated = await storageService.getSessions();
    setSessions(updated);
  };

  const handleNavigateToMuscles = (muscleId?: string) => {
    if (muscleId) setInitialMuscleId(muscleId);
    setActiveTab('muscles');
  };

  const handleCompareExercises = (exerciseA: Exercise, exerciseB: Exercise) => {
    setComparisonPair({ exerciseA, exerciseB });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        {/* Screen Switcher */}
        <View style={styles.screenContainer}>
          {activeTab === 'overview' && (
            <DashboardScreen
              sessions={sessions}
              exposures={exposures}
              gaps={gaps}
              onNavigateToMuscles={handleNavigateToMuscles}
              onNavigateToWorkouts={() => setActiveTab('workouts')}
              onNavigateToAnalysis={() => setActiveTab('analysis')}
            />
          )}

          {activeTab === 'muscles' && (
            <MuscleExplorerScreen
              exposures={exposures}
              initialMuscleId={initialMuscleId}
              onSelectExercise={(ex) => setSelectedExerciseModal(ex)}
            />
          )}

          {activeTab === 'exercises' && (
            <ExercisesScreen onCompareExercises={handleCompareExercises} />
          )}

          {activeTab === 'workouts' && (
            <WorkoutsScreen
              sessions={sessions}
              onSessionFinished={handleSessionFinished}
            />
          )}

          {activeTab === 'analysis' && (
            <AnalysisScreen
              exposures={exposures}
              gaps={gaps}
              onSelectExercise={(ex) => setSelectedExerciseModal(ex)}
              onNavigateToMuscles={handleNavigateToMuscles}
            />
          )}
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navItem, activeTab === 'overview' && styles.navItemActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={styles.navIcon}>⚡</Text>
            <Text style={[styles.navLabel, activeTab === 'overview' && styles.navLabelActive]}>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'muscles' && styles.navItemActive]}
            onPress={() => setActiveTab('muscles')}
          >
            <Text style={styles.navIcon}>🧬</Text>
            <Text style={[styles.navLabel, activeTab === 'muscles' && styles.navLabelActive]}>
              Muscles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'exercises' && styles.navItemActive]}
            onPress={() => setActiveTab('exercises')}
          >
            <Text style={styles.navIcon}>📖</Text>
            <Text style={[styles.navLabel, activeTab === 'exercises' && styles.navLabelActive]}>
              Exercises
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'workouts' && styles.navItemActive]}
            onPress={() => setActiveTab('workouts')}
          >
            <Text style={styles.navIcon}>🏋️</Text>
            <Text style={[styles.navLabel, activeTab === 'workouts' && styles.navLabelActive]}>
              Training
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'analysis' && styles.navItemActive]}
            onPress={() => setActiveTab('analysis')}
          >
            <Text style={styles.navIcon}>📊</Text>
            <Text style={[styles.navLabel, activeTab === 'analysis' && styles.navLabelActive]}>
              Analysis
            </Text>
          </TouchableOpacity>
        </View>

        {/* Global Exercise Detail Modal */}
        <ExerciseDetailModal
          exercise={selectedExerciseModal}
          visible={!!selectedExerciseModal}
          onClose={() => setSelectedExerciseModal(null)}
          onCompareWith={(exA: Exercise) => {
            const second = canonicalExercises.find((e: Exercise) => e.id !== exA.id) || canonicalExercises[0];
            setComparisonPair({ exerciseA: exA, exerciseB: second });
          }}
        />

        {/* Global Exercise Comparison Modal */}
        {comparisonPair && (
          <Modal visible={!!comparisonPair} animationType="slide">
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
              <ExerciseComparisonScreen
                initialExerciseA={comparisonPair.exerciseA}
                initialExerciseB={comparisonPair.exerciseB}
                onClose={() => setComparisonPair(null)}
              />
            </SafeAreaView>
          </Modal>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  screenContainer: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingVertical: spacing.xs,
    paddingBottom: spacing.sm,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
  },
  navItemActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  navLabelActive: {
    color: colors.accentPrimary,
    fontWeight: '700',
  },
});
