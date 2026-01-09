export default async function Page() {
  const API_KEY = process.env.GOLDRUSH_API_KEY;

  const chain = "base"; // Monad not live → Base is acceptable for demo
  const wallet = "0x4200000000000000000000000000000000000006";

  const res = await fetch(
    https://api.covalenthq.com/v1/${chain}/address/${wallet}/balances_v2/,
    {
      headers: {
        Authorization: Bearer ${API_KEY},
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const items = data?.data?.items || [];

  return (
    <main style={{ padding: 32 }}>
      <h1>MonView – Wallet Intelligence</h1>
      <p>Powered by GoldRush API</p>

      <h3>Wallet: {wallet}</h3>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Balance</th>
            <th>USD Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((token: any) => (
            <tr key={token.contract_address}>
              <td>{token.contract_ticker_symbol}</td>
              <td>{token.balance}</td>
              <td>${token.quote?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
