import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors, common } from '../components/styles';
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
        <View style={styles.brandMark}><Text style={styles.brandSymbol}>✚</Text></View>
        <Text style={common.eyebrow}>SEU CUIDADO EM DIA</Text>
        <Text style={common.title}>Bem-vindo de volta.</Text>
        <Text style={common.subtitle}>Acompanhe seus medicamentos de um jeito simples e organizado.</Text>
        <View style={common.card}>
          <Text style={styles.cardTitle}>Acesse sua conta</Text>
          <Text style={styles.cardCaption}>Entre com as credenciais de demonstração.</Text>
          <Text style={common.label}>E-mail</Text>
          <TextInput style={common.input} value={email} onChangeText={setEmail} placeholder="seu@email.com" placeholderTextColor={colors.muted} keyboardType="email-address" autoCapitalize="none" autoComplete="email" accessibilityLabel="E-mail" />
          <Text style={common.label}>Senha</Text>
          <TextInput style={common.input} value={senha} onChangeText={setSenha} placeholder="Sua senha" placeholderTextColor={colors.muted} secureTextEntry autoComplete="password" accessibilityLabel="Senha" />
          {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
          <PrimaryButton title={enviando ? 'Entrando...' : 'Entrar'} onPress={handleEntrar} disabled={enviando} />
          {enviando && <View style={styles.loading}><ActivityIndicator color={colors.primary} /></View>}
        </View>
        <Text style={styles.footer}>CONTROLE DE MEDICAMENTOS</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  brandMark: { width: 62, height: 62, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  brandSymbol: { color: colors.surface, fontSize: 34, fontWeight: '800' },
  cardTitle: { color: colors.ink, fontSize: 21, fontWeight: '800' },
  cardCaption: { color: colors.muted, fontSize: 14, marginTop: 4, marginBottom: 4 },
  loading: { marginTop: 14 },
  footer: { color: colors.muted, fontSize: 10, fontWeight: '700', letterSpacing: 2, textAlign: 'center', marginTop: 30 },
});
