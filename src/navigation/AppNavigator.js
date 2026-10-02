import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroMedicamentoScreen from '../screens/CadastroMedicamentoScreen';
import ListaMedicamentosScreen from '../screens/ListaMedicamentosScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, carregando } = useAuth();

  if (carregando) {
    return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#21618c" /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#f4f7f9' }, headerTintColor: '#17324d' }}>
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
