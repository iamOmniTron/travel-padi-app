import Toast from "react-native-toast-message";


export const ToastError = (message)=>Toast.show({type:"error",text1:"Error!",text2:message});

export const ToastSuccess = (message)=>Toast.show({type:"success",text1:"Success",text2:message});