import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, Modal } from "react-native";
import rawTasks from "./data/tasks";
import Task from "../components/Task";
import { useState } from "react";
import CreateTaskView from "./createTaskView";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function Home() {
    const [tasks, setTasks] = useState(rawTasks)
    const [showCreate, setShowCreate] = useState(false)

    try {

        return (
            <GestureHandlerRootView>

                <View style={styles.mainView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showCreate}
                    >
                        <CreateTaskView
                            close={() => setShowCreate(false)}
                            addTask={(subject, detail) => setTasks([...tasks, { id: Date.now().toString(), subject, detail, createdAt: Date.now(), updatedAt: Date.now(), completed: false }])}
                        />
                    </Modal>
                    <View style={styles.toolBar}>
                        <Text style={styles.title}>Lista de tareas</Text>
                        <TouchableHighlight style={styles.addTaskButton} onPress={() => setShowCreate(true)}>
                            <Text style={styles.plusIcon}>+</Text>
                        </TouchableHighlight>
                    </View>
                    <ScrollView style={styles.container}>
                        {
                            tasks.map(task =>
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    completed={task.completed}
                                    subject={task.subject}
                                    detail={task.detail}
                                    deleteTask={id => setTasks(tasks => tasks.filter(task => task.id !== id))}
                                    completedTask={id => setTasks(tasks => tasks.map(task => task.id === id ? { ...task, completed: true } : task))}
                                >
                                </Task>
                            )
                        }
                        {
                            tasks.length === 0 &&
                            <View style={styles.centerView}>
                                <Text>No hay tareas</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            </GestureHandlerRootView>
        )
    } catch (err) {
    }


}

const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        maxHeight: "97%"
    },
    toolBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    addTaskButton: {
        marginLeft: 65,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#82daed",
        borderRadius: 60
    },
    plusIcon: {
        fontSize: 28,
        fontWeight: "600",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginVertical: 20,
    },
    container: {
        width: "90%",
        height: "100%"
        //alignItems: "center"
    },
    centerView: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})