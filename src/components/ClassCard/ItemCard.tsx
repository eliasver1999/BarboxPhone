import { View, ListRenderItem } from "react-native";
import React from "react";
import theme, { Text } from "../../Theme/Theme";
import { Feather as Icon, Ionicons as Icon2 } from "@expo/vector-icons";
import { CardData } from "../../screens/HomeScreen";

const ItemCard = ({ item }: { item: CardData }) => {
  return (
    <View
      style={{
        width: 180,
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginLeft: item.id == 1 ? 30 : 0,
        marginRight: 30,
        borderRadius: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ justifyContent: "center" }}>
          <Icon
            size={32}
            name={item.name}
            color={item.decrease ? "red" : "green"}
          />
        </View>
        <View style={{ marginLeft: theme.spacing.m }}>
          <Text variant="tabs">{item.title}</Text>
          <Text variant="card">{item.message}</Text>
        </View>
      </View>
      <View style={{ marginTop: 10, padding: 0 }}>
        <Text variant="card" color={item.decrease ? "orange" : "greenLight"}>
          {item.data}
        </Text>
        <Text variant="cardLabel">{item.bottomMessage}</Text>
      </View>
    </View>
  );
};

export default ItemCard;
