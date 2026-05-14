import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Figure } from "@/types/figure";
import { Image, Pressable } from "react-native";

type Props = {
  figure: Figure;
  onPress: (figure: Figure) => void;
};

export function FigureCard({
  figure,
  onPress,
}: Props) {
  return (
    <ThemedView>
      <Pressable onPress={() => onPress(figure)}>
        <ThemedView style={{ padding: 12 }}>
          <ThemedText type="bold">
            {figure.name}
          </ThemedText>

          <ThemedText type="small">
            {figure.anime}
          </ThemedText>

          <ThemedText type="small">
            {figure.collection}
          </ThemedText>

          {figure.imageUrl && (
            <Image
              source={{ uri: figure.imageUrl }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 8,
              }}
            />
          )}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}
