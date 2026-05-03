import { useState, useEffect } from "react"

/**
 * Resolves a real medicine image from Wikipedia by drug name.
 * - Strips dosage suffixes ("500mg", "10ml", etc.) before searching
 * - In-memory cache prevents duplicate requests for the same name
 * - Returns null if Wikipedia has no image (caller should show fallback)
 */

// Module-level cache so it persists across component renders
const imageCache = new Map<string, string | null>()

function cleanDrugName(name: string): string {
  return name
    .replace(/\s*\d+[\s.]*(mg|mcg|ml|g|iu|tabs?|cap\w*|syrup|drops?|spray|cream|gel|ointment)\b.*/i, "")
    .replace(/\s+(tablets?|capsules?|injection|solution|suspension)\b.*/i, "")
    .trim()
}

export function useMedicineImage(name: string): string | null {
  const key = cleanDrugName(name).toLowerCase()
  const [url, setUrl] = useState<string | null>(imageCache.get(key) ?? null)

  useEffect(() => {
    if (!name) return

    // Already in cache (even if null — means not found)
    if (imageCache.has(key)) {
      setUrl(imageCache.get(key) ?? null)
      return
    }

    const cleanName = cleanDrugName(name)
    if (!cleanName) return

    let cancelled = false

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`,
      { headers: { Accept: "application/json" } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        // Upscale thumbnail to 480px wide for card quality
        const raw: string | undefined = data?.thumbnail?.source
        const imgUrl = raw
          ? raw.replace(/\/\d+px-/, "/480px-")
          : null
        imageCache.set(key, imgUrl)
        setUrl(imgUrl)
      })
      .catch(() => {
        if (!cancelled) {
          imageCache.set(key, null)
          setUrl(null)
        }
      })

    return () => { cancelled = true }
  }, [key, name])

  return url
}
