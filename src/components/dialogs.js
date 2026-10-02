import { Alert, Platform } from 'react-native';

export function showMessage(title, message, onClose) {
  if (Platform.OS === 'web') {
    globalThis.alert(`${title}\n\n${message}`);
    onClose?.();
    return;
  }
  Alert.alert(title, message, [{ text: 'OK', onPress: onClose }]);
}

export function confirmDelete(name, onConfirm) {
  if (Platform.OS === 'web') {
    if (globalThis.confirm(`Excluir ${name}?`)) onConfirm();
    return;
  }
  Alert.alert('Confirmar exclusão', `Excluir ${name}?`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: onConfirm },
  ]);
}
