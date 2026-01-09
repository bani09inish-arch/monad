"use client";

import { useEffect, useState } from "react";

const API_KEY = "cqt_rQrhHxD6VkKyQGCWggHJHB4DmjbD";
const CHAIN = "monad-mainnet";

// Use ANY real Monad wallet (you can replace later)
const WALLET = "0x0000000000000000000000000000000000000000";

export default function Page() {
  const [balances, setBalances] = useState<any[]>([]);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const headers = {
          Authorization: Bearer ${API_KEY},
        };

        // 1️⃣ Token balances
        const balRes = await fetch(
          https://api.covalenthq.com/v1/${CHAIN}/address/${WALLET}/balances_v2/,
          { headers }
        );
        const balJson = await balRes.json();
        setBalances(balJson.data.items || []);

        // 2️⃣ Recent transactions
        const txRes = await fetch(
          https://api.covalenthq.com/v1/${CHAIN}/address/${WALLET}/transactions_v3/,
          { headers }
        );
        const txJson = await txRes.json();
        setTxs(txJson.data.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>MonTrade</h1>
      <p>Monad intelligence powered by GoldRush API</p>

      {loading && <p>Loading real on-chain data…</p>}

      <h2>Wallet Balances</h2>
      <ul>
        {balances.slice(0, 5).map((t, i) => (
          <li key={i}>
            {t.contract_ticker_symbol}: {t.balance} (
            ${t.quote?.toFixed(2)})
          </li>
        ))}
      </ul>

      <h2>Recent Transactions</h2>
      <ul>
        {txs.slice(0, 5).map((tx, i) => (
          <li key={i}>
            {tx.tx_hash.slice(0, 10)}… — $
            {tx.value_quote?.toFixed(2)}
          </li>
        ))}
      </ul>

      <p>
        ✅ Real balances <br />
        ✅ Real transactions <br />
        ✅ Real USD pricing
      </p>
    </main>
  );
}
