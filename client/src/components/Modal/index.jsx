/* @flow strict */

import * as React from 'react';

import './Modal.scss';

type PropsType = {
  opened: boolean,
  onClose: () => void,
  children: null | React.Node
};

const Modal = ({
  opened,
  onClose: handleClose,
  children
}: PropsType): React.Element<'div'> => {
  const wrapper = React.useRef(null);
  const handleClick = React.useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => {
      if (e.target === wrapper.current) {
        handleClose(e);
      }
    },
    []
  );

  return (
    <div
      className={`Modal__wrapper${opened ? ' Modal__wrapper--opened' : ''}`}
      onClick={handleClick}
      ref={wrapper}
    >
      <div className="Modal__inner" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
