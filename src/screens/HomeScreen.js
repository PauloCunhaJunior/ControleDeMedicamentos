import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { common } from '../components/styles';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { sair } = useAuth();
  const [erro, setErro] = useState('');
  const [saindo, setSaindo] = useState(false);

  async function handleSair() {
    setErro('');
    setSaindo(true);
    try {
      await sair();
    } catch (error) {
      setErro(error.message);
      setSaindo(false);
    }
  }

  return (
    <ScrollView style={common.page} contentContainerStyle={common.content}>
      <Text style={common.title}>Controle de Medicamentos</Text>
      <Text style={common.subtitle}>Consulte e cadastre os medicamentos de forma simples.</Text>
      <PrimaryButton title="Lista de Medicamentos" onPress={() => navigation.navigate('ListaMedicamentos')} />
      <PrimaryButton title="Cadastrar Novo Medicamento" onPress={() => navigation.navigate('CadastroMedicamento')} variant="outline" />
      <PrimaryButton title={saindo ? 'Saindo...' : 'Sair da Conta'} onPress={handleSair} disabled={saindo} variant="danger" />
      {saindo && <View style={{ marginTop: 12 }}><ActivityIndicator color="#21618c" /></View>}
      {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
    </ScrollView>
  );
}
