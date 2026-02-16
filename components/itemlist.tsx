import { FlatList } from "react-native";
import ItemCard from "./item";

export default function ItemList({ items, reload }) {

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          onPurchased={reload}
        />
      )}
    />
  );
}