export default async function Page() {
  const API_KEY = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY;

  if (!API_KEY) {
    return <div>Missing API Key</div>;
  }

  const chain = "monad-testnet"; // change if needed
  const wallet = "0x0000000000000000000000000000000000000000"; // demo wallet

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

  return (
    <main style={{ padding: 40 }}>
      <h1>MonTrade</h1>
      <p>Powered by GoldRush API</p>

      <pre style={{ fontSize: 12 }}>
        {JSON.stringify(data?.data?.items?.slice(0, 3), null, 2)}
      </pre>
    </main>
  );
}
