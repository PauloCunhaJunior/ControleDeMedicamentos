import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MedicamentoCard from '../components/MedicamentoCard';
import PrimaryButton from '../components/PrimaryButton';
import { common } from '../components/styles';
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
    Alert.alert('Confirmar exclusão', `Excluir ${medicamento.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluir(medicamento.id) },
    ]);
  }

  async function excluir(id) {
    setExcluindoId(id);
    try {
      await deleteMedicamento(id);
      setMedicamentos((lista) => lista.filter((item) => item.id !== id));
      Alert.alert('Sucesso', 'Medicamento excluído com sucesso.');
    } catch (error) {
      Alert.alert('Erro', error.message);
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
          <View style={{ marginBottom: 20 }}>
            <Text style={common.title}>Medicamentos</Text>
            <PrimaryButton title="Cadastrar Novo Medicamento" onPress={() => navigation.navigate('CadastroMedicamento')} />
            {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
            {Boolean(erro) && <PrimaryButton title="Tentar novamente" onPress={carregar} variant="outline" />}
          </View>
        }
        ListEmptyComponent={carregando ? <ActivityIndicator size="large" color="#21618c" style={{ marginTop: 32 }} /> : !erro ? <Text style={{ marginTop: 32, textAlign: 'center', color: '#52667a' }}>Nenhum medicamento cadastrado.</Text> : null}
        renderItem={({ item }) => <MedicamentoCard medicamento={item} onExcluir={() => confirmarExclusao(item)} excluindo={excluindoId === item.id} />}
      />
    </View>
  );
}
