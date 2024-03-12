import { Animated, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from "react-native-gesture-handler";


export default function Task({ id, subject, detail, completed, deleteTask, completedTask }) {


    const renderRightActions = (progress, dragAnimatedValue) => {
        const opacity = dragAnimatedValue.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.swipedRow}>
                <View style={styles.swipedConfirmationContainer}>
                    <Text style={styles.deleteConfirmationText}>¿Estás seguro que deseas eliminar esta tarea?</Text>
                </View>
                <Animated.View style={[styles.deleteButton, { opacity }]}>
                    <TouchableOpacity onPress={() => deleteTask(id)}>
                        <Text style={styles.deleteButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    const renderLeftActions = (progress, dragAnimatedValue) => {
        const opacity = dragAnimatedValue.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.swipedRow}>
                <View style={styles.swipedConfirmationContainer}>
                    <Text style={styles.completedConfirmationText}>¿Deseas marcar la tarea completada?</Text>
                </View>
                <Animated.View style={[styles.completeButton]}>
                    <TouchableOpacity onPress={() => {
                        completedTask(id)

                    }}>
                        <Text style={styles.completeButtonText}>Completar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
            <View style={styles.task}>
                <Text style={{ ...styles.subject, textDecorationLine: (completed ? "line-through" : "none") }}>{subject}</Text>
                <Text style={{ ...styles.detail, textDecorationLine: (completed ? "line-through" : "none") }}>{detail}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    task: {
        marginVertical: 10,
        paddingHorizontal: 30,
        paddingVertical: 40,
        backgroundColor: "#efefef",
        borderRadius: 30
    },
    subject: {
        fontSize: 32,
        fontWeight: "700"
    },
    detail: {
        fontSize: 20
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#fff',
        margin: 20,
        minHeight: 50,
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: '#000',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#b60000',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 15,
    },
    completedConfirmationText: {
        color: "black"
    },
    completeButton: {
        backgroundColor: '#82daed',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    completeButtonText: {
        color: '#000',
        fontWeight: 'bold',
        padding: 15,
    }
})