
import React from 'react'

interface Props {
    key: string
}

export default function EditingCell({key}: Props) {
    return <input
      key={key}
      type="text" />
}
