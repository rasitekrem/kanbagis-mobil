import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert, TouchableOpacity, Easing } from 'react-native';
import Drawer from 'react-native-drawer-menu';
import firebase from 'firebase';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Toast,
  Spinner,
  Form,
  Text,
  Root
} from 'native-base';

export default class Home extends Component {

 constructor(props) {
   super(props);
   this.state = { count: 0 };
   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
 }
 onNavigatorEvent(event) {
         //Gelen event buton tiklamami onu kontrol ediyoruz.
         if (event.type === 'NavBarButtonPress') {
                     //Sonra hangi butonumuz onu kontrol ediyoruz. Bu event.id app.jsde verildi.
                     if (event.id === 'dragMenu' && this.state.count === 0) { // app sinifindaki butonun idsi
                         this.refs.drawer.openDrawer();
                         this.state.count++;
                     } else if (event.id === 'dragMenu' && this.state.count === 1) {
                         this.refs.drawer.closeDrawer();
                         this.state.count--;
                     }
                 }
           }

goProfil() {
  this.props.navigator.push({
    screen: 'Profil',
    title: 'Profil'
});
}
goIlanlar() {
  this.props.navigator.push({
    screen: 'Ilanlarim',
    title: 'İlanlarım',
    navigatorButtons: {
    rightButtons: [
      {
        id: 'addButton', //Butonumuzun kendine özel idsi
        //Menülerde kullanılabilir.
        icon: require('../img/add.png'),
      },
    ]
  }
});
}
onLogout() {
  firebase.auth().signOut().then(() => {
    this.props.navigator.resetTo({
          screen: 'Login',
          title: 'Kan Bağış Uygulaması'
    });
  })
  .catch((err) => {
    console.log('hata');
  });
}
kanBagislayanlar() {
  this.props.navigator.push({
    screen: 'Bagislayan',
    title: 'Kan Bağışlayan Ara'
});
}
kanArayanlar() {
  this.props.navigator.push({
    screen: 'Arayan',
    title: 'Kan Arayanları Ara'
});
}

render() {
    const drawerContent = (
      <View style={styles.drawerContainerStyle}>
          <View style={styles.drawerSubContainerStyle}>
              <TouchableOpacity onPress={this.goProfil.bind(this)}>
                  <View style={{ backgroundColor: '#ffffff', alignItems: 'center', height:70, flexDirection:'row' }}
                  >
                      <Text style={{ color: '#B9B9B9', fontWeight:'400', fontSize: 18, marginLeft: 15 }}>Profil</Text>
                  </View>
              </TouchableOpacity>
          </View>
          <View style={styles.drawerSubContainerStyle}>
              <TouchableOpacity onPress={this.goIlanlar.bind(this)}>
                  <View style={{ backgroundColor: '#ffffff', alignItems: 'center', height:70, flexDirection:'row' }}
                  >
                      <Text style={{ color: '#B9B9B9', fontWeight:'400', fontSize: 18, marginLeft: 15 }}>İlanlarım</Text>
                  </View>
              </TouchableOpacity>
          </View>
          <View style={styles.drawerSubContainerStyle}>
              <TouchableOpacity onPress={this.onLogout.bind(this)}>
                  <View style={{ backgroundColor: '#ffffff', alignItems: 'center', height:70, flexDirection:'row' }}
                  >
                      <Text style={{ color: '#B9B9B9', fontWeight:'400', fontSize: 18, marginLeft: 15 }}>Çıkış Yap</Text>
                  </View>
              </TouchableOpacity>
          </View>
        </View>
      );
    return (
      <Drawer
                style={styles.container}
                //Bu drawerimiz için bir referans olusturuyoruz daha sonra bu referansla
                //Bu drawerimizi onNavigationEventte cagiriyoruz.
                ref='drawer'
                //Boyutu
                drawerWidth={270}
                //Drawer menümüzün icinde olacaklar bu render fonksiyonunun basinda olusturuldu.
                drawerContent={drawerContent}
                type={Drawer.types.Default}
                customStyles={{ drawer: styles.drawer }}
                //Drawerin nereden acilacagi Left-Right-Both olabilir. Iphoneda Left kullanmak
                //Uyumsuzluk sorunu yaratabilecegi icin tavsiye edilmemis.
                drawerPosition={Drawer.positions.Right}
                easingFunc={Easing.ease}
      >
      <Container style={styles.container}>
       <Content padder style={{ backgroundColor: '#FFF', padding: 20 }}>
         <Button block danger style={styles.mb15} onPress={() => this.kanBagislayanlar()}>
           <Text>Kan Bağışlayanlar</Text>
         </Button>
         <Image
           style={styles.stretch}
           source={require('../img/kan.jpg')}
         />
         <Button block danger style={styles.mb15} onPress={() => this.kanArayanlar()}>
           <Text>Kan Arayanlar</Text>
         </Button>
       </Content>
     </Container>
           </Drawer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 10
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stretch: {
  resizeMode: 'cover',
  width: null,
  height: 360,
  },
  drawerContainerStyle: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    drawerSubContainerStyle: {

    },
    mb15: {
      marginBottom: 25
    }
});
