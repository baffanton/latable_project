import { OpenModalWindowReturn } from "@app/providers/ModalProvider/model/ModalProvider.types";
import { ModalFuncProps } from "antd";
import { createContext } from "react";

export const ModalContext = createContext((_props: ModalFuncProps): OpenModalWindowReturn | void => {});
