
import { stateImages, DefaultStateImage } from "../../services/image";
import { Image } from "react-native";
import { styles } from "./styles";
import { Props } from "./types";

export function StateImage({ stateCode }: Props) {
    const imageSource = stateImages[stateCode] ?? DefaultStateImage;

    return (
        <Image
        source={imageSource}
        style={styles.stateImage}
        resizeMode="contain"
        />
    );
};