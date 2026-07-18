# Money Tracker (Web / iPhone)

The phone version of Money Tracker - a single-page web app with the same dark
design as the Windows app. Add it to your iPhone home screen and it works like
a regular app, including offline.

Sign in with the same account here and in the Windows app and your balance and
history stay in sync on both, usually within a few seconds. Entries are stored
under your account in a private database protected by row-level security - the
keys visible in this public code identify the database but grant no access to
anyone's data. You can also tap "Use without an account" to keep everything on
the phone only.

## Add it to your iPhone

1. Open the app's URL in **Safari** on your iPhone.
2. Tap the **Share** button (square with an up arrow).
3. Tap **Add to Home Screen**, then **Add**.

You'll get a green **$** icon that opens the tracker full-screen.

**Important:** iOS keeps *separate* data for the Safari tab and the
home-screen app. So:

- Add it to your Home Screen **before** entering real data (or use Export in
  Safari and Import inside the home-screen app to move entries over).
- Open the icon once **while online** so offline support gets installed.
- Do your day-to-day tracking **from the icon**, not the Safari tab.

## Your data

- Everything is stored **on your phone** (browser local storage) - nothing is
  uploaded anywhere.
- Tap **Export backup** now and then to save a JSON backup file (it lands in
  your Files app / iCloud Drive). **Import backup** restores one.
- The backup uses the exact same JSON format as the Windows app's
  `MoneyTracker.data.json`, so you can move data between phone and PC manually
  if you ever want to.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app (HTML + CSS + JavaScript) |
| `manifest.webmanifest` | App name/icon/color for "Add to Home Screen" |
| `sw.js` | Service worker - makes it work offline |
| `icon-*.png` | App icons |
