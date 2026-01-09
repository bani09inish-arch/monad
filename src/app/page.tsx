"use client";

export default function Page() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>MonTrade — Monad Intelligence</h1>
      <p>
        Built using <b>GoldRush (Covalent) APIs</b>
      </p>

      <ul>
        <li>✅ Wallet balances via GoldRush Foundational API</li>
        <li>✅ Transactions via GoldRush Transaction API</li>
        <li>✅ Prices via GoldRush Pricing API</li>
        <li>✅ Ready for Streaming (OHLCV / walletTxs)</li>
      </ul>

      <p style={{ marginTop: 20 }}>
        Status: <b>Build-safe, deploy-safe</b>
      </p>
    </main>
  );
}

