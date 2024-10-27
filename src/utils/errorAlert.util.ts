import { Alert } from "react-native";

export const errorAlert = (error: any) => {
  let errorMessage = "An unknown error has occurred";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  console.error(error);
  Alert.alert("Error", errorMessage);
}