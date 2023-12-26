import { BsPlus } from "react-icons/bs"
import { PiSpinnerGapLight } from "react-icons/pi"
import { IoClose } from "react-icons/io5";
import { FiAlertOctagon } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { FiImage } from "react-icons/fi";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { LuMoreVertical } from "react-icons/lu";
import { MdOutlineOndemandVideo } from "react-icons/md"
const iconsMap = {
    "more": <BsPlus />,
    "loading": <PiSpinnerGapLight />,
    "close": <IoClose />,
    "empty": <FiAlertOctagon />,
    "node-text": <IoText />,
    "node-gallery": <FiImage />,
    "node-video": <MdOutlineOndemandVideo />,
    "folio": <LuGalleryVerticalEnd />,
    "show": <FaRegEye />,
    "hide": <FaRegEyeSlash />,
    "more-vertical": <LuMoreVertical />,
  }
  export type IconsKeys = keyof typeof iconsMap;

  export default iconsMap