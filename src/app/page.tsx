"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>MonTrade — Monad Intelligence</h1>
      <p>Powered by GoldRush API</p>

      {!data && <p>Loading real on-chain data…</p>}

      {data && (
        <>
          <h3>Wallet</h3>
          <p>{data.wallet}</p>

          <h3>Total USD Value</h3>
          <p>${data.totalUsd.toFixed(2)}</p>

          <h3>Tokens</h3>
          <ul>
            {data.tokens.map((t: any) => (
              <li key={t.contract_address}>
                {t.contract_ticker_symbol} — $
                {t.quote?.toFixed(2) ?? "0.00"}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

