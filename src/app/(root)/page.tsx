import React from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalaceBox from "../../components/TotalBalaceBox";
import RightSidebar from "../../components/RightSidebar";
import { getLoggedInUser } from "../../lib/actions/user.action";
import {  getAccount, getAccounts } from "../../lib/actions/bank.action";
import RecentTransaction from "../../components/RecentTransaction";

const Home = async ({searchParams:{id, page}}:SearchParamProps) => {
  const currentPage = Number(page as string) || 1
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  
  if(!accounts) return;
  const accountData = accounts?.data
  const appwriteItemId = (id as string) || accountData?.appwriteItemId

  const account = await getAccount({appwriteItemId})

  console.log(
    accountData,
    account
  );
  
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalaceBox
            accounts={accountData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransaction
        accounts={accountData}
        transactions={account?.transaction}
        appwriteItemId={appwriteItemId}
        page = {currentPage}/>
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transaction}
        banks={accountData?.slice(0,2)}
      />
    </section>
  );
};

export default Home;