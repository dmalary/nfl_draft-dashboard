/* eslint-disable react/prop-types */

import styles from "../styles/tooltip.module.css";

const Tooltip = ({ interactData }) => {
  if (!interactData) {
    return null;
  }

  console.log('interactData', interactData)

  return (
    <div
      className={styles.tooltip}
      style={{
        left: interactData.xPos,
        top: interactData.yPos,
      }}
    >
      {interactData.name}
    </div>
  );
};

export default Tooltip;