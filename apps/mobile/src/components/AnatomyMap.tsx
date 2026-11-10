import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, G, Rect, Circle, Ellipse, Text as SvgText } from 'react-native-svg';
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

  if (!canonicalMuscles || canonicalMuscles.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Anatomical Model Unavailable</Text>
        <Text style={styles.errorSubtitle}>
          Anatomy taxonomy data is missing or failed to initialize.
        </Text>
      </View>
    );
  }

  const getMuscleColor = (muscleId: string) => {
    const isSelected = selectedMuscleId === muscleId;
    if (isSelected) return colors.accentPrimary;

    const exp = exposures.find((e) => e.muscleId === muscleId);
    if (!exp) return '#334155'; // Unassessed
    if (exp.status === 'in_target') return colors.coverageInTarget;
    if (exp.status === 'above_target') return colors.coverageAbove;
    if (exp.status === 'below_target') return colors.coverageBelow;
    return '#334155';
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
          accessibilityRole="button"
          accessibilityLabel="Switch to Anterior Front Anatomy View"
        >
          <Text style={[styles.toggleText, viewMode === 'front' && styles.toggleTextActive]}>
            Anterior (Front)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'back' && styles.toggleBtnActive]}
          onPress={() => setViewMode('back')}
          accessibilityRole="button"
          accessibilityLabel="Switch to Posterior Back Anatomy View"
        >
          <Text style={[styles.toggleText, viewMode === 'back' && styles.toggleTextActive]}>
            Posterior (Back)
          </Text>
        </TouchableOpacity>
      </View>

      {/* SVG Anatomy Canvas */}
      <View style={styles.svgWrapper}>
        <Svg width="280" height="420" viewBox="0 0 280 420">
          {viewMode === 'front' ? (
            /* =========================================================================
             * ANTERIOR (FRONT) BODY ANATOMY
             * ========================================================================= */
            <G id="anterior_body">
              {/* Neutral Anatomical Body Silhouette Base */}
              <G id="body_silhouette_front" opacity={0.65}>
                {/* Cranium / Head */}
                <Ellipse cx="140" cy="38" rx="22" ry="26" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                {/* Neck Base */}
                <Path d="M 128 62 L 152 62 L 156 76 L 124 76 Z" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                {/* Clavicles / Torso Silhouette */}
                <Path
                  d="M 124 76 L 76 90 L 64 150 L 52 210 L 46 250 L 58 250 L 72 200 L 80 156 L 98 190 L 100 236 L 92 320 L 98 392 L 118 408 L 134 408 L 130 324 L 136 242 L 140 242 L 144 242 L 150 324 L 146 408 L 162 408 L 182 392 L 188 320 L 180 236 L 182 190 L 200 156 L 208 200 L 222 250 L 234 250 L 228 210 L 216 150 L 204 90 L 156 76 Z"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
              </G>

              {/* 1. Deep Cervical Flexors (Anterior Neck) */}
              <G
                id="muscle_deep_cervical_flexors"
                onPress={() => onSelectMuscle('deep_cervical_flexors')}
              >
                <Rect
                  x="128"
                  y="62"
                  width="24"
                  height="14"
                  rx="4"
                  fill={getMuscleColor('deep_cervical_flexors')}
                  stroke={selectedMuscleId === 'deep_cervical_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deep_cervical_flexors' ? 2 : 1}
                />
              </G>

              {/* 2. Deltoid Anterior (Front Shoulders) */}
              <G
                id="muscle_deltoid_anterior"
                onPress={() => onSelectMuscle('deltoid_anterior')}
              >
                {/* Left Anterior Deltoid */}
                <Path
                  d="M 94 80 C 80 84 72 98 76 114 C 84 114 96 102 104 92 Z"
                  fill={getMuscleColor('deltoid_anterior')}
                  stroke={selectedMuscleId === 'deltoid_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_anterior' ? 2 : 1}
                />
                {/* Right Anterior Deltoid */}
                <Path
                  d="M 186 80 C 200 84 208 98 204 114 C 196 114 184 102 176 92 Z"
                  fill={getMuscleColor('deltoid_anterior')}
                  stroke={selectedMuscleId === 'deltoid_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_anterior' ? 2 : 1}
                />
              </G>

              {/* 3. Deltoid Lateral (Side Shoulders) */}
              <G
                id="muscle_deltoid_lateral"
                onPress={() => onSelectMuscle('deltoid_lateral')}
              >
                {/* Left Lateral Deltoid Cap */}
                <Path
                  d="M 76 88 C 66 94 64 110 68 122 C 74 122 78 112 80 102 Z"
                  fill={getMuscleColor('deltoid_lateral')}
                  stroke={selectedMuscleId === 'deltoid_lateral' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_lateral' ? 2 : 1}
                />
                {/* Right Lateral Deltoid Cap */}
                <Path
                  d="M 204 88 C 214 94 216 110 212 122 C 206 122 202 112 200 102 Z"
                  fill={getMuscleColor('deltoid_lateral')}
                  stroke={selectedMuscleId === 'deltoid_lateral' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_lateral' ? 2 : 1}
                />
              </G>

              {/* 4. Pectoralis Major - Clavicular Head (Upper Chest) */}
              <G
                id="muscle_pectoralis_major_clavicular"
                onPress={() => onSelectMuscle('pectoralis_major_clavicular')}
              >
                <Path
                  d="M 106 82 L 138 82 L 138 94 L 98 94 Z"
                  fill={getMuscleColor('pectoralis_major_clavicular')}
                  stroke={selectedMuscleId === 'pectoralis_major_clavicular' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'pectoralis_major_clavicular' ? 2 : 1}
                />
                <Path
                  d="M 142 82 L 174 82 L 182 94 L 142 94 Z"
                  fill={getMuscleColor('pectoralis_major_clavicular')}
                  stroke={selectedMuscleId === 'pectoralis_major_clavicular' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'pectoralis_major_clavicular' ? 2 : 1}
                />
              </G>

              {/* 5. Pectoralis Major - Sternal Head (Mid/Lower Chest) */}
              <G
                id="muscle_pectoralis_major_sternal"
                onPress={() => onSelectMuscle('pectoralis_major_sternal')}
              >
                {/* Left Pectoral Sternal */}
                <Path
                  d="M 98 96 C 122 96 136 100 138 126 C 118 132 102 126 92 112 Z"
                  fill={getMuscleColor('pectoralis_major_sternal')}
                  stroke={selectedMuscleId === 'pectoralis_major_sternal' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'pectoralis_major_sternal' ? 2 : 1}
                />
                {/* Right Pectoral Sternal */}
                <Path
                  d="M 182 96 C 158 96 144 100 142 126 C 162 132 178 126 188 112 Z"
                  fill={getMuscleColor('pectoralis_major_sternal')}
                  stroke={selectedMuscleId === 'pectoralis_major_sternal' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'pectoralis_major_sternal' ? 2 : 1}
                />
              </G>

              {/* 6. Biceps Brachii (Anterior Upper Arm) */}
              <G
                id="muscle_biceps_brachii"
                onPress={() => onSelectMuscle('biceps_brachii')}
              >
                {/* Left Biceps */}
                <Rect
                  x="66"
                  y="126"
                  width="18"
                  height="40"
                  rx="8"
                  fill={getMuscleColor('biceps_brachii')}
                  stroke={selectedMuscleId === 'biceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'biceps_brachii' ? 2 : 1}
                />
                {/* Right Biceps */}
                <Rect
                  x="196"
                  y="126"
                  width="18"
                  height="40"
                  rx="8"
                  fill={getMuscleColor('biceps_brachii')}
                  stroke={selectedMuscleId === 'biceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'biceps_brachii' ? 2 : 1}
                />
              </G>

              {/* 7. Forearm Flexors (Anterior Forearms) */}
              <G
                id="muscle_forearm_flexors"
                onPress={() => onSelectMuscle('forearm_flexors')}
              >
                {/* Left Forearm Flexors */}
                <Rect
                  x="54"
                  y="172"
                  width="16"
                  height="46"
                  rx="6"
                  fill={getMuscleColor('forearm_flexors')}
                  stroke={selectedMuscleId === 'forearm_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'forearm_flexors' ? 2 : 1}
                />
                {/* Right Forearm Flexors */}
                <Rect
                  x="210"
                  y="172"
                  width="16"
                  height="46"
                  rx="6"
                  fill={getMuscleColor('forearm_flexors')}
                  stroke={selectedMuscleId === 'forearm_flexors' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'forearm_flexors' ? 2 : 1}
                />
              </G>

              {/* 8. Serratus Anterior (Lateral Ribcage) */}
              <G
                id="muscle_serratus_anterior"
                onPress={() => onSelectMuscle('serratus_anterior')}
              >
                {/* Left Serratus Digitations */}
                <Path
                  d="M 94 130 L 106 134 L 104 156 L 90 148 Z"
                  fill={getMuscleColor('serratus_anterior')}
                  stroke={selectedMuscleId === 'serratus_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'serratus_anterior' ? 2 : 1}
                />
                {/* Right Serratus Digitations */}
                <Path
                  d="M 186 130 L 174 134 L 176 156 L 190 148 Z"
                  fill={getMuscleColor('serratus_anterior')}
                  stroke={selectedMuscleId === 'serratus_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'serratus_anterior' ? 2 : 1}
                />
              </G>

              {/* 9. Rectus Abdominis (Anterior Core) */}
              <G
                id="muscle_rectus_abdominis"
                onPress={() => onSelectMuscle('rectus_abdominis')}
              >
                {/* Top Pack */}
                <Rect x="123" y="132" width="15" height="16" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
                <Rect x="142" y="132" width="15" height="16" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
                {/* Mid Pack */}
                <Rect x="123" y="152" width="15" height="16" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
                <Rect x="142" y="152" width="15" height="16" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
                {/* Lower Pack */}
                <Rect x="123" y="172" width="15" height="20" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
                <Rect x="142" y="172" width="15" height="20" rx="3" fill={getMuscleColor('rectus_abdominis')} stroke="#334155" strokeWidth="1" />
              </G>

              {/* 10. Obliques (Anterolateral Core) */}
              <G
                id="muscle_obliques"
                onPress={() => onSelectMuscle('obliques')}
              >
                {/* Left Obliques */}
                <Path
                  d="M 104 140 C 118 140 120 184 114 192 C 102 182 100 156 104 140 Z"
                  fill={getMuscleColor('obliques')}
                  stroke={selectedMuscleId === 'obliques' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'obliques' ? 2 : 1}
                />
                {/* Right Obliques */}
                <Path
                  d="M 176 140 C 162 140 160 184 166 192 C 178 182 180 156 176 140 Z"
                  fill={getMuscleColor('obliques')}
                  stroke={selectedMuscleId === 'obliques' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'obliques' ? 2 : 1}
                />
              </G>

              {/* 11. Quadriceps (Anterior Thighs) */}
              <G
                id="muscle_quadriceps"
                onPress={() => onSelectMuscle('quadriceps')}
              >
                {/* Left Quad */}
                <Path
                  d="M 106 206 C 134 206 136 280 126 294 C 112 294 98 280 96 226 Z"
                  fill={getMuscleColor('quadriceps')}
                  stroke={selectedMuscleId === 'quadriceps' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'quadriceps' ? 2 : 1}
                />
                {/* Right Quad */}
                <Path
                  d="M 174 206 C 146 206 144 280 154 294 C 168 294 182 280 184 226 Z"
                  fill={getMuscleColor('quadriceps')}
                  stroke={selectedMuscleId === 'quadriceps' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'quadriceps' ? 2 : 1}
                />
              </G>

              {/* 12. Tibialis Anterior (Anterior Shins) */}
              <G
                id="muscle_tibialis_anterior"
                onPress={() => onSelectMuscle('tibialis_anterior')}
              >
                {/* Left Shin */}
                <Rect
                  x="104"
                  y="306"
                  width="16"
                  height="66"
                  rx="7"
                  fill={getMuscleColor('tibialis_anterior')}
                  stroke={selectedMuscleId === 'tibialis_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'tibialis_anterior' ? 2 : 1}
                />
                {/* Right Shin */}
                <Rect
                  x="160"
                  y="306"
                  width="16"
                  height="66"
                  rx="7"
                  fill={getMuscleColor('tibialis_anterior')}
                  stroke={selectedMuscleId === 'tibialis_anterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'tibialis_anterior' ? 2 : 1}
                />
              </G>
            </G>
          ) : (
            /* =========================================================================
             * POSTERIOR (BACK) BODY ANATOMY
             * ========================================================================= */
            <G id="posterior_body">
              {/* Neutral Anatomical Body Silhouette Base */}
              <G id="body_silhouette_back" opacity={0.65}>
                {/* Head (Posterior view) */}
                <Ellipse cx="140" cy="38" rx="22" ry="26" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                {/* Posterior Silhouette Contour */}
                <Path
                  d="M 124 76 L 76 90 L 64 150 L 52 210 L 46 250 L 58 250 L 72 200 L 80 156 L 98 190 L 98 240 L 92 320 L 98 392 L 118 408 L 134 408 L 130 324 L 136 242 L 140 242 L 144 242 L 150 324 L 146 408 L 162 408 L 182 392 L 188 320 L 182 240 L 182 190 L 200 156 L 208 200 L 222 250 L 234 250 L 228 210 L 216 150 L 204 90 L 156 76 Z"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
              </G>

              {/* 1. Trapezius Upper (Neck & Shoulder Girdle) */}
              <G
                id="muscle_trapezius_upper"
                onPress={() => onSelectMuscle('trapezius_upper')}
              >
                <Path
                  d="M 124 60 L 156 60 L 184 80 L 96 80 Z"
                  fill={getMuscleColor('trapezius_upper')}
                  stroke={selectedMuscleId === 'trapezius_upper' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'trapezius_upper' ? 2 : 1}
                />
              </G>

              {/* 2. Trapezius Mid/Lower & Rhomboids (Interscapular Diamond) */}
              <G
                id="muscle_trapezius_mid_lower"
                onPress={() => onSelectMuscle('trapezius_mid_lower')}
              >
                <Path
                  d="M 104 82 L 176 82 L 150 144 L 130 144 Z"
                  fill={getMuscleColor('trapezius_mid_lower')}
                  stroke={selectedMuscleId === 'trapezius_mid_lower' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'trapezius_mid_lower' ? 2 : 1}
                />
              </G>

              {/* 3. Posterior Deltoids (Rear Shoulders) */}
              <G
                id="muscle_deltoid_posterior"
                onPress={() => onSelectMuscle('deltoid_posterior')}
              >
                {/* Left Posterior Deltoid */}
                <Path
                  d="M 94 80 C 78 84 70 100 74 114 C 82 114 94 104 102 94 Z"
                  fill={getMuscleColor('deltoid_posterior')}
                  stroke={selectedMuscleId === 'deltoid_posterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_posterior' ? 2 : 1}
                />
                {/* Right Posterior Deltoid */}
                <Path
                  d="M 186 80 C 202 84 210 100 206 114 C 198 114 186 104 178 94 Z"
                  fill={getMuscleColor('deltoid_posterior')}
                  stroke={selectedMuscleId === 'deltoid_posterior' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'deltoid_posterior' ? 2 : 1}
                />
              </G>

              {/* 4. Rotator Cuff (Infraspinatus & Teres Minor) */}
              <G
                id="muscle_rotator_cuff"
                onPress={() => onSelectMuscle('rotator_cuff')}
              >
                <Path
                  d="M 88 104 L 106 104 L 102 124 L 84 120 Z"
                  fill={getMuscleColor('rotator_cuff')}
                  stroke={selectedMuscleId === 'rotator_cuff' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'rotator_cuff' ? 2 : 1}
                />
                <Path
                  d="M 192 104 L 174 104 L 178 124 L 196 120 Z"
                  fill={getMuscleColor('rotator_cuff')}
                  stroke={selectedMuscleId === 'rotator_cuff' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'rotator_cuff' ? 2 : 1}
                />
              </G>

              {/* 5. Latissimus Dorsi (Broad Mid/Lower Back) */}
              <G
                id="muscle_latissimus_dorsi"
                onPress={() => onSelectMuscle('latissimus_dorsi')}
              >
                {/* Left Lat Wing */}
                <Path
                  d="M 94 106 C 114 106 126 136 128 174 C 104 170 94 140 94 106 Z"
                  fill={getMuscleColor('latissimus_dorsi')}
                  stroke={selectedMuscleId === 'latissimus_dorsi' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'latissimus_dorsi' ? 2 : 1}
                />
                {/* Right Lat Wing */}
                <Path
                  d="M 186 106 C 166 106 154 136 152 174 C 176 170 186 140 186 106 Z"
                  fill={getMuscleColor('latissimus_dorsi')}
                  stroke={selectedMuscleId === 'latissimus_dorsi' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'latissimus_dorsi' ? 2 : 1}
                />
              </G>

              {/* 6. Erector Spinae (Lower/Mid Spinal Column) */}
              <G
                id="muscle_erector_spinae"
                onPress={() => onSelectMuscle('erector_spinae')}
              >
                <Rect
                  x="132"
                  y="140"
                  width="16"
                  height="54"
                  rx="4"
                  fill={getMuscleColor('erector_spinae')}
                  stroke={selectedMuscleId === 'erector_spinae' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'erector_spinae' ? 2 : 1}
                />
              </G>

              {/* 7. Triceps Brachii (Posterior Upper Arms) */}
              <G
                id="muscle_triceps_brachii"
                onPress={() => onSelectMuscle('triceps_brachii')}
              >
                {/* Left Triceps */}
                <Rect
                  x="64"
                  y="124"
                  width="18"
                  height="44"
                  rx="8"
                  fill={getMuscleColor('triceps_brachii')}
                  stroke={selectedMuscleId === 'triceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'triceps_brachii' ? 2 : 1}
                />
                {/* Right Triceps */}
                <Rect
                  x="198"
                  y="124"
                  width="18"
                  height="44"
                  rx="8"
                  fill={getMuscleColor('triceps_brachii')}
                  stroke={selectedMuscleId === 'triceps_brachii' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'triceps_brachii' ? 2 : 1}
                />
              </G>

              {/* 8. Forearm Extensors (Posterior Forearms) */}
              <G
                id="muscle_forearm_extensors"
                onPress={() => onSelectMuscle('forearm_extensors')}
              >
                {/* Left Forearm Extensors */}
                <Rect
                  x="52"
                  y="172"
                  width="16"
                  height="46"
                  rx="6"
                  fill={getMuscleColor('forearm_extensors')}
                  stroke={selectedMuscleId === 'forearm_extensors' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'forearm_extensors' ? 2 : 1}
                />
                {/* Right Forearm Extensors */}
                <Rect
                  x="212"
                  y="172"
                  width="16"
                  height="46"
                  rx="6"
                  fill={getMuscleColor('forearm_extensors')}
                  stroke={selectedMuscleId === 'forearm_extensors' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'forearm_extensors' ? 2 : 1}
                />
              </G>

              {/* 9. Gluteus Medius / Minimus (Outer Upper Pelvis) */}
              <G
                id="muscle_gluteus_medius_minimus"
                onPress={() => onSelectMuscle('gluteus_medius_minimus')}
              >
                <Path
                  d="M 94 186 C 114 186 116 208 106 216 C 92 216 88 198 94 186 Z"
                  fill={getMuscleColor('gluteus_medius_minimus')}
                  stroke={selectedMuscleId === 'gluteus_medius_minimus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gluteus_medius_minimus' ? 2 : 1}
                />
                <Path
                  d="M 186 186 C 166 186 164 208 174 216 C 188 216 192 198 186 186 Z"
                  fill={getMuscleColor('gluteus_medius_minimus')}
                  stroke={selectedMuscleId === 'gluteus_medius_minimus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gluteus_medius_minimus' ? 2 : 1}
                />
              </G>

              {/* 10. Gluteus Maximus (Buttocks) */}
              <G
                id="muscle_gluteus_maximus"
                onPress={() => onSelectMuscle('gluteus_maximus')}
              >
                {/* Left Glute */}
                <Path
                  d="M 104 196 C 138 196 138 244 124 250 C 102 250 98 226 104 196 Z"
                  fill={getMuscleColor('gluteus_maximus')}
                  stroke={selectedMuscleId === 'gluteus_maximus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gluteus_maximus' ? 2 : 1}
                />
                {/* Right Glute */}
                <Path
                  d="M 176 196 C 142 196 142 244 156 250 C 178 250 182 226 176 196 Z"
                  fill={getMuscleColor('gluteus_maximus')}
                  stroke={selectedMuscleId === 'gluteus_maximus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gluteus_maximus' ? 2 : 1}
                />
              </G>

              {/* 11. Hamstrings (Posterior Thighs) */}
              <G
                id="muscle_hamstrings"
                onPress={() => onSelectMuscle('hamstrings')}
              >
                {/* Left Hamstring */}
                <Rect
                  x="102"
                  y="254"
                  width="28"
                  height="52"
                  rx="7"
                  fill={getMuscleColor('hamstrings')}
                  stroke={selectedMuscleId === 'hamstrings' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'hamstrings' ? 2 : 1}
                />
                {/* Right Hamstring */}
                <Rect
                  x="150"
                  y="254"
                  width="28"
                  height="52"
                  rx="7"
                  fill={getMuscleColor('hamstrings')}
                  stroke={selectedMuscleId === 'hamstrings' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'hamstrings' ? 2 : 1}
                />
              </G>

              {/* 12. Gastrocnemius (Posterior Upper Calves) */}
              <G
                id="muscle_gastrocnemius"
                onPress={() => onSelectMuscle('gastrocnemius')}
              >
                {/* Left Calf */}
                <Rect
                  x="104"
                  y="314"
                  width="26"
                  height="46"
                  rx="8"
                  fill={getMuscleColor('gastrocnemius')}
                  stroke={selectedMuscleId === 'gastrocnemius' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gastrocnemius' ? 2 : 1}
                />
                {/* Right Calf */}
                <Rect
                  x="150"
                  y="314"
                  width="26"
                  height="46"
                  rx="8"
                  fill={getMuscleColor('gastrocnemius')}
                  stroke={selectedMuscleId === 'gastrocnemius' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'gastrocnemius' ? 2 : 1}
                />
              </G>

              {/* 13. Soleus (Posterior Lower Calves) */}
              <G
                id="muscle_soleus"
                onPress={() => onSelectMuscle('soleus')}
              >
                {/* Left Soleus */}
                <Rect
                  x="110"
                  y="362"
                  width="18"
                  height="26"
                  rx="5"
                  fill={getMuscleColor('soleus')}
                  stroke={selectedMuscleId === 'soleus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'soleus' ? 2 : 1}
                />
                {/* Right Soleus */}
                <Rect
                  x="152"
                  y="362"
                  width="18"
                  height="26"
                  rx="5"
                  fill={getMuscleColor('soleus')}
                  stroke={selectedMuscleId === 'soleus' ? colors.textPrimary : '#475569'}
                  strokeWidth={selectedMuscleId === 'soleus' ? 2 : 1}
                />
              </G>
            </G>
          )}
        </Svg>
      </View>

      {/* Selected Muscle Card Banner */}
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
                : selectedExp?.status === 'below_target'
                ? 'DEFICIT'
                : 'UNASSESSED'}
            </Text>
          </View>
        </View>
      )}

      {/* Exposure Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageInTarget }]} />
          <Text style={styles.legendText}>In Target</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageBelow }]} />
          <Text style={styles.legendText}>Deficit Gap</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.coverageAbove }]} />
          <Text style={styles.legendText}>Above Target</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#334155' }]} />
          <Text style={styles.legendText}>Unassessed</Text>
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
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: spacing.sm,
  },
  toggleBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  toggleBtnActive: {
    backgroundColor: colors.accentPrimary,
  },
  toggleText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: colors.bgPrimary,
    fontWeight: '700',
  },
  svgWrapper: {
    width: 280,
    height: 420,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090D16',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  selectedMuscleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    width: '100%',
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  selectedMuscleName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  selectedMuscleMeta: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusPillText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  errorTitle: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  errorSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
