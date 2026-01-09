import { NextResponse } from "next/server";

const API_KEY = process.env.COVALENT_API_KEY!;
const CHAIN = "base-mainnet"; // Monad not live yet, Base is acceptable for demo
const WALLET = "0x0000000000000000000000000000000000000000";

export async function GET() {
  const url = `https://api.covalenthq.com/v1/${CHAIN}/address/${WALLET}/balances_v2/`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const json = await res.json();

  const items = json.data.items || [];

  const totalUsd = items.reduce(
    (sum: number, t: any) => sum + (t.quote || 0),
    0
  );

  return NextResponse.json({
    wallet: WALLET,
    totalUsd,
    tokens: items,
  });
}
