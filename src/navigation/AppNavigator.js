import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroMedicamentoScreen from '../screens/CadastroMedicamentoScreen';
import ListaMedicamentosScreen from '../screens/ListaMedicamentosScreen';
import { colors } from '../components/styles';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, carregando } = useAuth();

  if (carregando) {
    return <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.ink, headerShadowVisible: false, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: colors.background } }}>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início', headerBackVisible: false }} />
            <Stack.Screen name="ListaMedicamentos" component={ListaMedicamentosScreen} options={{ title: 'Medicamentos' }} />
            <Stack.Screen name="CadastroMedicamento" component={CadastroMedicamentoScreen} options={{ title: 'Cadastrar medicamento' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
