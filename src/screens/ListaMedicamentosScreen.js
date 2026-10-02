import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MedicamentoCard from '../components/MedicamentoCard';
import PrimaryButton from '../components/PrimaryButton';
import { confirmDelete, showMessage } from '../components/dialogs';
import { colors, common } from '../components/styles';
import { deleteMedicamento, getMedicamentos } from '../services/medicamentoService';

export default function ListaMedicamentosScreen({ navigation }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [excluindoId, setExcluindoId] = useState(null);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      setMedicamentos(await getMedicamentos());
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  function confirmarExclusao(medicamento) {
    confirmDelete(medicamento.nome, () => excluir(medicamento.id));
  }

  async function excluir(id) {
    setExcluindoId(id);
    try {
      await deleteMedicamento(id);
      setMedicamentos((lista) => lista.filter((item) => item.id !== id));
      showMessage('Sucesso', 'Medicamento excluído com sucesso.');
    } catch (error) {
      showMessage('Erro', error.message);
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <View style={common.page}>
      <FlatList
        data={medicamentos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={common.listContent}
        refreshing={carregando && medicamentos.length > 0}
        onRefresh={carregar}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={common.eyebrow}>SUA LISTA</Text>
            <Text style={common.title}>Medicamentos</Text>
            <Text style={styles.subtitle}>{carregando ? 'Atualizando sua lista...' : `${medicamentos.length} ${medicamentos.length === 1 ? 'medicamento cadastrado' : 'medicamentos cadastrados'}`}</Text>
            <PrimaryButton title="Cadastrar Novo Medicamento" onPress={() => navigation.navigate('CadastroMedicamento')} />
            {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
            {Boolean(erro) && <PrimaryButton title="Tentar novamente" onPress={carregar} variant="outline" />}
          </View>
        }
        ListEmptyComponent={carregando ? <ActivityIndicator size="large" color={colors.primary} style={styles.empty} /> : !erro ? <View style={[common.card, styles.emptyCard]}><Text style={styles.emptyIcon}>✚</Text><Text style={styles.emptyTitle}>Sua lista está vazia</Text><Text style={styles.emptyDescription}>Cadastre um medicamento para começar a organizar seus cuidados.</Text></View> : null}
        renderItem={({ item }) => <MedicamentoCard medicamento={item} onExcluir={() => confirmarExclusao(item)} excluindo={excluindoId === item.id} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 22 },
  subtitle: { color: colors.muted, fontSize: 15, marginBottom: 10 },
  empty: { marginTop: 32 },
  emptyCard: { alignItems: 'center', paddingVertical: 34 },
  emptyIcon: { color: colors.primary, fontSize: 30, marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  emptyDescription: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' },
});
