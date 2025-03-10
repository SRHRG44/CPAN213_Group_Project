import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailsScreen = () => {
    const route = useRoute();
    const { item } = route.params || {};

    if (!item) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No details available.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{item.title || item.name}</Text>
                {item.description && <Text style={styles.description}>{item.description}</Text>}

            <View style={styles.detailsContainer}>
                {item.mission_name && <Text style={styles.detail}><Text style={styles.bold}>Mission:</Text> {item.mission_name}</Text>}
                {item.success !== undefined && (
                <Text style={styles.detail}><Text style={styles.bold}>Launch Status:</Text> {item.success ? "Successful" : "Failed"}</Text>
                )}
            {item.rocket?.name && <Text style={styles.detail}><Text style={styles.bold}>Rocket:</Text> {item.rocket.name}</Text>}
            {item.launchpad?.full_name && <Text style={styles.detail}><Text style={styles.bold}>Launch Site:</Text> {item.launchpad.full_name}</Text>}
            {item.date_utc && <Text style={styles.detail}><Text style={styles.bold}>Launch Date:</Text> {new Date(item.date_utc).toLocaleDateString()}</Text>}
            {item.agency?.name && <Text style={styles.detail}><Text style={styles.bold}>Agency:</Text> {item.agency.name}</Text>}
            {item.type && <Text style={styles.detail}><Text style={styles.bold}>Type:</Text> {item.type}</Text>}
            {item.date && <Text style={styles.detail}><Text style={styles.bold}>Event Date:</Text> {new Date(item.date).toLocaleDateString()}</Text>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#121212" },
    header: { fontSize: 24, fontWeight: "bold", color: "#00ff00", marginBottom: 10 },
    description: { fontSize: 16, color: "#ccc", marginBottom: 15 },
    detailsContainer: { marginTop: 10 },
    detail: { fontSize: 16, color: "#ddd", marginBottom: 5 },
    bold: { fontWeight: "bold", color: "#fff" },
    errorText: { color: "red", textAlign: "center", fontSize: 18 },
});

export default DetailsScreen;