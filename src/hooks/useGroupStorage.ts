import uuid from 'react-native-uuid';
import { GroupProps, GroupType } from '../types/Group.type';
import { getEnvKey, saveItem, getItems, removeItem } from '../utils/storage.util';

const keyName = "EXPO_PUBLIC_MY_GROUP_KEY";

const useGroupStorage = () => {
  const onGetGroup = async (): Promise<GroupType[] | []> => {
    try {
      const key = getEnvKey(keyName);
      return await getItems(key);
    } catch (error) {
      return Promise.reject(error);      
    }
  };

  const onSaveGroup = async (group: GroupProps): Promise<void> => {
    try {
      const key = getEnvKey(keyName);
      const id = uuid.v4();

      return await saveItem(key, { ...group, id });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRemoveGroup = async (id: string): Promise<void> => {
    try {
      const key = getEnvKey(keyName);
      await removeItem<GroupType>(key, (item) => item.id === id)
    } catch (error) {
      return Promise.reject(error);      
    }
  }

  return {
    onGetGroup,
    onSaveGroup,
    onRemoveGroup,
  }
};

export default useGroupStorage;