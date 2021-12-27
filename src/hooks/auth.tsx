import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { 
    createContext, 
    ReactNode, 
    useContext,
    useState,
    useEffect
} from "react";
import { useNavigation } from '@react-navigation/native';

interface AuthProviderProps{
    children: ReactNode;
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: User;
    signInWithGoogle(): Promisse<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps){

    const userStorageKey = '@FisioEvolui:user';

    const [user, setUser] = useState<User>({} as User);

    const navigation = useNavigation();

    async function signInWithGoogle(){
        try{
            const result = await Google.logInAsync({
                androidClientId: '19918590573-iegpvh191l2qeoc24i9nvf0jbii6dpk6.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if(result.type === 'success'){
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email,
                    name: result.user.name!,
                    photo: result.user.photoUrl!,
                }

                 setUser(userLogged);
                // await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

            }

        }catch(error){
            alert("ERRO: "+ error);
        }finally{

        }
    }

    useEffect(()=>{
        async function loadUserStorageDate(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
        }
       // loadUserStorageDate();
    },[]);

    useEffect(()=>{
        if(user.id){
            navigation.navigate({name: 'MainTab'});
        }
    },[user]);

    return(
        <AuthContext.Provider value={{ 
            user,
            signInWithGoogle
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }




