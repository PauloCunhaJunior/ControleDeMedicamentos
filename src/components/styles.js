import { StyleSheet } from 'react-native';

export const common = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f4f7f9' },
  content: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  listContent: { padding: 20, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '700', color: '#17324d', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#52667a', marginBottom: 20 },
  label: { fontSize: 15, fontWeight: '600', color: '#17324d', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#fff', borderColor: '#b7c7d1', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 11, fontSize: 16, color: '#17324d' },
  error: { color: '#a93226', marginTop: 12, fontSize: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
