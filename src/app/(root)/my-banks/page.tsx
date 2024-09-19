import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.action';
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn) {
    console.error("Logged in iS NUll not Check it Again the backend")
    return 
  }
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox
        title='My Bank Accounts'
        subtext='Effortlessly manage your banking activites.'/>

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className='flex flex-wrap gap-6'>
            {accounts&&accounts.data.map((a:Account,idx:number)=>(
              <>
              <div key={idx}/>
              <BankCard
              account={a}
              key={accounts.id}
              userName={loggedIn?.firstName}
              showBalance={true}
              />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks