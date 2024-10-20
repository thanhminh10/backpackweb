import SectionHeader from '@/components/sectionHeader/SectionHeader'
import React from 'react'

function ChangePassword() {
  return (
    <div className='flex flex-col gap-6'>
        <SectionHeader 
          title='Tài khoản'
          suggestItem={true}
        />
    </div>
  )
}

export default ChangePassword