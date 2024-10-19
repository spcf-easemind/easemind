import IconPencil from "../assets/icons/buttons/IconPencil.svg";
import IconTrashcan from "../assets/icons/buttons/IconTrashcan.svg";
import IconSave from "../assets/icons/buttons/IconSave.svg";
import IconReport from "../assets/icons/buttons/IconReport.svg";
import IconXCircle from "../assets/icons/buttons/IconXCircle.svg";
import IconCheckCircle from "../assets/icons/buttons/IconCheckCircle.svg";
import IconHistory from "../assets/icons/buttons/IconHistory.svg";

export const EDIT_DELETE = [
  {
    value: "edit",
    icon: IconPencil,
    label: "Edit",
    textColor: "dark.5",
  },
  {
    value: "delete",
    icon: IconTrashcan,
    label: "Delete",
    textColor: "dark.5",
  },
];

export const SAVE_REPORT = [
  {
    value: "save",
    icon: IconSave,
    label: "Save",
    textColor: "dark.5",
  },
  {
    value: "report",
    icon: IconReport,
    label: "Report",
    textColor: "dark.5",
  },
];

export const EDIT_OPTION = [
  {
    value: "edit",
    icon: IconPencil,
    label: "Edit",
    textColor: "dark.5",
  },
];

export const APPROVE_REJECT = [
  {
    value: "approve",
    icon: IconCheckCircle,
    label: "Approve",
    textColor: "green.5",
  },
  {
    value: "reject",
    icon: IconXCircle,
    label: "Reject",
    textColor: "red.5",
  },
];

export const HISTORY_OPTION = [
  {
    value: "history",
    icon: IconHistory,
    label: "History",
    textColor: "dark.5",
  },
];
