import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, G, Rect, Text as SvgText } from 'react-native-svg';
import { colors, spacing, borderRadius, MuscleExposure, canonicalMuscles } from '../shared';

interface AnatomyMapProps {
  exposures?: MuscleExposure[];
  selectedMuscleId?: string | null;
  onSelectMuscle: (muscleId: string) => void;
}

export const AnatomyMap: React.FC<AnatomyMapProps> = ({
  exposures = [],
  selectedMuscleId,
  onSelectMuscle,
}) => {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  const getMuscleColor = (muscleId: string) => {
    const isSelected = selectedMuscleId === muscleId;
    if (isSelected) return colors.accentPrimary;

    const exp = exposures.find((e) => e.muscleId === muscleId);
    if (!exp || exp.totalExposure === 0) return '#334155'; // Unassessed / low
    if (exp.status === 'in_target') return colors.coverageInTarget;
    if (exp.status === 'above_target') return colors.coverageAbove;
    return colors.coverageBelow;
  };

  const selectedExp = selectedMuscleId
    ? exposures.find((e) => e.muscleId === selectedMuscleId)
    : null;
  const selectedMuscleObj = selectedMuscleId
    ? canonicalMuscles.find((m) => m.id === selectedMuscleId)
    : null;

  return (
    <View style={styles.container}>
      {/* View Toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'front' && styles.toggleBtnActive]}
          onPress={() => setViewMode('front')}
        >
          <Text style={[styles.toggleText, viewMode === 'front' && styles.toggleTextActive]}>
            Front Anatomy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'back' && styles.toggleBtnActive]}
          onPress={() => setViewMode('back')}
        >
          <Text style={[styles.toggleText, viewMode === 'back' && styles.toggleTextActive]}>
            Back Anatomy
          </Text>
        </TouchableOpacity>
      </View>

      {/* SVG Canvas */}
      <View style={styles.svgWrapper}>
        <Svg width="260" height="340" viewBox="0 0 260 340">
          {viewMode === 'front' ? (
            /* FRONT BODY */
            <G>
              {/* Head / Neck */}
              <Rect x="115" y="10" width="30" height="35" rx="15" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <TouchableOpacity onPress={() => onSelectMuscle('deep_cervical_flexors')}>
                <Rect
                  x="120"
                  y="48"
                  width="20"
                  height="12"
                  rx="3"
                  fill={getMuscleColor('deep_cervical_flexors')}
                  stroke={selectedMuscleId === 'deep_cervical_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Shoulders - Anterior Deltoids */}
              <TouchableOpacity onPress={() => onSelectMuscle('deltoid_anterior')}>
                {/* Left Shoulder */}
                <Path
                  d="M 85 62 C 72 65 65 80 68 95 C 75 95 85 85 92 78 Z"
                  fill={getMuscleColor('deltoid_anterior')}
                  stroke={selectedMuscleId === 'deltoid_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                {/* Right Shoulder */}
                <Path
                  d="M 175 62 C 188 65 195 80 192 95 C 185 95 175 85 168 78 Z"
                  fill={getMuscleColor('deltoid_anterior')}
                  stroke={selectedMuscleId === 'deltoid_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Chest - Pectoralis Major */}
              <TouchableOpacity onPress={() => onSelectMuscle('pectoralis_major_sternal')}>
                {/* Left Chest */}
                <Path
                  d="M 94 66 C 115 65 125 70 127 96 C 110 102 96 98 88 84 Z"
                  fill={getMuscleColor('pectoralis_major_sternal')}
                  stroke={selectedMuscleId === 'pectoralis_major_sternal' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                {/* Right Chest */}
                <Path
                  d="M 166 66 C 145 65 135 70 133 96 C 150 102 164 98 172 84 Z"
                  fill={getMuscleColor('pectoralis_major_sternal')}
                  stroke={selectedMuscleId === 'pectoralis_major_sternal' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Arms - Biceps Brachii */}
              <TouchableOpacity onPress={() => onSelectMuscle('biceps_brachii')}>
                <Rect
                  x="56"
                  y="98"
                  width="18"
                  height="36"
                  rx="7"
                  fill={getMuscleColor('biceps_brachii')}
                  stroke={selectedMuscleId === 'biceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="186"
                  y="98"
                  width="18"
                  height="36"
                  rx="7"
                  fill={getMuscleColor('biceps_brachii')}
                  stroke={selectedMuscleId === 'biceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Forearms - Flexors */}
              <TouchableOpacity onPress={() => onSelectMuscle('forearm_flexors')}>
                <Rect
                  x="48"
                  y="138"
                  width="16"
                  height="42"
                  rx="6"
                  fill={getMuscleColor('forearm_flexors')}
                  stroke={selectedMuscleId === 'forearm_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="196"
                  y="138"
                  width="16"
                  height="42"
                  rx="6"
                  fill={getMuscleColor('forearm_flexors')}
                  stroke={selectedMuscleId === 'forearm_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Core - Rectus Abdominis */}
              <TouchableOpacity onPress={() => onSelectMuscle('rectus_abdominis')}>
                <G>
                  <Rect
                    x="114"
                    y="102"
                    width="14"
                    height="18"
                    rx="3"
                    fill={getMuscleColor('rectus_abdominis')}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <Rect
                    x="132"
                    y="102"
                    width="14"
                    height="18"
                    rx="3"
                    fill={getMuscleColor('rectus_abdominis')}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <Rect
                    x="114"
                    y="124"
                    width="14"
                    height="18"
                    rx="3"
                    fill={getMuscleColor('rectus_abdominis')}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <Rect
                    x="132"
                    y="124"
                    width="14"
                    height="18"
                    rx="3"
                    fill={getMuscleColor('rectus_abdominis')}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <Rect
                    x="115"
                    y="146"
                    width="30"
                    height="18"
                    rx="3"
                    fill={getMuscleColor('rectus_abdominis')}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                </G>
              </TouchableOpacity>

              {/* Core - Obliques */}
              <TouchableOpacity onPress={() => onSelectMuscle('obliques')}>
                <Path
                  d="M 94 106 C 108 106 108 152 102 158 C 92 144 90 120 94 106 Z"
                  fill={getMuscleColor('obliques')}
                  stroke={selectedMuscleId === 'obliques' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Path
                  d="M 166 106 C 152 106 152 152 158 158 C 168 144 170 120 166 106 Z"
                  fill={getMuscleColor('obliques')}
                  stroke={selectedMuscleId === 'obliques' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Legs - Quadriceps */}
              <TouchableOpacity onPress={() => onSelectMuscle('quadriceps')}>
                {/* Left Quad */}
                <Path
                  d="M 98 172 C 122 172 124 238 116 248 C 104 248 92 235 90 190 Z"
                  fill={getMuscleColor('quadriceps')}
                  stroke={selectedMuscleId === 'quadriceps' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                {/* Right Quad */}
                <Path
                  d="M 162 172 C 138 172 136 238 144 248 C 156 248 168 235 170 190 Z"
                  fill={getMuscleColor('quadriceps')}
                  stroke={selectedMuscleId === 'quadriceps' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Shins - Tibialis Anterior */}
              <TouchableOpacity onPress={() => onSelectMuscle('tibialis_anterior')}>
                <Rect
                  x="96"
                  y="256"
                  width="14"
                  height="54"
                  rx="6"
                  fill={getMuscleColor('tibialis_anterior')}
                  stroke={selectedMuscleId === 'tibialis_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="150"
                  y="256"
                  width="14"
                  height="54"
                  rx="6"
                  fill={getMuscleColor('tibialis_anterior')}
                  stroke={selectedMuscleId === 'tibialis_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>
            </G>
          ) : (
            /* BACK BODY */
            <G>
              {/* Head / Neck */}
              <Rect x="115" y="10" width="30" height="35" rx="15" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

              {/* Upper Trapezius */}
              <TouchableOpacity onPress={() => onSelectMuscle('trapezius_upper')}>
                <Path
                  d="M 115 48 L 145 48 L 168 64 L 92 64 Z"
                  fill={getMuscleColor('trapezius_upper')}
                  stroke={selectedMuscleId === 'trapezius_upper' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Mid / Lower Trapezius & Rhomboids */}
              <TouchableOpacity onPress={() => onSelectMuscle('trapezius_mid_lower')}>
                <Path
                  d="M 94 66 L 166 66 L 142 118 L 118 118 Z"
                  fill={getMuscleColor('trapezius_mid_lower')}
                  stroke={selectedMuscleId === 'trapezius_mid_lower' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Posterior Deltoids */}
              <TouchableOpacity onPress={() => onSelectMuscle('deltoid_posterior')}>
                <Path
                  d="M 85 64 C 70 66 64 82 66 94 C 74 94 84 86 92 78 Z"
                  fill={getMuscleColor('deltoid_posterior')}
                  stroke={selectedMuscleId === 'deltoid_posterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Path
                  d="M 175 64 C 190 66 196 82 194 94 C 186 94 176 86 168 78 Z"
                  fill={getMuscleColor('deltoid_posterior')}
                  stroke={selectedMuscleId === 'deltoid_posterior' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Latissimus Dorsi */}
              <TouchableOpacity onPress={() => onSelectMuscle('latissimus_dorsi')}>
                <Path
                  d="M 88 88 C 104 88 114 116 116 142 C 96 140 88 116 88 88 Z"
                  fill={getMuscleColor('latissimus_dorsi')}
                  stroke={selectedMuscleId === 'latissimus_dorsi' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Path
                  d="M 172 88 C 156 88 146 116 144 142 C 164 140 172 116 172 88 Z"
                  fill={getMuscleColor('latissimus_dorsi')}
                  stroke={selectedMuscleId === 'latissimus_dorsi' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Arms - Triceps Brachii */}
              <TouchableOpacity onPress={() => onSelectMuscle('triceps_brachii')}>
                <Rect
                  x="56"
                  y="96"
                  width="18"
                  height="38"
                  rx="7"
                  fill={getMuscleColor('triceps_brachii')}
                  stroke={selectedMuscleId === 'triceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="186"
                  y="96"
                  width="18"
                  height="38"
                  rx="7"
                  fill={getMuscleColor('triceps_brachii')}
                  stroke={selectedMuscleId === 'triceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Gluteus Maximus */}
              <TouchableOpacity onPress={() => onSelectMuscle('gluteus_maximus')}>
                <Path
                  d="M 96 160 C 126 158 128 200 114 206 C 96 206 92 184 96 160 Z"
                  fill={getMuscleColor('gluteus_maximus')}
                  stroke={selectedMuscleId === 'gluteus_maximus' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Path
                  d="M 164 160 C 134 158 132 200 146 206 C 164 206 168 184 164 160 Z"
                  fill={getMuscleColor('gluteus_maximus')}
                  stroke={selectedMuscleId === 'gluteus_maximus' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Thighs - Hamstrings */}
              <TouchableOpacity onPress={() => onSelectMuscle('hamstrings')}>
                <Rect
                  x="96"
                  y="210"
                  width="26"
                  height="44"
                  rx="6"
                  fill={getMuscleColor('hamstrings')}
                  stroke={selectedMuscleId === 'hamstrings' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="138"
                  y="210"
                  width="26"
                  height="44"
                  rx="6"
                  fill={getMuscleColor('hamstrings')}
                  stroke={selectedMuscleId === 'hamstrings' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>

              {/* Calves - Gastrocnemius */}
              <TouchableOpacity onPress={() => onSelectMuscle('gastrocnemius')}>
                <Rect
                  x="96"
                  y="260"
                  width="24"
                  height="48"
                  rx="7"
                  fill={getMuscleColor('gastrocnemius')}
                  stroke={selectedMuscleId === 'gastrocnemius' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
                <Rect
                  x="140"
                  y="260"
                  width="24"
                  height="48"
                  rx="7"
                  fill={getMuscleColor('gastrocnemius')}
                  stroke={selectedMuscleId === 'gastrocnemius' ? colors.textPrimary : '#475569'}
                  strokeWidth="1.5"
                />
              </TouchableOpacity>
            </G>
          )}
        </Svg>
      </View>

      {/* Quick Selected Muscle Card */}
      {selectedMuscleObj && (
        <View style={styles.selectedMuscleBar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.selectedMuscleName}>{selectedMuscleObj.name}</Text>
            <Text style={styles.selectedMuscleMeta}>
              {selectedExp ? `${selectedExp.totalExposure} sets logged` : '0 sets logged'} • Target: {selectedMuscleObj.defaultWeeklyTargetMin}-{selectedMuscleObj.defaultWeeklyTargetMax} sets/wk
            </Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: getMuscleColor(selectedMuscleObj.id) }]}>
            <Text style={styles.statusPillText}>
              {selectedExp?.status === 'in_target'
                ? 'IN TARGET'
                : selectedExp?.status === 'above_target'
                ? 'ABOVE'
                : 'DEFICIT'}
            </Text>
          </View>
        </View>
      )}

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageBelow }]} />
          <Text style={styles.legendLabel}>Below Target</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageInTarget }]} />
          <Text style={styles.legendLabel}>In Target</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageAbove }]} />
          <Text style={styles.legendLabel}>Above</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#334155' }]} />
          <Text style={styles.legendLabel}>Unassessed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: spacing.md,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
  },
  toggleBtnActive: {
    backgroundColor: colors.accentPrimary,
  },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: colors.textInverse,
  },
  svgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  selectedMuscleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: '100%',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  selectedMuscleName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  selectedMuscleMeta: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  statusPillText: {
    color: colors.textInverse,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
