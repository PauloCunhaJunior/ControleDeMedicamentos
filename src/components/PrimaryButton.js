import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from './styles';

export default function PrimaryButton({ title, onPress, disabled, variant = 'primary', compact = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'outline' && styles.outline,
        variant === 'danger' && styles.danger,
        compact && styles.compact,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant === 'outline' && styles.outlineText, variant === 'danger' && styles.dangerText, compact && styles.compactText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, borderRadius: 13, minHeight: 52, paddingHorizontal: 18, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  outline: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
  danger: { backgroundColor: colors.dangerSoft },
  compact: { minHeight: 38, paddingHorizontal: 14, paddingVertical: 7, marginTop: 0 },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.78 },
  text: { color: colors.surface, fontSize: 16, fontWeight: '700' },
  outlineText: { color: colors.primaryDark },
  dangerText: { color: colors.danger },
  compactText: { fontSize: 13 },
});
