import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';

export default function MedicamentoCard({ medicamento, onExcluir, excluindo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{medicamento.nome}</Text>
      <Text style={styles.info}>Dosagem: {medicamento.dosagem}</Text>
      <Text style={styles.info}>Horário: {medicamento.horario}</Text>
      {Boolean(medicamento.observacoes) && (
        <Text style={styles.info}>Observações: {medicamento.observacoes}</Text>
      )}
      <PrimaryButton title={excluindo ? 'Excluindo...' : 'Excluir'} onPress={onExcluir} disabled={excluindo} variant="danger" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#dce5eb' },
  nome: { fontSize: 18, fontWeight: '700', color: '#17324d', marginBottom: 8 },
  info: { fontSize: 15, color: '#334155', marginBottom: 4 },
});
