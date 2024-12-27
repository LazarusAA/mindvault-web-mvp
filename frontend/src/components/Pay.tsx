"use client";

import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

export const PayBlock = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendPayment = useCallback(async () => {
    try {
      const res = await fetch('/api/initiate-payment', {
        method: "POST",
      });

      const { id } = await res.json();
      
      const payload: PayCommandInput = {
        reference: id,
        to: "0x0c892815f0B058E69987920A23FBb33c834289cf",
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
          },
          {
            symbol: Tokens.USDCE,
            token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
          },
        ],
        description: "Watch this is a test",
      };
      
      if (MiniKit.isInstalled()) {
        return await MiniKit.commandsAsync.pay(payload);
      }
      return null;
    } catch (error: unknown) {
      console.error("Error sending payment", error);
      return null;
    }
  }, []);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      if (!MiniKit.isInstalled()) {
        console.error("MiniKit is not installed");
        return;
      }
      const sendPaymentResponse = await sendPayment();
      const response = sendPaymentResponse?.finalPayload;
      if (!response) return;

      if (response.status === "success") {
        const res = await fetch('/api/confirm-payment', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: response }),
        });
        const payment = await res.json();
        if (payment.success) {
          console.log("SUCCESS!");
        } else {
          console.log("FAILED!");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Pay Block</h1>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors" 
        onClick={handlePay}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Test Payment"}
      </button>
    </div>
  );
}; 