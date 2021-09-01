import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Menu} from '../../types/model/Menu';
import {useAccountValues} from '../../utils/services/authz/account/AccountContextProvider';
import MenuEdit from './MenuEdit';
import {useMenuApi} from '../../utils/services/menu/Menu';
interface MenuRenderProps {
  menuProps: Menu;
  index: number;
}
const MenuRender: React.FC<MenuRenderProps> = ({menuProps, index}) => {
  const {id, description, price, title} = menuProps;
  const {authUser} = useAccountValues();
  const {deleteMenuAsync, updateMenuAsync, getAllMenusAsync} = useMenuApi();
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (value: boolean) => {
    setIsOpen(value);
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: index % 2 > 0 ? '#ccc' : '#ddd'},
      ]}>
      <View style={styles.info}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{price} TL</Text>
      </View>
      <View style={styles.actionButtonsContainer}>
        <Entypo
          style={styles.icon}
          color="yellow"
          name={'edit'}
          onPress={() => {
            setIsOpen(true);
          }}
        />
        <AntDesign
          style={styles.icon}
          color="red"
          name={'delete'}
          onPress={async () => {
            Alert.alert('Menu Silinecek!', 'Devam Etmek İstiyor Musunuz?', [
              {
                text: 'Evet',
                onPress: async () => {
                  await deleteMenuAsync(menuProps);
                  await getAllMenusAsync();
                },
              },
              {
                text: 'Hayır',
                style: 'cancel',
              },
            ]);
          }}
        />
      </View>
      <MenuEdit
        menu={menuProps}
        isNew={false}
        isOpen={isOpen}
        handleIsOpen={handleIsOpen}
        onSave={async values => {
          await updateMenuAsync(values);
          setIsOpen(false);
          await getAllMenusAsync();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {fontSize: 24, paddingHorizontal: 5},
  container: {
    display: 'flex',
    width: Dimensions.get('window').width - 30,
    // width: '100%',
    minHeight: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
  },
  text: {
    flexShrink: 1,
    minWidth: '20%',
  },
});
export default MenuRender;
