import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.action";

const Transfer = async() => {
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
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specdific details or notes related to payment transfer"
      />

      <section>
        <PaymentTransferForm accounts={accountsData}/>
      </section>
    </section>
  );
};
export default Transfer;
