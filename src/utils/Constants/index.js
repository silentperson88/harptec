import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

//  Messages or Hard Coded Data
const TextMessage = {
  EMAIL_NOT_VALID: "Email is not valid",
  VALUE_TOO_SHORT: "Value is too short",
  VALUE_TOO_LONG: "Value is too long",
  PASSWORD_FIELD_REQUIRED: "Password is required",
  PASSWORD_LENGTH_VALIDATION: "Password must be between 8 and 16 characters",
  PASSWORD_LOWERCASE_VALIDATION: "Password must contain at least one lowercase letter",
  PASSWORD_UPPERCASE_VALIDATION: "Password must contain at least one uppercase letter",
  PASSWORD_DIGIT_VALIDATION: "Password must contain at least one digit",
  PASSWORD_SYMBOL_VALIDATION: "Password must contain at least one symbol",
  ADDED_SUCCESSFULLY: "Added Successfully",
  ADDED_FAILED: "Added Failed",
  SUCESS_NOTIFICATION: "success",
  ERROR_NOTIFICATION: "error",
  REQUIRED: "Required",
};

// Card Titles
export const CardTitles = {
  LOGIN: "Login",
};

// color constants
export const Colors = {
  PRIMARY: "#191A51",
  SECONDARY: "#FFC107",
  ERROR: "#9D0202",
  SUCCESS: "#029E3B",
  INFO: "#2196F3",
  WARNING: "#FF9800",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GREY: "#9E9E9E",
};

// icon constants
export const Icons = {
  NEW: <AddCircleOutlineOutlinedIcon fontSize="medium" sx={{ cursor: "pointer" }} />,
  MAN: <ManIcon fontSize="medium" sx={{ cursor: "pointer" }} />,
  WOMAN: <WomanIcon fontSize="medium" sx={{ cursor: "pointer" }} />,
  CROSS: <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} />,
  LOGOUT: <PowerSettingsNewIcon fontSize="medium" sx={{ cursor: "pointer" }} />,
};

export const defaultData = {
  EMAIL: "react@harptec.com",
  PASSWORD: "Harptec@123",
};

export default TextMessage;
