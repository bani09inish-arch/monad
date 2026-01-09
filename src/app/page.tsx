type BlockItem = {
  height?: number;
  hash?: string;
  signed_at?: string;
  gas_used?: number;
  miner_address?: string;
};

type BalanceItem = {
  contract_address: string;
  contract_name?: string;
  contract_ticker_symbol?: string;
  contract_decimals?: number;
  logo_url?: string;
  quote?: number;
  quote_rate?: number;
  balance?: string;
};

const CHAIN = "eth-mainnet";

// Put ANY real wallet here to demo balances (this one is just a placeholder)
const DEMO_WALLET = "0x0000000000000000000000000000000000000000";

function short(addr: string) {
  return addr ? ${addr.slice(0, 6)}…${addr.slice(-4)} : "-";
}
async function grFetch(url: string) {
  const key = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_COVALENT_API_KEY env var");

  const res = await fetch(url, {
    headers: { Authorization: Bearer ${key} },
    cache: "no-store"
  });

  const json = await res.json();
  return json;
}

export default async function Page() {
  // 1) Latest block (REAL)
  const blockJson = await grFetch(
    https://api.covalenthq.com/v1/${CHAIN}/block_v2/latest/
  );
  const block: BlockItem | undefined = blockJson?.data?.items?.[0];

  // 2) Wallet balances (REAL)
  const balancesJson = await grFetch(
    https://api.covalenthq.com/v1/${CHAIN}/address/${DEMO_WALLET}/balances_v2/
  );
  const items: BalanceItem[] = balancesJson?.data?.items || [];
  const top = items
    .filter((i) => typeof i.quote === "number" && (i.quote as number) > 0)
    .sort((a, b) => (b.quote  0) - (a.quote  0))
    .slice(0, 10);
  const totalUsd = top.reduce((sum, t) => sum + (t.quote || 0), 0);

  return (
    <main style={{ padding: 28, fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}>MonTrade — Monad-ready Intelligence (GoldRush)</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>
        This is <b>REAL</b> on-chain data fetched via GoldRush (Covalent) APIs.
        Monad indexing is not live yet, so this runs on <b>Ethereum Mainnet</b> and is Monad-ready by design.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(240px, 1fr))", gap: 12, marginTop: 16 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Chain</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{CHAIN}</div>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Latest Block</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{block?.height ?? "—"}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            hash: {short(block?.hash)}
          </div>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Demo Wallet Portfolio (Top 10)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>${totalUsd.toFixed(2)}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            wallet: {short(DEMO_WALLET)}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 16 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Top Token Holdings (USD)</h3>
          {top.length === 0 ? (
            <p style={{ opacity: 0.7 }}>
              No priced tokens found for the demo wallet. Replace <code>DEMO_WALLET</code> with any active Ethereum wallet.
            </p>
          ) : (
            <div style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden" }}>
              {top.map((t) => (
                <div
                  key={t.contract_address}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottom: "1px solid #eee",
                    alignItems: "center"
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {t.logo_url ? <img src={t.logo_url} width={22} height={22} alt="" /> : <div style={{ width: 22 }} />}
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.contract_ticker_symbol || "—"}</div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>{t.contract_name || short(t.contract_address)}</div>
                    </div>
                  </div>

                  <div style={{ fontWeight: 800 }}>
                    {typeof t.quote === "number" ? $${t.quote.toFixed(2)} : "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>
            Data source: GoldRush Foundational API (balances + pricing).
          </p>
        </div>
      </div>

      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 14 }}>
        Monad note: GoldRush shows real data for indexed chains. Once Monad indexing is available, switching is a single config change.
      </p>
    </main>
  );
}

