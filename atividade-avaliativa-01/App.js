import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Home';
import AlojamentoListScreen from './AlojamentoList';
import AlojamentoDetailsScreen from './AlojamentoDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AlojamentoList" component={AlojamentoListScreen} />
        <Stack.Screen name="AlojamentoDetails" component={AlojamentoDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
