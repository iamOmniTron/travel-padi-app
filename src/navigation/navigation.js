import { NavigationContainer } from '@react-navigation/native';
import Layout from '../components/layout';

export default function NavigationWrapper({children}){
    return(
        <NavigationContainer>
            <Layout>
            {children}
            </Layout>
        </NavigationContainer>
    )
}