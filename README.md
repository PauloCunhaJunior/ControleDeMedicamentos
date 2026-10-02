# Controle de Medicamentos

Aplicativo acadêmico em React Native com Expo para cadastrar, listar e excluir medicamentos. O login usa a API pública ReqRes; os medicamentos são persistidos em uma conta MockAPI. O código usa JavaScript e separa telas, navegação, serviços, contexto e armazenamento.

## Tecnologias

- React Native e Expo (template `blank`, em JavaScript)
- React Navigation com Native Stack
- AsyncStorage para guardar o token localmente
- `fetch` para chamadas REST
- ReqRes para login de demonstração
- MockAPI para persistência dos medicamentos
- `FlatList` para a listagem

## Estrutura

```text
ControleDeMedicamentos/
├── App.js
├── app.json
├── index.js
├── package.json
├── assets/
└── src/
    ├── components/
    │   ├── MedicamentoCard.js
    │   ├── PrimaryButton.js
    │   └── styles.js
    ├── config.js
    ├── context/AuthContext.js
    ├── navigation/AppNavigator.js
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── HomeScreen.js
    │   ├── CadastroMedicamentoScreen.js
    │   └── ListaMedicamentosScreen.js
    ├── services/
    │   ├── authService.js
    │   └── medicamentoService.js
    └── storage/storage.js
```

## Instalação

Este repositório já contém o projeto criado. Para usá-lo, abra esta pasta no terminal e execute:

```powershell
npm install
npx expo start
```

Para reproduzir a criação do zero em outra pasta, use:

```powershell
npx create-expo-app@latest ControleMedicamentos --template blank
cd ControleMedicamentos
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
```

Depois copie os arquivos `App.js`, `src/` e `README.md` deste repositório para o projeto novo. O comando de criação instala `expo`, `react`, `react-native` e `expo-status-bar` automaticamente.

## Configuração das APIs

A URL da MockAPI já está definida. Antes de testar o login, edite **`src/config.js`** para informar sua chave pública do ReqRes:

```js
export const API_URL = 'https://6abef824c4d5ac548302d9cd.mockapi.io/medicamentos';
export const REQRES_API_KEY = 'SUA_CHAVE_PUBLICA_DO_REQRES';
```

`API_URL` deve ser a URL **completa do recurso** `medicamentos`, sem `/id` no final. Ela fica em um único arquivo e é usada pelo serviço para `GET`, `POST` e `DELETE`.

### MockAPI

1. Crie uma conta em [mockapi.io](https://mockapi.io/) e um projeto.
2. Crie o recurso **`medicamentos`**.
3. Crie estes campos do tipo texto/string: `nome`, `dosagem`, `horario`, `observacoes`. O `id` é gerado pela MockAPI; não o envie no cadastro.
4. A URL do recurso já está configurada em `src/config.js`. Se usar outra conta, troque essa constante pela URL do novo recurso.
5. O recurso pode começar vazio. Para testar, cadastre pelo aplicativo. Em 1º de outubro de 2026, esta URL já continha registros de exemplo com `name` e `avatar`; ajuste os campos do recurso para `nome`, `dosagem`, `horario` e `observacoes` e remova os registros de exemplo pelo painel da MockAPI se quiser uma lista limpa.

Exemplo de registro retornado pela MockAPI:

```json
{
  "id": "1",
  "nome": "Dipirona",
  "dosagem": "500 mg",
  "horario": "08:00 / 14:00 / 20:00",
  "observacoes": "Tomar após as refeições"
}
```

### ReqRes

1. Crie uma conta gratuita em [ReqRes](https://reqres.in/) e obtenha uma chave pública para a API.
2. Coloque a chave em `REQRES_API_KEY` em `src/config.js`.
3. O aplicativo envia `POST https://reqres.in/api/login` com `email`, `password`, `x-api-key` e ambiente `prod`.
4. Para testar o login de demonstração, use `eve.holt@reqres.in` e senha `cityslicka`, conforme o exemplo publicado pelo ReqRes. Se as credenciais de demonstração mudarem, consulte a documentação atual do serviço.

O ReqRes exige chave de API atualmente. Uma chave pública embutida no aplicativo serve apenas para esta demonstração acadêmica. O token do ReqRes **não protege** o recurso da MockAPI: a lista é compartilhada por quem tiver a URL. Para um aplicativo real, seriam necessários autenticação própria, autorização no backend e armazenamento seguro do token.

## Como executar no Expo Go

1. Informe a chave pública do ReqRes em `src/config.js`.
2. Execute `npx expo start` nesta pasta.
3. Instale o Expo Go no celular e leia o QR code mostrado no terminal. No Android, use o leitor do Expo Go; no iPhone, use a câmera do sistema.
4. Deixe computador e celular na mesma rede. Se a conexão local não funcionar, execute `npx expo start --tunnel`.

## Como utilizar e testar

1. **Login:** entre com o e-mail e a senha de demonstração. Campos vazios e credenciais incorretas exibem mensagem; enquanto a requisição ocorre, aparece um indicador de carregamento.
2. **Sessão:** após o login, o token é salvo no AsyncStorage. Feche e abra novamente o app para verificar a permanência na Home.
3. **Cadastro:** toque em “Cadastrar Novo Medicamento”, preencha nome, dosagem e horário; observações são opcionais. Ao salvar, confirme a mensagem. O formulário é limpo e o app abre a lista, onde o registro aparece.
4. **Listagem:** abra “Lista de Medicamentos” na Home. A tela faz `GET` ao receber foco e também permite atualizar puxando para baixo. Quando vazia, mostra “Nenhum medicamento cadastrado.”
5. **Exclusão:** toque em “Excluir”, confirme e observe a remoção automática da lista e a mensagem de sucesso. “Cancelar” preserva o item.
6. **Logout:** toque em “Sair da Conta”. O token local é removido e a tela de login aparece. O botão Voltar não reabre a Home.

Se uma API estiver indisponível, a tela mostra uma mensagem e permite tentar novamente quando aplicável.

## Fluxo para apresentação

`Login → token da ReqRes → AsyncStorage → Home → cadastro/listagem → MockAPI (POST/GET/DELETE) → logout`

O `AuthContext` mantém o token em memória e lê o AsyncStorage na inicialização. O `AppNavigator` monta apenas a pilha de login ou a pilha autenticada, impedindo o retorno por Voltar entre essas áreas. Após salvar, o aplicativo vai para a lista para mostrar imediatamente o medicamento recém-cadastrado.
