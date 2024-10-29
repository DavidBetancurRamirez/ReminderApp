import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Obtiene un valor desde .env
 * @param keyName - Nombre de la llave a buscar en el .env
 */
export const getEnvKey = (keyName: string): string => {
  try {
    const key = process.env[keyName];
    if (!key) {
      throw new Error(`INTERNAL SERVER ERROR: ${keyName} not found`);
    }
    return key;
  } catch (error) {
    console.error(`Error getting item with key ${keyName}:`, error);
    throw new Error('Failed to get item');
  }
};

/**
 * Guarda un valor en AsyncStorage.
 * @param key - La clave donde se almacenará el valor.
 * @param value - El valor a almacenar (puede ser de cualquier tipo).
 */
export const saveItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    let currentSaved: T[] = (await getItems<T[]>(key)) || [];

    currentSaved.push(value);

    await AsyncStorage.setItem(key, JSON.stringify(currentSaved));
  } catch (error) {
    console.error(`Error saving item with key ${key}:`, error);
    return Promise.reject('Failed to save item');   
  }
};

/**
 * Obtiene un valor desde AsyncStorage.
 * @param key - La clave del valor a obtener.
 * @returns - El valor almacenado (o `null` si no existe).
 */
export const getItems = async <T>(key: string): Promise<T | []> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error(`Error getting item with key ${key}:`, error);
    return Promise.reject([]);   
  }
};

/**
 * Elimina un valor desde AsyncStorage.
 * @param key - La clave del valor a eliminar.
 * @param compareFn - Función para comparar los elementos.
 */
export const removeItem = async <T>(
  key: string,
  compareFn: (item: T) => boolean,
): Promise<void> => {
  try {
    const items = await getItems<T[]>(key);
    const filteredItems = items.filter((item) => !compareFn(item));
    await AsyncStorage.setItem(key, JSON.stringify(filteredItems));
  } catch (error) {
    console.error(`Error removing item with key ${key}:`, error);
    return Promise.reject('Failed to remove item');
  }
};

