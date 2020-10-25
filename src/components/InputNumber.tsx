import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  min?: number;
  max?: number;
  unit?: string;
  style?: React.CSSProperties;
}

const InputNumber = ({ label, name, control, min, max, unit, style }: Props) => {
  const [displayValue, setDisplayValue] = React.useState("");
  const onChangeValue = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: number[]) => void) => {
      setDisplayValue(e.currentTarget.value);
      // @ts-ignore
      if (!e.currentTarget.value) return onChange(undefined);
      return onChange(Number(e.currentTarget.value));
    }, []);
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal" style={{ flexGrow: 5 }}>
        <label className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <Controller
              name={name}
              control={control}
              render={({ value, onChange }) => (
                <input
                  value={value ?? displayValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e, onChange)}
                  min={min}
                  max={max}
                  style={style ?? {}}
                  className="input quarterWidth"
                  type="number" />
              )}
            />
            <span className="ml-2" style={{ verticalAlign: "bottom" }}>
              {unit ?? ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { InputNumber };