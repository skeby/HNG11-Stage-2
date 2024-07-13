import { ThemeConfig } from "antd"

export const themeConfig: ThemeConfig = {
  token: {
    fontFamily: "Public sans, sans-serif",
    colorText: "#191C1F",
  },
  components: {
    Form: {
      itemMarginBottom: 0,
      colorError: "#A82134",
    },
    Input: {
      colorPrimary: "#BF5700",
      controlOutline: "#BF5700",
      hoverBorderColor: "#BF5700",
      colorError: "#A82134",
      controlOutlineWidth: 0.5,
    },
    Select: {
      colorTextPlaceholder: "#77878F",
      borderRadius: 2,
      colorPrimary: "#BF5700",
      controlOutline: "#BF5700",
      controlOutlineWidth: 0.5,
      colorPrimaryBorderHover: "#BF5700",
    },
    Radio: {
      colorText: "#BF5700",
      colorPrimary: "#BF5700",
    },
    Checkbox: {
      colorPrimary: "#BF5700",
    },
    Button: {
      defaultHoverBorderColor: "#FF7F50",
    },
  },
}
