import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutSession, SetLog } from '../shared';

const SESSIONS_KEY = '@muscle_intelligence_sessions';
const ACTIVE_SESSION_KEY = '@muscle_intelligence_active_session';

export const storageService = {
  async getSessions(): Promise<WorkoutSession[]> {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      if (!data) return [];
      return JSON.parse(data) as WorkoutSession[];
    } catch (e) {
      console.error('Failed to load sessions from storage', e);
      return [];
    }
  },

  async saveSession(session: WorkoutSession): Promise<void> {
    try {
      const existing = await this.getSessions();
      const updated = [session, ...existing.filter((s) => s.id !== session.id)];
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save session to storage', e);
    }
  },

  async getActiveSession(): Promise<WorkoutSession | null> {
    try {
      const data = await AsyncStorage.getItem(ACTIVE_SESSION_KEY);
      if (!data) return null;
      return JSON.parse(data) as WorkoutSession;
    } catch (e) {
      console.error('Failed to get active session', e);
      return null;
    }
  },

  async setActiveSession(session: WorkoutSession | null): Promise<void> {
    try {
      if (!session) {
        await AsyncStorage.removeItem(ACTIVE_SESSION_KEY);
      } else {
        await AsyncStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
      }
    } catch (e) {
      console.error('Failed to set active session', e);
    }
  },

  // Seed sample initial workout session if empty so user immediately sees live data
  async initSampleDataIfEmpty(): Promise<WorkoutSession[]> {
    const existing = await this.getSessions();
    if (existing.length > 0) return existing;

    const sampleSession: WorkoutSession = {
      id: 'sample_session_round_01',
      roundTemplateId: 'round_01',
      name: 'Round 1 — Foundation Circuit',
      startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      endedAt: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
      durationSeconds: 1800,
      completed: true,
      notes: 'Initial test round. Felt solid on pull-ups, push-ups crisp.',
      sets: [
        {
          id: 'set_1',
          sessionId: 'sample_session_round_01',
          exerciseId: 'jumping_standard',
          setNumber: 1,
          reps: 45,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 * 2 + 300000).toISOString(),
          synced: true,
        },
        {
          id: 'set_2',
          sessionId: 'sample_session_round_01',
          exerciseId: 'pullup_standard',
          setNumber: 1,
          reps: 3,
          rir: 2,
          rpe: 8,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 * 2 + 600000).toISOString(),
          synced: true,
        },
        {
          id: 'set_3',
          sessionId: 'sample_session_round_01',
          exerciseId: 'crunches_standard',
          setNumber: 1,
          reps: 6,
          rir: 3,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 * 2 + 900000).toISOString(),
          synced: true,
        },
        {
          id: 'set_4',
          sessionId: 'sample_session_round_01',
          exerciseId: 'pushup_standard',
          setNumber: 1,
          reps: 5,
          rir: 2,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 * 2 + 1200000).toISOString(),
          synced: true,
        },
        {
          id: 'set_5',
          sessionId: 'sample_session_round_01',
          exerciseId: 'squat_bodyweight',
          setNumber: 1,
          reps: 6,
          rir: 4,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 * 2 + 1500000).toISOString(),
          synced: true,
        },
      ],
    };

    const sampleMobilitySession: WorkoutSession = {
      id: 'sample_session_round_23',
      roundTemplateId: 'round_23',
      name: 'Round 23 — Dynamic Flow (Mobility)',
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      endedAt: new Date(Date.now() - 86400000 + 1200000).toISOString(),
      durationSeconds: 1200,
      completed: true,
      notes: 'Full vinyasa mobility sequence. Deep opening in hamstrings, calves, and thoracic spine.',
      sets: [
        {
          id: 'set_r23_1',
          sessionId: 'sample_session_round_23',
          exerciseId: 'surya_namaskar',
          setNumber: 1,
          reps: 5,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 + 300000).toISOString(),
          synced: true,
        },
        {
          id: 'set_r23_2',
          sessionId: 'sample_session_round_23',
          exerciseId: 'tadasana',
          setNumber: 1,
          holdSeconds: 30,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 + 500000).toISOString(),
          synced: true,
        },
        {
          id: 'set_r23_3',
          sessionId: 'sample_session_round_23',
          exerciseId: 'ardha_uttanasana',
          setNumber: 1,
          holdSeconds: 30,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 + 700000).toISOString(),
          synced: true,
        },
        {
          id: 'set_r23_4',
          sessionId: 'sample_session_round_23',
          exerciseId: 'adho_mukha_svanasana',
          setNumber: 1,
          holdSeconds: 45,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 + 900000).toISOString(),
          synced: true,
        },
        {
          id: 'set_r23_5',
          sessionId: 'sample_session_round_23',
          exerciseId: 'cat_cow_stretch',
          setNumber: 1,
          reps: 10,
          side: 'bilateral',
          techniqueQuality: 'good',
          completedAt: new Date(Date.now() - 86400000 + 1100000).toISOString(),
          synced: true,
        },
      ],
    };

    await this.saveSession(sampleSession);
    await this.saveSession(sampleMobilitySession);
    return [sampleSession, sampleMobilitySession];
  },
};
