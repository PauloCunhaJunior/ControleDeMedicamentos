import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors, common } from './styles';

export default function MedicamentoCard({ medicamento, onExcluir, excluindo }) {
  return (
    <View style={[common.card, styles.card]}>
      <View style={styles.heading}>
        <View style={styles.mark}><Text style={styles.markText}>✚</Text></View>
        <View style={styles.headingText}>
          <Text style={styles.nome}>{medicamento.nome}</Text>
          <Text style={styles.tag}>MEDICAMENTO</Text>
        </View>
      </View>
      <View style={styles.detail}><Text style={styles.detailLabel}>Dosagem</Text><Text style={styles.detailValue}>{medicamento.dosagem || 'Não informada'}</Text></View>
      <View style={styles.detail}><Text style={styles.detailLabel}>Horário de uso</Text><Text style={styles.detailValue}>{medicamento.horario || 'Não informado'}</Text></View>
      {Boolean(medicamento.observacoes) && <View style={styles.note}><Text style={styles.noteLabel}>OBSERVAÇÕES</Text><Text style={styles.noteText}>{medicamento.observacoes}</Text></View>}
      <View style={styles.actions}><PrimaryButton title={excluindo ? 'Excluindo...' : 'Excluir medicamento'} onPress={onExcluir} disabled={excluindo} variant="danger" compact /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 14 },
  heading: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  mark: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  markText: { color: colors.primary, fontSize: 22, fontWeight: '700' },
  headingText: { flex: 1 },
  nome: { color: colors.ink, fontSize: 19, fontWeight: '800', lineHeight: 24 },
  tag: { color: colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.3, marginTop: 3 },
  detail: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 9, borderTopWidth: 1, borderTopColor: colors.border, gap: 12 },
  detailLabel: { color: colors.muted, fontSize: 13, flex: 1 },
  detailValue: { color: colors.ink, fontSize: 14, fontWeight: '600', flex: 1.4, textAlign: 'right' },
  note: { backgroundColor: colors.background, borderRadius: 10, padding: 12, marginTop: 10 },
  noteLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
  noteText: { color: colors.ink, fontSize: 13, lineHeight: 19 },
  actions: { alignItems: 'flex-end', marginTop: 16 },
});
