import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { showMessage } from '../components/dialogs';
import { colors, common } from '../components/styles';
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
      showMessage('Sucesso', 'Medicamento cadastrado com sucesso.', () => navigation.reset({ index: 1, routes: [{ name: 'Home' }, { name: 'ListaMedicamentos' }] }));
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={common.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={common.listContent} keyboardShouldPersistTaps="handled">
        <Text style={common.eyebrow}>NOVO REGISTRO</Text>
        <Text style={common.title}>Novo medicamento</Text>
        <Text style={common.subtitle}>Preencha os dados para manter sua rotina organizada.</Text>
        <View style={common.card}>
          <Text style={styles.cardTitle}>Informações do medicamento</Text>
          <Text style={styles.helper}>Os campos com * são obrigatórios.</Text>
          <Text style={common.label}>Nome do medicamento *</Text>
          <TextInput style={common.input} value={nome} onChangeText={setNome} placeholder="Ex.: Dipirona" placeholderTextColor={colors.muted} accessibilityLabel="Nome do medicamento" />
          <Text style={common.label}>Dosagem *</Text>
          <TextInput style={common.input} value={dosagem} onChangeText={setDosagem} placeholder="Ex.: 500 mg" placeholderTextColor={colors.muted} accessibilityLabel="Dosagem" />
          <Text style={common.label}>Horário de uso *</Text>
          <TextInput style={common.input} value={horario} onChangeText={setHorario} placeholder="Ex.: 08:00 / 14:00 / 20:00" placeholderTextColor={colors.muted} accessibilityLabel="Horário de uso" />
          <Text style={common.label}>Observações</Text>
          <TextInput style={[common.input, styles.notes]} value={observacoes} onChangeText={setObservacoes} placeholder="Ex.: Tomar após as refeições" placeholderTextColor={colors.muted} accessibilityLabel="Observações" multiline />
          {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
          <PrimaryButton title={salvando ? 'Salvando...' : 'Salvar medicamento'} onPress={handleSalvar} disabled={salvando} />
          {salvando && <View style={styles.loading}><ActivityIndicator color={colors.primary} /></View>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  cardTitle: { color: colors.ink, fontSize: 19, fontWeight: '800' },
  helper: { color: colors.muted, fontSize: 13, marginTop: 5, marginBottom: 5 },
  notes: { minHeight: 100, textAlignVertical: 'top' },
  loading: { marginTop: 12 },
});
