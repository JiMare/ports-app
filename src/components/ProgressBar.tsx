import React from "react";

type Props = {
  progress: number;
  label: string;
};

export const ProgressBar: React.FC<Props> = ({ progress, label }) => {
  const progressClass =
    label === "Success" ? "progress__bar success" : "progress__bar error";
  const progressLabelClass =
    label === "Success" ? "progress__label success__text" : "progress__label error__text";

  return (
    <div>
      <h5 className={progressLabelClass}>{label}</h5>
      <div className="progress">
        <div className={progressClass} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
