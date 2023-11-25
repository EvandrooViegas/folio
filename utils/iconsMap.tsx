import { BsPlus } from "react-icons/bs"
import { PiSpinnerGapLight } from "react-icons/pi"
import { IoClose } from "react-icons/io5";
import { FiAlertOctagon } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { FiImage } from "react-icons/fi";
const iconsMap = {
    "more": <BsPlus />,
    "loading": <PiSpinnerGapLight />,
    "close": <IoClose />,
    "empty": <FiAlertOctagon />,
    "node-text": <IoText />,
    "node-gallery": <FiImage />,
  }
  export type IconsKeys = keyof typeof iconsMap;

  export default iconsMap