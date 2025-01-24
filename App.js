import '@react-native-firebase/app';
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [qrCodeBase64, setQrCodeBase64] = useState('');

    const createProfile = async () => {
        try {
            const userProfile = {
                first_name: 'Meena',
                last_name: 'Shetty',
                date_of_birth: '09-06-1979',
                email: 'meena@example.com',
                role: 'new_user',
                completed_steps: ['first_name', 'last_name', 'date_of_birth']
            };

            // Send the data to Flask backend (your API)
            const response = await axios.post('http://10.0.2.2:5000/api/new_user', userProfile);

            console.log('User Profile Created:', response.data);

            // Assuming the response contains the base64 string of the QR code
            setQrCodeBase64(response.data.qr_code_base64);
        } catch (error) {
            if (error.response) {
                console.log('Error creating profile:', error.response.data);
            } else {
                console.log('Error creating profile:', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text>React Native Firebase Setup</Text>
            <Button title="Create Profile" onPress={createProfile} />
            {qrCodeBase64 ? (
                <Image
                    style={styles.qrCode}
                    source={{ uri: `data:image/png;base64,${qrCodeBase64}` }}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCode: {
        marginTop: 20,
        width: 200,
        height: 200,
    },
});

export default App;