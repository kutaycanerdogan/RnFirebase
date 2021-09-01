import React, {
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Drawer, List, WhiteSpace} from '@ant-design/react-native';
import {DrawerLayout} from 'react-native-gesture-handler';
import {Icon, IconButton, Button, SimpleGrid} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useHistory} from 'react-router-native';
import routes from '../../routes';
import useLogoff from '../../utils/hooks/useLogOff';
export const childrenHeight = Dimensions.get('window').height - 20;
export const childrenWidth = Dimensions.get('window').width;
const CustomDrawer: FC = ({children}) => {
  const logOff = useLogoff();
  const drawerRef = useRef<DrawerLayout | null>(null);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    setisOpen(false);
  }, [history.location]);

  const sidebar = (
    <ScrollView style={{maxHeight: childrenHeight}}>
      <TouchableWithoutFeedback
        onPress={() => {
          setisOpen(false);
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
          }}>
          <List style={styles.list}>
            <List.Item>
              <View style={styles.viewItemEnd}>
                <IconButton
                  onPress={() => {
                    setisOpen(!isOpen);
                  }}
                  variant="link"
                  icon={<Icon size="md" as={<Entypo name={'menu'} />} />}
                />
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.viewItem}>
                <Button
                  variant="link"
                  style={styles.button}
                  onPress={async () => {
                    history.push(routes.dashboard.root);
                  }}
                  startIcon={
                    <Icon size="md" as={<MaterialIcons name={'dashboard'} />} />
                  }>
                  Dashboard
                </Button>
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.viewItem}>
                <Button
                  variant="link"
                  style={styles.button}
                  onPress={async () => {
                    history.push(routes.dashboard.menu);
                  }}
                  startIcon={
                    <Icon size="md" as={<MaterialIcons name={'fastfood'} />} />
                  }>
                  Menuler
                </Button>
              </View>
            </List.Item>
            <List.Item>
              <View style={styles.viewItem}>
                <Button
                  style={styles.button}
                  variant="link"
                  colorScheme="error"
                  startIcon={
                    <Icon size="md" as={<Entypo name={'log-out'} />} />
                  }
                  onPress={async () => {
                    await logOff.logOff();
                  }}>
                  Çıkış
                </Button>
              </View>
            </List.Item>
            <List.Item
              style={{
                height: '100%',
              }}
            />
          </List>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
  return (
    <Drawer
      sidebar={sidebar}
      position="left"
      open={isOpen}
      drawerRef={el => (drawerRef.current = el)}
      drawerWidth={Dimensions.get('window').width}
      drawerBackgroundColor="transparent">
      <View style={styles.fullScreen}>
        <View style={styles.iconView}>
          <IconButton
            onPress={() => setisOpen(true)}
            variant="link"
            icon={<Icon size="md" as={<Entypo name={'menu'} />} />}
          />
        </View>
        <View style={styles.children}>{children}</View>
      </View>
    </Drawer>
  );
};
const styles = StyleSheet.create({
  iconView: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  viewItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemEnd: {
    alignItems: 'flex-end',
  },
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  fullScreen: {
    width: childrenWidth,
    height: childrenHeight,
    paddingTop: 40,
  },
  children: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  list: {
    width: '80%',
    backgroundColor: '#ccc',
    height: childrenHeight - 5,
  },
});

export default CustomDrawer;
