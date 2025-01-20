import { Modal, ModalFuncProps, Tooltip } from "antd";
import { ReactNode, useCallback } from "react";
import { ModalContext } from "@shared/context/ModalContext";
import { DEFAULT_MODAL_WIDTH } from "@shared/ui/Modal/model/Modal.const";

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider = (props: ModalProviderProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const useOpenModalWindow = useCallback(
    (props: ModalFuncProps) => {
      const type = props.type ?? "info";
      const propsWithDefaultValues = {
        width: DEFAULT_MODAL_WIDTH,
        closable: true,
        closeIcon: (
          <Tooltip title="Закрыть окно">
            <span className="ant-modal-close-icon" />
          </Tooltip>
        ),
        ...props,
      };

      switch (type) {
        case "confirm":
          return modal.confirm(propsWithDefaultValues);
        case "error":
          return modal.error(propsWithDefaultValues);
        case "warning":
        case "warn":
          return modal.warning(propsWithDefaultValues);
        case "success":
          return modal.success(propsWithDefaultValues);
        case "info":
        default:
          return modal.info(propsWithDefaultValues);
      }
    },
    [modal],
  );

  return (
    <ModalContext.Provider value={useOpenModalWindow}>
      {props.children}
      {contextHolder}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
