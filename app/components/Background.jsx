// import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
// import React from 'react';

// const Background = ({children}) => {
//     return (
//         <View>
//             <Image source={require("../assets/bgleaf.png")} 
//               style={{ height: "100%", width: "100%" }} 
//             />
//             <View style={{ position: "absolute" }}>
//                 {children}
//             </View>
//         </View>
//     )
// }

// export default Background

// const styles = StyleSheet.create({})

import { KeyboardAvoidingView, StyleSheet, View, ImageBackground, Platform } from 'react-native';
import React from 'react';

const Background = ({ children }) => {
    return (
        <ImageBackground
            source={require("./../../assets/images/bgleaf.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.overlay}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default Background;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
    },
});

