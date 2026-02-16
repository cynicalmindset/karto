import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { supabase } from "@/lib/supabase";

type Props = {
  item: any;
  onPurchased: () => void;
};

export default function ItemCard({ item, onPurchased }: Props) {

  function getUrgencyColor(urgency: string) {
    switch (urgency) {
      case "3": return "#32D74B";
      case "2": return "#FFD60A";
      case "1": return "#FF453A";
      default: return "#999";
    }
  }

  async function markPurchased() {
    const { error } = await supabase
      .from("user_items")
      .update({ purchased: "purchased" })
      .eq("id", item.id);

    if (!error) {
      onPurchased(); // refresh list
    }
  }

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <Text style={styles.actionText}>
        Purchased
      </Text>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={markPurchased}
    >
      <View style={styles.card}>

        <View>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.note}>
            {item.note}
          </Text>
        </View>

        <View
          style={[
            styles.dot,
            { backgroundColor: getUrgencyColor(item.urgency) }
          ]}
        />

      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#F7F7F7",
    padding: 16,
    borderRadius: 14,
    marginVertical: 6,
    minHeight:90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },

  note: {
    color: "#717171",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  rightAction: {
    backgroundColor: "#32D74B",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 14,
    marginVertical: 6,
  },

  actionText: {
    color: "white",
    fontWeight: "600",
  },

});