import React from "react";

type Props = {
  progress: number;
  label: string;
};

export const ProgressBar: React.FC<Props> = ({ progress, label }) => {
  const progressClass =
    label === "Success" ? "progress__bar success" : "progress__bar error";

  return (
    <div>
      <h5 className="progreess__label">{label}</h5>
      <div className="progress">
        <div className={progressClass} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
