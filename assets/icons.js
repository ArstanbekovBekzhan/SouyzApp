import { AntDesign,FontAwesome  } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    qrcode: (props)=> <AntDesign name="qrcode" size={24} {...props} />,
    News: (props)=> <FontAwesome name="newspaper-o" size={24} {...props} />,
    History: (props)=> <FontAwesome name="history" size={24} color="black" {...props} />,
    AuthForm: () => null,
}