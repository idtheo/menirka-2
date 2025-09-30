// api/fetch.js
export default async function handler(req, res) {
  try {
    // fetch اصلی از frighdimi
    const response = await fetch("https://3t.thelasttoko.workers.dev/frighdimi");
    const rawData = await response.json();

    // تبدیل به قالب قدیمی market-data
    const marketData = {
      currency: [
        { name: "دلار", price: rawData.usd?.value_toman_number ?? 0 },
        { name: "یورو", price: rawData.eur?.value_toman ?? 0 },
        { name: "درهم امارات", price: rawData.aed?.value_toman ?? 0 } // اگر دارین
      ],
      gold: [
        { name: "طلای 18 عیار", price: rawData.gold18?.value_toman ?? 0 },
        { name: "Emami Coin", price: rawData.emami?.value_toman ?? 0 }, // اگر دارین
        { name: "Ounce Gold", price: rawData.ons?.value_usd ?? 0 }
      ],
      crypto: [
        { name: "Bitcoin", price: rawData.btc?.value_usd ?? 0 },
        { name: "Ethereum", price: rawData.eth?.value_usd ?? 0 },
        { name: "TON", price: rawData.ton?.value_usd ?? 0 },
        { name: "Tether", price: rawData.usdt?.value_toman ?? 0 } // اگر دارین
      ]
    };

    // برگرداندن JSON
    res.status(200).json(marketData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
