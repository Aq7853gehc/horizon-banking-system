import HeaderBox from "@/components/HeaderBox";
import TransactionTable from "@/components/TransactionTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    console.error("Logged in iS NUll not Check it Again the backend");
    return;
  }
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });
  // console.log("Logged In",loggedIn)
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  // console.log("Account Details",accountsData)
  // console.log("Accounts",account)
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your banks details and transactions."
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●
              <span className="text-16">{account?.data.mask}</span>
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 font-bold text-center">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className={"flex w-full flex-col gap-5 "}>
          <TransactionTable transactions={account?.transactions} />
        </section>
      </div>
    </section>
  );
};

export default TransactionHistory;
