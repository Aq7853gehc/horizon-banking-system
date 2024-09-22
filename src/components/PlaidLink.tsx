"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "../lib/actions/user.action";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user]
  );
   const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);
  console.error("Plaid Link ", error);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => open()}
          className="plaidlink-ghost"
          variant={"ghost"}
        >
           <Image 
               src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            />
          <p className="text-[16px] hidden font-semibold text-black-1 xl:block">Add Account</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image
            src={"/icons/connect-bank.svg"}
            alt="Connect Bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-1">Connect Bank</p>
        </Button>
      )}
    </>
  );
};
export default PlaidLink;
