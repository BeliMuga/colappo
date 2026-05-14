import { useTheme } from "@/hooks/use-theme";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { FigureCard } from "@/components/figure-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { getFigures } from "@/services/figure-service";
import { Figure } from "@/types/figure";
import { useEffect, useState } from "react";

{
  /*function getDevMenuHint() {
  if (Platform.OS === "web") {
    return (
      <ThemedText type="small">
        use browser devtools
      </ThemedText>
    );
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press{" "}
        <ThemedText type="code">m</ThemedText> in
        terminal
      </ThemedText>
    );
  }
  const shortcut =
    Platform.OS === "android"
      ? "cmd+m (or ctrl+m)"
      : "cmd+d";
  return (
    <ThemedText type="small">
      press{" "}
      <ThemedText type="code">
        {shortcut}
      </ThemedText>
    </ThemedText>
  );
}*/
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] =
    useState(false);
  const [name, setName] = useState("");
  const [anime, setAnime] = useState("");
  const [collection, setCollection] =
    useState("");

  const [description, setDescription] =
    useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const placeholderColor = useTheme();
  const [imageUrl, setImage] = useState<
    string | null
  >(null);
  const [figures, setFigures] = useState<
    Figure[]
  >([]);
  const [selectedFigure, setSelectedFigure] =
    useState<Figure | null>(null);

  const [detailsVisible, setDetailsVisible] =
    useState(false);
  const handleFigurePress = (figure: Figure) => {
    setSelectedFigure(figure);
    setDetailsVisible(true);
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getFigures();
    setFigures(data);
  };

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const clearForm = () => {
    setName("");
    setAnime("");
    setCollection("");
    setWidth("");
    setHeight("");
    setDepth("");
    setDescription("");
    setImage(null);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText
              type="title"
              style={styles.title}
            >
              Empieza a&nbsp;Coleccionar
            </ThemedText>
            <Pressable
              style={styles.button}
              onPress={() =>
                setModalVisible(true)
              }
            >
              <ThemedText type="smallBold">
                Añade tu figura
              </ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedView style={styles.figureList}>
            {figures.map((figure) => (
              <FigureCard
                key={figure.id}
                figure={figure}
                onPress={handleFigurePress}
              />
            ))}
          </ThemedView>
          {/*<ThemedText
          type="code"
          style={styles.code}
        >
          get started
        </ThemedText>

        <ThemedView
          type="backgroundElement"
          style={styles.stepContainer}
        >
          <HintRow
            title="Try editing"
            hint={
              <ThemedText type="code">
                src/app/index.tsx
              </ThemedText>
            }
          />
          <HintRow
            title="Dev tools"
            hint={getDevMenuHint()}
          />
          <HintRow
            title="Fresh start"
            hint={
              <ThemedText type="code">
                npm run reset-project
              </ThemedText>
            }
          />
        </ThemedView>*/}

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            presentationStyle="pageSheet"
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <Pressable
              style={styles.overlay}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Pressable
                onPress={(e) =>
                  e.stopPropagation()
                }
              >
                <ThemedView
                  type="backgroundNone"
                  style={styles.modalSection}
                >
                  <ThemedView
                    type="backgroundElement"
                    style={styles.modalContainer}
                  >
                    <ThemedText type="default">
                      Añade tu figura
                    </ThemedText>
                    {imageUrl && (
                      <Image
                        source={{ uri: imageUrl }}
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 8,
                        }}
                      />
                    )}
                    <Pressable
                      onPress={pickImage}
                      style={styles.button}
                    >
                      <ThemedText>
                        Selecciona una imagen
                      </ThemedText>
                    </Pressable>

                    <TextInput
                      placeholder="Nombre de la figura"
                      placeholderTextColor={
                        placeholderColor.textSecondary
                      }
                      value={name}
                      onChangeText={setName}
                      style={[
                        styles.input,
                        {
                          color:
                            placeholderColor.text,
                        },
                      ]}
                    />

                    <TextInput
                      placeholder="Anime"
                      placeholderTextColor={
                        placeholderColor.textSecondary
                      }
                      value={anime}
                      onChangeText={setAnime}
                      style={[
                        styles.input,
                        {
                          color:
                            placeholderColor.text,
                        },
                      ]}
                    />

                    <TextInput
                      placeholder="Colección"
                      placeholderTextColor={
                        placeholderColor.textSecondary
                      }
                      value={collection}
                      onChangeText={setCollection}
                      style={[
                        styles.input,
                        {
                          color:
                            placeholderColor.text,
                        },
                      ]}
                    />

                    <ThemedText type="smallBold">
                      Tamaño
                    </ThemedText>
                    <ThemedView
                      type="backgroundElement"
                      style={styles.sizeRow}
                    >
                      <TextInput
                        placeholder="Ancho"
                        value={width}
                        onChangeText={setWidth}
                        keyboardType="numeric"
                        style={[
                          styles.sizeInput,
                          {
                            color:
                              placeholderColor.text,
                          },
                        ]}
                        placeholderTextColor={
                          placeholderColor.textSecondary
                        }
                      />

                      <TextInput
                        placeholder="Alto"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                        style={[
                          styles.sizeInput,
                          {
                            color:
                              placeholderColor.text,
                          },
                        ]}
                        placeholderTextColor={
                          placeholderColor.textSecondary
                        }
                      />

                      <TextInput
                        placeholder="Profundidad"
                        value={depth}
                        onChangeText={setDepth}
                        keyboardType="numeric"
                        style={[
                          styles.sizeInput,
                          {
                            color:
                              placeholderColor.text,
                          },
                        ]}
                        placeholderTextColor={
                          placeholderColor.textSecondary
                        }
                      />
                    </ThemedView>

                    <TextInput
                      placeholder="Descripción"
                      placeholderTextColor={
                        placeholderColor.textSecondary
                      }
                      value={description}
                      onChangeText={
                        setDescription
                      }
                      style={[
                        styles.input,
                        {
                          height: 100,
                          color:
                            placeholderColor.text,
                        },
                      ]}
                      multiline
                    />
                    <ThemedView
                      type="backgroundElement"
                      style={styles.modalControl}
                    >
                      <Pressable
                        style={styles.button}
                        onPress={() =>
                          setModalVisible(false)
                        }
                      >
                        <ThemedText type="small">
                          Cancelar
                        </ThemedText>
                      </Pressable>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          const figureData = {
                            name,
                            anime,
                            collection,
                            size: {
                              width:
                                Number(width),
                              height:
                                Number(height),
                              depth:
                                Number(depth),
                            },
                            description,
                            imageUrl,
                          };

                          console.log(figureData);
                          clearForm(); // only after successful save
                          setModalVisible(false);
                        }}
                      >
                        <ThemedText type="small">
                          Siguiente
                        </ThemedText>
                      </Pressable>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </Pressable>
            </Pressable>
          </Modal>
          <Modal
            visible={detailsVisible}
            transparent
            animationType="fade"
            //presentationStyle="pageSheet"
            onRequestClose={() => {
              setDetailsVisible(false);
            }}
          >
            <Pressable
              style={styles.overlay}
              onPress={() =>
                setDetailsVisible(false)
              }
            >
              <Pressable
                onPress={(e) =>
                  e.stopPropagation()
                }
              >
                <ThemedView
                  type="backgroundNone"
                  style={styles.modalSection}
                >
                  {selectedFigure && (
                    <ThemedView
                      type="backgroundElement"
                      style={
                        styles.modalContainer
                      }
                    >
                      <ThemedText type="title">
                        {selectedFigure.name}
                      </ThemedText>

                      <ThemedText>
                        {selectedFigure.anime}
                      </ThemedText>

                      <ThemedText>
                        {
                          selectedFigure.collection
                        }
                      </ThemedText>

                      <ThemedText type="small">
                        {
                          selectedFigure.description
                        }
                      </ThemedText>

                      <ThemedText type="small">
                        Anchura:{" "}
                        {
                          selectedFigure.size
                            .width
                        }
                        <br />
                        Altura:{" "}
                        {
                          selectedFigure.size
                            .height
                        }
                        <br />
                        Profundidad:{" "}
                        {
                          selectedFigure.size
                            .depth
                        }
                      </ThemedText>

                      {selectedFigure.imageUrl && (
                        <Image
                          source={{
                            uri: selectedFigure.imageUrl,
                          }}
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: 8,
                          }}
                        />
                      )}

                      <Pressable
                        style={styles.button}
                        onPress={() =>
                          setDetailsVisible(false)
                        }
                      >
                        <ThemedText>
                          Cerrar
                        </ThemedText>
                      </Pressable>
                    </ThemedView>
                  )}
                </ThemedView>
              </Pressable>
            </Pressable>
          </Modal>
          {Platform.OS === "web" && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingTop: Spacing.seven,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  modalContainer: {
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  modalSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  modalControl: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    marginVertical: Spacing.seven,
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 10,
  },
  figureList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    maxWidth: MaxContentWidth,
  },
  sizeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,

    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
