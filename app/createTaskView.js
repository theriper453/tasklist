import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

export default function CreateTaskView({ close, addTask }) {
    const [task, setTask] = useState({})

    const save = () => {
        if (!task.subject || !task.detail)
            return Alert.alert("Error!", "Debe llenar todos los campos")
        addTask(task.subject, task.detail)
        setTask({})
        close()
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalForm}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>Nueva tarea</Text>
                    <TouchableHighlight style={styles.closeArea} onPress={close}>
                        <Text style={styles.xIcon}>X</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView>
                    <TextInput
                        onChange={ev => setTask({ ...task, subject: ev.nativeEvent.text })}
                        style={styles.textInput}
                        placeholder="Asunto"
                    />
                    <TextInput
                        onChange={ev => setTask({ ...task, detail: ev.nativeEvent.text })}
                        style={styles.textInput}
                        placeholder="Detalles"
                    />
                    <Button onPress={save} title="Guardar" />
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: -45,
        flex: 1
    },
    modalForm: {
        backgroundColor: "white",
        width: "78%",
        padding: 40,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24
    },
    closeArea: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#82daed"
    },
    xIcon: {
        fontSize: 20,
        fontWeight: "bold"
    },
    textInput: {
        height: 30,
        marginBottom: 13
    }
})