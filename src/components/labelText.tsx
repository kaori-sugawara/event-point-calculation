import React from 'react';

type Props = {
  label: string;
  value: number;
  unit?: string;
}

const LabelText = ({ label, value, unit }: Props) => {
  const fieldValue = `${value ?? 0}${unit ?? ''}`;
  return (
    <div className="mt-5">
      <div className="field is-horizontal">
        <div className="field-label is-normal" style={{ flexGrow: 5 }}>
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field" style={{ paddingTop: ".375rem" }}>
            <span>{fieldValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { LabelText };