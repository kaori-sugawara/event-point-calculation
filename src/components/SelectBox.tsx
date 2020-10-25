import React from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  control: Control<any>;
  items: { label: string, value: string | number }[];
  unit?: string;
}

const SelectBox = ({ label, name, control, items, unit }: Props) => {
  const onChangeValue = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, onChange: (...event: number[]) => void) => {
      if (!e) return;
      return onChange(Number(e.target.value));
    }, []);
  return (
    <div className="mt-5">
      <div className="field is-horizontal">
        <div className="field-label is-normal" style={{ flexGrow: 5 }}>
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="select">
              <Controller
                name={name}
                control={control}
                render={({ value, onChange }) => (
                  <select
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeValue(e, onChange)}>
                    {items.map(item => (
                      <option key={item.value} value={item.value}>{item.label}{unit ?? ""}</option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SelectBox };