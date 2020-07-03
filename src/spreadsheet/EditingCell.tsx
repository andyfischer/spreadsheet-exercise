
import React, { useState } from 'react'

interface Props {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

export default function EditingCell({value, onChange, onSubmit}: Props) {

    return <input
      autoFocus
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
