import { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, } from 'react-native';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';





export default function AuthModal({ visible, onClose, }) {


    const [isLogin, setIsLogin] = useState(true);


    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >

            <View style={styles.overlay}>

                <View style={styles.container}>

                    {/* 🔘 Tabs */}
                    <View style={styles.tabs}>

                        <TouchableOpacity
                            onPress={() =>
                                setIsLogin(true)
                            }
                        >

                            <Text
                                style={[
                                    styles.tabText,

                                    isLogin &&
                                    styles.activeTab,
                                ]}
                            >
                                Login
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                setIsLogin(false)
                            }
                        >

                            <Text
                                style={[
                                    styles.tabText,

                                    !isLogin &&
                                    styles.activeTab,
                                ]}
                            >
                                Registro
                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* 🧩 Formularios */}
                    {isLogin ? (

                        <LoginForm onClose={onClose} />

                    ) : (

                        <RegisterForm onClose={onClose} />

                    )}

                </View>

            </View>

        </Modal>

    );

}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },

    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

    tabText: {
        fontSize: 18,
        color: '#777',
    },

    activeTab: {
        color: '#000',
        fontWeight: 'bold',
    },

});