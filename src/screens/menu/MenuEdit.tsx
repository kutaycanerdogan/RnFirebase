/* eslint-disable no-console */
import React, {FC} from 'react';
import {useState} from 'react';
import {IModalComponentType} from 'native-base/lib/typescript/components/composites/Modal/types';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import Button from '../../components/button/Button';
import {Menu} from '../../types/model/Menu';

import CustomInput from '../../components/input/Input';
import CustomModal from '../../components/modal/CustomModal';
interface Props {
  menu?: Menu | null;
  onSave: (e: any) => void;
  handleIsOpen: (value: boolean) => void;
  isNew: boolean;
  isOpen: boolean;
}
const MenuEdit: FC<Props> = ({menu, onSave, isNew, isOpen, handleIsOpen}) => {
  const [currentMenu, setcurrentMenu] = useState(menu);
  const handleCurrentMenu = (values: Menu) => {
    setcurrentMenu(values);
  };
  return (
    <CustomModal
      onSave={() => onSave(currentMenu)}
      handleIsOpen={handleIsOpen}
      isOpen={isOpen}
      title={isNew ? 'Yeni Menu Ekle' : 'Menü Güncelle'}>
      <View key="signUp-view4" style={styles.fadingContainer}>
        <CustomInput
          defaultValue={currentMenu?.title}
          key="menu-title"
          onEndEditing={e => {
            handleCurrentMenu({
              ...currentMenu,
              title: e.nativeEvent.text,
            });
          }}
          labelText={'Menü Adı'}
          placeholder={'Menü Adı Giriniz!'}
          borderColor="black"
          focusedBorderColor="black"
        />
        <CustomInput
          key="menu-description"
          defaultValue={currentMenu?.description}
          onEndEditing={e => {
            handleCurrentMenu({
              ...currentMenu,
              description: e.nativeEvent.text,
            });
          }}
          labelText={'Açıklama'}
          placeholder={'Açıklama Giriniz!'}
          borderColor="black"
          focusedBorderColor="black"
        />
        <CustomInput
          key="menu-price"
          defaultValue={currentMenu?.price?.toString()}
          keyboardType="number-pad"
          onEndEditing={e => {
            handleCurrentMenu({
              ...currentMenu,
              price: +e.nativeEvent.text,
            });
          }}
          labelText={'Fiyat'}
          placeholder={'Fiyat Giriniz!'}
          borderColor="black"
          focusedBorderColor="black"
        />
      </View>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    fontWeight: '700',
    color: 'black',
    borderColor: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    height: undefined,
  },
  button: {
    height: 45,
    width: '80%',
  },
  button2Container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button2: {
    flexGrow: 0.5,
    marginTop: 0,
    marginLeft: 20,
  },
  fadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  spinnerContainer: {
    height: '100%',
    width: '100%',
  },
  languageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
export default MenuEdit;
