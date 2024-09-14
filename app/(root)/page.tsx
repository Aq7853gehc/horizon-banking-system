import React from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalaceBox from "../../components/TotalBalaceBox";
import RightSidebar from "../../components/RightSidebar";
import { getLoggedInUser } from "../../lib/actions/user.action";
import {  getAccount, getAccounts } from "../../lib/actions/bank.action";

const Home = async ({searchParams:{id, page}}:SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  
  if(!accounts) return;
  const accountData = accounts?.data
  const appwriteItemId = (id as string) || accountData?.appwriteItemId

  const account = await getAccount({appwriteItemId})

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalaceBox
            accounts={accountData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 1243.9 }]}
      />
    </section>
  );
};

export default Home;
