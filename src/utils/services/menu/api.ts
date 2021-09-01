import {AxiosResponse} from 'axios';
import {Menu} from '../../../types/model/Menu';
import axios from '../../axios';
const GetAllMenusAsync = async () => {
  const result = await axios.get(`/menu/getAll`);
  return result.data;
};
const CreateMenuAsync = async (data: Menu) => {
  const result = await axios.post(`/menu/createMenu`, data);
  return result.data;
};
const UpdateMenuAsync = async (data: Menu) => {
  const result = await axios.put(`/menu/updateMenu`, data);
  return result.data;
};
const DeleteMenuAsync = async (data: Menu) => {
  const result = await axios.put(`/menu/deleteMenu`, data);
  return result.data;
};
export {GetAllMenusAsync, CreateMenuAsync, UpdateMenuAsync, DeleteMenuAsync};
