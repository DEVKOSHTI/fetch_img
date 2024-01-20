import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";

const WIDTH_M = Dimensions.get("window").width;
const HEIGHT_M = Dimensions.get("window").height;

const API = (props) => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const FetchAPI = async () => {
      const apiUrl =
        "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s";
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.photos && data.photos.photo) {
          setPhotos(data.photos.photo);
        } else {
          console.error("Error fetching photos from Flickr API");
        }
      } catch (error) {
        console.error("Error fetching photos from Flickr API:", error);
      }
    };

    FetchAPI();
  }, []);

  const renderImageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedImage !== null}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableHighlight
            style={{ marginTop: 20 }}
            onPress={() => setSelectedImage(null)}
          >
            <Text style={{ color: "blue"}}>close</Text>
          </TouchableHighlight>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: WIDTH_M, height: HEIGHT_M-20 }}
          />
          
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedImage(item.url_s)}
          >
            <View
              style={[
                styles.imageContainer,
                { display: "flex", flexDirection: "row", flexWrap: "wrap" },
              ]}
            >
              <Image source={{ uri: item.url_s }} style={[styles.image,{width:item.width_s,height:item.height_s}]} />
            </View>
          </TouchableOpacity>
        )}
      />
      {renderImageModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexWrap:'wrap'
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin:1,
    flexWrap:'wrap'
  },
  image: {
    borderRadius:5
  },
});

export default API;
