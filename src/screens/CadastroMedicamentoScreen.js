import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { common } from '../components/styles';
import { createMedicamento } from '../services/medicamentoService';

export default function CadastroMedicamentoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [horario, setHorario] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    if (!nome.trim() || !dosagem.trim() || !horario.trim()) {
      setErro('Preencha nome, dosagem e horário.');
      return;
    }
    setErro('');
    setSalvando(true);
    try {
      await createMedicamento({
        nome: nome.trim(),
        dosagem: dosagem.trim(),
        horario: horario.trim(),
        observacoes: observacoes.trim(),
      });
      setNome('');
      setDosagem('');
      setHorario('');
      setObservacoes('');
      Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso.', [
        { text: 'OK', onPress: () => navigation.reset({ index: 1, routes: [{ name: 'Home' }, { name: 'ListaMedicamentos' }] }) },
      ]);
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={common.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={common.listContent} keyboardShouldPersistTaps="handled">
        <Text style={common.title}>Novo medicamento</Text>
        <Text style={common.subtitle}>Os campos com * são obrigatórios.</Text>
        <Text style={common.label}>Nome *</Text>
        <TextInput style={common.input} value={nome} onChangeText={setNome} placeholder="Ex.: Dipirona" />
        <Text style={common.label}>Dosagem *</Text>
        <TextInput style={common.input} value={dosagem} onChangeText={setDosagem} placeholder="Ex.: 500 mg" />
        <Text style={common.label}>Horário de uso *</Text>
        <TextInput style={common.input} value={horario} onChangeText={setHorario} placeholder="Ex.: 08:00 / 14:00 / 20:00" />
        <Text style={common.label}>Observações</Text>
        <TextInput style={[common.input, { minHeight: 90, textAlignVertical: 'top' }]} value={observacoes} onChangeText={setObservacoes} placeholder="Ex.: Tomar após as refeições" multiline />
        {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
        <PrimaryButton title={salvando ? 'Salvando...' : 'Salvar'} onPress={handleSalvar} disabled={salvando} />
        {salvando && <View style={{ marginTop: 12 }}><ActivityIndicator color="#21618c" /></View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
