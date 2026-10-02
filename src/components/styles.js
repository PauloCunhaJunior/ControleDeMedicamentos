import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F5F8F7', surface: '#FFFFFF', ink: '#163044', muted: '#617585',
  primary: '#087F73', primaryDark: '#07675E', primarySoft: '#E2F4EF',
  border: '#DCE8E5', danger: '#B44B47', dangerSoft: '#FCEDEB',
};

export const common = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center' },
  listContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.8, marginBottom: 10 },
  title: { color: colors.ink, fontSize: 32, fontWeight: '800', letterSpacing: -0.7, lineHeight: 38, marginBottom: 8 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24, marginBottom: 24 },
  card: { backgroundColor: colors.surface, borderRadius: 22, padding: 22, borderWidth: 1, borderColor: colors.border, shadowColor: colors.ink, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 2 },
  label: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 15, paddingVertical: 13, minHeight: 50, fontSize: 16, color: colors.ink },
  error: { color: colors.danger, backgroundColor: colors.dangerSoft, borderRadius: 10, padding: 12, marginTop: 16, fontSize: 14, lineHeight: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
