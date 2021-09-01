import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useMenuValues} from '../../utils/services/menu/MenuContextProvider';
import {useMenuApi} from '../../utils/services/menu/Menu';
import MenuRender from './MenuRender';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Icon, IconButton} from 'native-base';
import MenuEdit from './MenuEdit';
import Indicator from '../../components/indicator/Indicator';
import {Dimensions} from 'react-native';
import {
  childrenHeight,
  childrenWidth,
} from '../../components/drawer/CustomDrawer';

const MenuList: React.FC = () => {
  const {getAllMenusAsync, createMenuAsync} = useMenuApi();
  const {isFetching} = useMenuValues();
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (value: boolean) => {
    setIsOpen(value);
  };

  const {menus} = useMenuValues();
  useEffect(() => {
    menus.length < 1 && getAllMenusAsync();
  }, []);

  return (
    <View style={styles.container}>
      {isFetching && <Indicator showScreenCenter={true} color={'red'} />}
      <View>
        <View style={styles.menuListContainer}>
          <Text style={styles.menuList}>MenuList</Text>
          <Entypo
            style={styles.icon}
            color="dodgerblue"
            name={'plus'}
            onPress={() => {
              setIsOpen(true);
            }}
          />
        </View>
        <FlatList
          // contentContainerStyle={styles.container}
          style={styles.flatList}
          data={menus}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <MenuRender menuProps={{...item}} index={index} />
          )}
        />
      </View>

      <MenuEdit
        isNew={true}
        isOpen={isOpen}
        handleIsOpen={handleIsOpen}
        onSave={async values => {
          await createMenuAsync(values);
          setIsOpen(false);
          await getAllMenusAsync();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  flatList: {
    height: Dimensions.get('window').height - 110,
  },
  icon: {fontSize: 24, paddingHorizontal: 20},
  menuList: {fontSize: 20, paddingHorizontal: 10},
  menuListContainer: {
    width: '100%',
    // height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  indicator: {
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  fullScreen: {
    width: '100%',
    height: Dimensions.get('window').height - 150,
  },
});
export default MenuList;
