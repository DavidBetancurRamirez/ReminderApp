import uuid from 'react-native-uuid';
import { GroupProps, GroupType } from '../types/Group.type';
import { getEnvKey, saveItem, getItems, removeItem } from '../utils/storage.util';

const keyName = "EXPO_PUBLIC_MY_GROUP_KEY";

const useGroupStorage = () => {
  const onGetGroups = async (): Promise<GroupType[] | []> => {
    const key = getEnvKey(keyName);
    return await getItems(key);
  };

  const onGetGroup = async (id: string): Promise<GroupType | undefined> => {
    const groups = await onGetGroups();
    const group = groups.find((g) => g.id === id);

    if (!group) {
      throw new Error("Group not found");
    }

    return group;
  };

  const onSaveGroup = async (group: GroupProps, groups?: GroupType[]): Promise<void> => {
    await validateGroupProps(group, groups);

    const key = getEnvKey(keyName);
    const id = uuid.v4();

    await saveItem(key, { ...group, id });
  };

  const onRemoveGroup = async (id: string): Promise<void> => {
    const key = getEnvKey(keyName);
    await removeItem<GroupType>(key, (item) => item.id === id)
  }

  const validateGroupProps = async (group: GroupProps, groups?: GroupType[]) => {
    // Name required
    if (group.name.trim().length === 0) {
      throw new Error("Name is empty");
    }
      
    // Unique name
    let search = groups || await onGetGroups();
    const find = search.find((g) => g.name.toLowerCase() === group.name.toLowerCase());
    if (find) {
      throw new Error("The name must be unique")
    }
  }

  return {
    onGetGroups,
    onGetGroup,
    onSaveGroup,
    onRemoveGroup,
    validateGroupProps
  }
};

export default useGroupStorage;