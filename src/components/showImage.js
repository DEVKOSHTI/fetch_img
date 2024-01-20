import React from "react";
import { ImageBackground, View,Dimensions } from "react-native";

const WIDTH_M = Dimensions.get("window").width
const HEIGHT_M = Dimensions.get("window").height

const showImage = ()=>{
    return(
        <View>
            <ImageBackground source={props.route.params.url} style={{width:WIDTH_M,height:HEIGHT_M}} />
        </View>
    )
}
export default showImage();