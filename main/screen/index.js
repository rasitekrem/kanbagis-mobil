import { Navigation } from 'react-native-navigation';
import Home from './home';
import Bagislayan from './bagislayan';
import Arayan from './arayan';
import KanBagislayanlar from './kanBagislayanlar';
import KanArayanlar from './kanArayanlar';
import KanArayanlarDetay from './kanArayanlarDetay';
import KanBagislayanlarDetay from './kanBagislayanlarDetay';
import Login from './login';
import Signup from './signup';
import TestPage from './TestPage';
import Profil from './profil';
import Ilanlarim from './ilanlarim';
import Add from './ilan/add';
import Info from './ilan/info';

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('TestPage', () => TestPage);
  Navigation.registerComponent('Signup', () => Signup);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Bagislayan', () => Bagislayan);
  Navigation.registerComponent('Arayan', () => Arayan);
  Navigation.registerComponent('KanBagislayanlar', () => KanBagislayanlar);
  Navigation.registerComponent('KanArayanlar', () => KanArayanlar);
  Navigation.registerComponent('KanArayanlarDetay', () => KanArayanlarDetay);
  Navigation.registerComponent('KanBagislayanlarDetay', () => KanBagislayanlarDetay);
  Navigation.registerComponent('Profil', () => Profil);
  Navigation.registerComponent('Ilanlarim', () => Ilanlarim);
  Navigation.registerComponent('Add', () => Add);
  Navigation.registerComponent('Info', () => Info);
}
