import { SafeAreaProvider} from 'react-native-safe-area-context'

const SafeArea = ({ children }: any) => {
    return (
        <SafeAreaProvider style={{
            backgroundColor: "blue"
        }}>
            {children}
        </SafeAreaProvider>
    )
}

export default SafeArea;