import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd";
import { FC } from "react";
import { DEFAULT_MODAL_WIDTH } from "../model/Modal.const";

interface ModalProps extends AntdModalProps {}

const Modal: FC<ModalProps> = ({ width, children, ...props }) => {
  return (
    <AntdModal width={width || DEFAULT_MODAL_WIDTH} {...props}>
      {children}
    </AntdModal>
  );
};

export { Modal };
