import React, { ReactNode } from 'react'

const ErrorMsg = ({ children }: { children: ReactNode }) => {
  return (
    <p className='animate__animated animate__fadeIn text-[10px] text-red-500 text-end'>
      {children}
    </p>
  )
}

export default ErrorMsg
