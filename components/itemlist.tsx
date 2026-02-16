import { FlatList, View, Text,Image } from "react-native";
import ItemCard from "./item";

interface ItemListProps {
  items: any[];
  reload: () => void;
}

export default function ItemList({ items, reload }: ItemListProps) {

  const renderHeader = () => (
    <View>

      {/* Ads section */}
      <View
        style={{
          height: 200,
          //backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          //borderRadius: 30,
          marginBottom: 16,
        }}
      >
        <Image source={require("../assets/img/ads.png")} style={{
            resizeMode:"cover",
            height:"100%",
            width:"100%",
            borderRadius: 20,

        }}/>
      </View>

      {/* Title */}
      <Text
        style={{
            marginTop:10,
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 5,
          color: "black"
        }}
      >
        Your Karto
      </Text>

    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <ItemCard item={item} onPurchased={reload} />
      )}

      ListHeaderComponent={renderHeader}

      contentContainerStyle={{
        //padding: 16,
        paddingBottom: 60
      }}

      showsVerticalScrollIndicator={false}
    />
  );
}