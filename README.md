# GitQuest — Interactive Git Workshop

> **Learn Git by doing, not by reading.** A browser-based training environment with exercises, a live terminal sandbox, structured lessons, and a full command cheat sheet — all with zero setup required.

![GitQuest Screenshot](https://via.placeholder.com/900x500/0a0a10/6366f1?text=GitQuest+Screenshot)

---

## ✨ Features

| Feature | Description |
|---|---|
| **27 Exercises** | Beginner → Intermediate → Advanced missions with XP scoring and hints |
| **8 Lessons** | Structured tutorial covering Git fundamentals through advanced workflows |
| **Live Sandbox** | Free-form terminal with a real-time SVG commit graph and file tree |
| **60+ Commands** | Searchable cheat sheet organized into 10 categories |
| **Command Autocomplete** | Smart suggestions as you type in any terminal |
| **Dark / Light Mode** | Smooth animated theme toggle, preference saved locally |
| **Fully Responsive** | Works on phones, tablets, and desktops |
| **Zero Backend** | Runs entirely in the browser — no server, no account, no install |

---

## 🚀 Getting Started

### Option 1 — Open directly in a browser
```bash
git clone https://github.com/your-username/gitquest.git
cd gitquest
open index.html          # macOS
# or: xdg-open index.html  (Linux)
# or: start index.html     (Windows)
```
That's it. No `npm install`, no build step, no server needed.

### Option 2 — Serve locally (optional, for best experience)
```bash
# Python 3
python -m http.server 3000

# Node (npx)
npx serve .

# Then visit http://localhost:3000
```

---

## 🗂️ Project Structure

```
gitquest/
├── index.html      # All markup — modal, topbar, 6 tab panels
├── style.css       # Design system — themes, components, responsive breakpoints
├── script.js       # All logic — exercise data, sandbox simulation, UI, storage
└── README.md       # This file
```

The entire project is **three files**. No build tools, no bundler, no framework.

---

## 🧠 How the Sandbox Works

The sandbox simulates a Git repository entirely in memory. When you type `git commit`, a real commit object is created with a SHA, parent pointer, branch reference, and timestamp. The SVG commit graph re-renders after every command.

**Supported Git commands:**
`init` · `status` · `add` · `commit` · `log` · `branch` · `checkout` · `switch` · `merge` · `push` · `pull` · `fetch` · `stash` · `diff` · `remote` · `clone` · `reset` · `revert` · `rebase` · `cherry-pick` · `tag` · `show` · `blame` · `config` · `reflog` · `clean`

**Supported shell commands:**
`ls` · `cat` · `touch` · `mkdir` · `rm` · `echo` · `pwd` · `cd` · `clear`

---

## 📚 Tutorial Lessons

| # | Lesson | Topics |
|---|--------|--------|
| 1 | What is Git? | VCS concepts, Git vs GitHub, distributed model |
| 2 | Core Concepts | Working dir, staging area, repository, HEAD |
| 3 | Your First Repository | `init`, `status`, `add`, `commit`, `log` |
| 4 | Branching | Create, switch, name, delete branches |
| 5 | Merging & Conflicts | Fast-forward, merge commits, resolving conflicts |
| 6 | Remote Repositories | `remote`, `push`, `fetch`, `pull`, `clone` |
| 7 | Undoing Changes | `restore`, `reset` (3 modes), `revert`, `reflog` |
| 8 | Advanced Workflows | `rebase`, interactive rebase, `stash`, tags |

---

## 🎮 Exercise Tiers

**Beginner (9 exercises)**
Initialize a repo · Check status · Stage a file · Stage all · Make a commit · View log · Compact log · Set username · View config

**Intermediate (11 exercises)**
Create a branch · Switch branch · Create & switch · List branches · Merge · Delete branch · View diff · Stash · Stash pop · Add remote · List remotes

**Advanced (7 exercises)**
Push to remote · Pull from remote · Rebase · Hard reset · Revert · Create tag · Inspect commit

---

## 💾 Data Storage

All data is stored locally in your browser's `localStorage` — nothing is sent to any server.

| Key | Contents |
|-----|----------|
| `gq_player` | Your callsign |
| `gq_progress` | Completed exercises, hint usage, XP score |
| `gq_tut` | Tutorial lessons read |
| `gq_theme` | `"dark"` or `"light"` |
| `gq_visits_total` | Local visitor count |

---

## 🎨 Design System

- **Fonts** — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (UI) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (terminal/code)
- **Accent** — Indigo `#6366f1`
- **Difficulty colors** — Emerald (easy) · Amber (intermediate) · Red (advanced)
- **Dark bg** — `#0a0a10` · **Light bg** — `#f5f6fa`

---

## 🤝 Contributing

Contributions are welcome! Ideas for improvement:

- [ ] Add more advanced exercises (interactive rebase, cherry-pick, bisect)
- [ ] Multiplayer / real leaderboard via a lightweight backend
- [ ] Export progress as a PDF certificate
- [ ] VS Code extension version
- [ ] Localization / translations

**To contribute:**
1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Make your changes
4. Open a pull request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Free to use, fork, and build upon. If you use this in a workshop or course, a star ⭐ is always appreciated!

---

## 🙏 Acknowledgements

Built with ♥ for the developer community. Inspired by the countless people who asked "how do I learn Git properly?" — the answer is: by breaking things in a safe environment.

---

<p align="center">
  <a href="https://github.com/your-username/gitquest">⭐ Star this repo</a> ·
  <a href="https://github.com/your-username/gitquest/issues">🐛 Report a bug</a> ·
  <a href="https://github.com/your-username/gitquest/issues">💡 Request a feature</a>
</p>
