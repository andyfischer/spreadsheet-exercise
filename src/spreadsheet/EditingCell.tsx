
import React, { useState } from 'react'

interface Props {
    cellkey: string
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

export default function EditingCell({cellkey, value, onChange, onSubmit}: Props) {

    return <input
      autoFocus
      key={cellkey}
      type="text"
      value={value}
      onChange={(evt) => {
          onChange(evt.target.value);
      }}
      onKeyPress={(evt) => {
          if (evt.key === 'Enter')
              onSubmit();
      }}
      />
}
