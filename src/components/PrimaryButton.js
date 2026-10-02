import { Pressable, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled, variant = 'primary' }) {
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
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#21618c', borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 12 },
  outline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#21618c' },
  danger: { backgroundColor: '#a93226' },
  disabled: { opacity: 0.65 },
  pressed: { opacity: 0.8 },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  outlineText: { color: '#21618c' },
});
