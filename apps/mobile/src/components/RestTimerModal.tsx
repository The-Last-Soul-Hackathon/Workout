import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors, spacing, borderRadius } from '../shared';

interface RestTimerModalProps {
  visible: boolean;
  initialSeconds?: number;
  onClose: () => void;
}

export const RestTimerModal: React.FC<RestTimerModalProps> = ({
  visible,
  initialSeconds = 90,
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (visible) {
      setSecondsLeft(initialSeconds);
      setIsActive(true);
    }
  }, [visible, initialSeconds]);

  useEffect(() => {
    let interval: any = null;
    if (visible && isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [visible, isActive, secondsLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>REST TIMER</Text>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>

          {secondsLeft === 0 && (
            <Text style={styles.readyText}>Time is up! Ready for next set.</Text>
          )}

          {/* Quick adjust buttons */}
          <View style={styles.quickAdjustRow}>
            <TouchableOpacity
              style={styles.adjustBtn}
              onPress={() => setSecondsLeft((s) => Math.max(0, s - 15))}
            >
              <Text style={styles.adjustBtnText}>-15s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adjustBtn}
              onPress={() => setIsActive(!isActive)}
            >
              <Text style={styles.adjustBtnText}>{isActive ? 'Pause' : 'Resume'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adjustBtn}
              onPress={() => setSecondsLeft((s) => s + 30)}
            >
              <Text style={styles.adjustBtnText}>+30s</Text>
            </TouchableOpacity>
          </View>

          {/* Dismiss button */}
          <TouchableOpacity style={styles.dismissBtn} onPress={onClose}>
            <Text style={styles.dismissBtnText}>Dismiss Rest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '85%',
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  title: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  timerText: {
    color: colors.accentPrimary,
    fontSize: 54,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    marginBottom: spacing.md,
  },
  readyText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  quickAdjustRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  adjustBtn: {
    backgroundColor: colors.bgSecondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  adjustBtnText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  dismissBtn: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  dismissBtnText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
});
