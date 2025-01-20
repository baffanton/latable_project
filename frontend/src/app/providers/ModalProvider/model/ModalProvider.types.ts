import { ModalFuncProps } from "antd";

export type OpenModalWindowReturn = {
  destroy: () => void;
  update: (configUpdate: ModalFuncProps) => void;
};
