/* eslint-disable react/prop-types */

const Tooltip = ({ interactData }) => {
  if (!interactData) {
    return null;
  }

  // console.log('interactData', interactData)

  return (
    <div
      className="tooltip"
      style={{
        left: interactData.xPos + 280, // Adjust as needed
        top: interactData.yPos + 80, // Adjust as needed
        width: 220, // Set the width
        height: 75, // Set the height
        pointerEvents: "none", // To prevent the tooltip from blocking mouse events
      }}
    >
      <p>{interactData.position} <b>{interactData.name}</b> ({interactData.college})</p>
      <p><i>{interactData.year} pick: {interactData.pick} (round {interactData.round})</i></p>
    </div>
  );
};

export default Tooltip;