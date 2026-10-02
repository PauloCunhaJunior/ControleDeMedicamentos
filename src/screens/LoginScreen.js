import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { common } from '../components/styles';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { entrar } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleEntrar() {
    if (!email.trim() || !senha.trim()) {
      setErro('Informe e-mail e senha.');
      return;
    }
    setErro('');
    setEnviando(true);
    try {
      await entrar(email, senha);
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={common.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={common.content} keyboardShouldPersistTaps="handled">
        <Text style={common.title}>Controle de Medicamentos</Text>
        <Text style={common.subtitle}>Entre para organizar seus medicamentos.</Text>
        <Text style={common.label}>E-mail</Text>
        <TextInput style={common.input} value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <Text style={common.label}>Senha</Text>
        <TextInput style={common.input} value={senha} onChangeText={setSenha} placeholder="Sua senha" secureTextEntry autoComplete="password" />
        {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
        <PrimaryButton title={enviando ? 'Entrando...' : 'Entrar'} onPress={handleEntrar} disabled={enviando} />
        {enviando && <View style={{ marginTop: 12 }}><ActivityIndicator color="#21618c" /></View>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
