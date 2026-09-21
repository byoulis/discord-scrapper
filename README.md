# Discord Scrapper

Two scrapers I wrote for fun. One grabs random accounts, the other lets you filter by a badge you pick. That's it.

> ⚠️ **Heads up:** Scraping accounts + using self-bots = against [Discord's ToS](https://discord.com/terms). You *will* get banned if you're not careful. This is for **educational purposes only**. Don't blame me if things go wrong.

## What's inside

```
discord-scrapper/
├── scrapper_account_random/    # grabs random accounts
├── scrapper_speed_badges/      # grabs accounts with a badge you choose
└── README.md
```

### `scrapper_account_random`

Does exactly what it says. Pulls random Discord accounts. No filters, no fuss.

### `scrapper_speed_badges`

Same idea, but you tell it which badge you want (Early Supporter, Bug Hunter, HypeSquad, whatever), and it only grabs accounts with that badge. Faster and more targeted.

## What you need

- [Node.js](https://nodejs.org/) (or Python — depends on the script inside each folder)
- A Discord user token for auth
- A working internet connection

> 💡 Each subfolder has its own setup. Check for a `package.json`, `requirements.txt`, or a config file before running anything.

## Getting started

```bash
git clone https://github.com/byoulis/discord-scrapper.git
cd discord-scrapper
```

Then pick your poison:

```bash
cd scrapper_account_random
# or
cd scrapper_speed_badges
```

Install whatever's needed, drop in your token, and run it.

## Getting your token

> 🔑 Open Discord in your browser, hit `F12`, go to the Network tab, send a message, and look for the `authorization` header. **Don't share it. Ever.**

## If something breaks

| What you see                     | What's probably wrong                              |
|----------------------------------|----------------------------------------------------|
| `Error: 401 Unauthorized`        | Token's wrong or expired.                          |
| `Error: 429 Too Many Requests`   | You're hammering the API. Slow down.               |
| Script closes instantly          | Missing deps, or wrong Node/Python version.        |
| Nothing comes back               | Filter's too strict, or the badge ID is wrong.     |

## Don't be a jerk

This exists so you can learn how this stuff works. Using it to harass people, spam, or do anything shady is:

- Against Discord's ToS → **ban hammer**.
- Probably illegal where you live.

Don't scrape people who didn't sign up for it. I'm not responsible if you do.

## License

MIT. Go wild. Just don't come crying to me when your account gets banned.
