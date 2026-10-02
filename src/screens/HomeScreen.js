import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors, common } from '../components/styles';
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
    <ScrollView style={common.page} contentContainerStyle={styles.content}>
      <Text style={common.eyebrow}>PAINEL DE CUIDADO</Text>
      <Text style={common.title}>Tudo em um só lugar.</Text>
      <Text style={common.subtitle}>Organize seus medicamentos e consulte seus horários sempre que precisar.</Text>
      <View style={styles.hero}>
        <View style={styles.heroIcon}><Text style={styles.heroSymbol}>✚</Text></View>
        <Text style={styles.heroTitle}>Sua rotina, mais tranquila.</Text>
        <Text style={styles.heroText}>Cadastre as informações de cada medicamento e mantenha tudo à mão.</Text>
      </View>
      <Text style={styles.sectionTitle}>O que você deseja fazer?</Text>
      <View style={common.card}>
        <Text style={styles.actionTitle}>Meus medicamentos</Text>
        <Text style={styles.actionDescription}>Veja sua lista e confira dosagens e horários.</Text>
        <PrimaryButton title="Lista de Medicamentos" onPress={() => navigation.navigate('ListaMedicamentos')} />
      </View>
      <View style={[common.card, styles.secondCard]}>
        <Text style={styles.actionTitle}>Adicionar medicamento</Text>
        <Text style={styles.actionDescription}>Guarde um novo medicamento na sua lista.</Text>
        <PrimaryButton title="Cadastrar Novo Medicamento" onPress={() => navigation.navigate('CadastroMedicamento')} variant="outline" />
      </View>
      <PrimaryButton title={saindo ? 'Saindo...' : 'Sair da Conta'} onPress={handleSair} disabled={saindo} variant="danger" />
      {saindo && <View style={styles.loading}><ActivityIndicator color={colors.primary} /></View>}
      {Boolean(erro) && <Text style={common.error}>{erro}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 40 },
  hero: { backgroundColor: colors.primary, borderRadius: 24, padding: 24, marginBottom: 28 },
  heroIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  heroSymbol: { color: colors.surface, fontSize: 25, fontWeight: '800' },
  heroTitle: { color: colors.surface, fontSize: 22, fontWeight: '800', marginBottom: 7 },
  heroText: { color: '#D9F5EF', fontSize: 15, lineHeight: 22 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 14 },
  actionTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', marginBottom: 4 },
  actionDescription: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  secondCard: { marginTop: 14, marginBottom: 20 },
  loading: { marginTop: 12 },
});
