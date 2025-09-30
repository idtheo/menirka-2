// api/fetch.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://3t.thelasttoko.workers.dev/frighdimi");
    const rawData = await response.json();

    // برگرداندن دقیقاً همون چیزی که هست
    res.status(200).json(rawData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
