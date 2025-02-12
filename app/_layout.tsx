import { Stack } from 'expo-router'
import React from 'react'
import TokenContextProvider from '../src/context/userContext'

function _layout() {
  return (
    <TokenContextProvider>
      <Stack></Stack>
    </TokenContextProvider>
  )
}

export default _layout