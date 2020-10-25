import React from 'react';

type Props = {
  error: string;
}

const Error = ({ error }: Props) => {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal" style={{ flexGrow: 5 }} />
        <div className="field-body">
          <div className="field">
            <span style={{ color: "red" }}>{error}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export { Error };