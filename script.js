/* ═══════════════════════════════════════════════════════════
   GitQuest · script.js
   1. EXERCISE DATA  (27 exercises across 3 difficulty tiers)
   2. CHEAT SHEET DATA
   3. STORAGE
   4. SANDBOX SIMULATION  (in-memory fs + git state machine)
   5. TERMINAL ENGINE
   6. UI — Exercises
   7. UI — Cheat Sheet
   8. UI — Tabs
   9. UI — Toast / Badge
  10. INIT
═══════════════════════════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════════════════
   1. EXERCISE DATA
══════════════════════════════════════════════ */
const EXERCISES = [
  /* ── BEGINNER ── */
  {
    id: 1, difficulty: 'easy',
    title: 'Initialize a Repository',
    description: 'Create a brand-new Git repository in the current folder so Git can start tracking changes.',
    hint: 'Think of the command that creates a hidden <code>.git</code> directory inside your project folder.',
    command: 'git init', altCommands: [],
    points: 10
  },
  {
    id: 2, difficulty: 'easy',
    title: 'Check Repository Status',
    description: 'See which files are staged, unstaged, or untracked in your working directory.',
    hint: 'The word "status" is in the command — use <code>git</code> followed by that word.',
    command: 'git status', altCommands: ['git status -s', 'git status --short'],
    points: 10
  },
  {
    id: 3, difficulty: 'easy',
    title: 'Stage a Specific File',
    description: 'Add <code>README.txt</code> to the staging area so it will be included in the next commit.',
    hint: 'Use <code>git add</code> followed by the exact filename.',
    command: 'git add README.txt', altCommands: [],
    points: 10
  },
  {
    id: 4, difficulty: 'easy',
    title: 'Stage All Changes',
    description: 'Stage every modified and untracked file in one go, so nothing is left out of the next commit.',
    hint: 'A single dot <code>.</code> means "everything in this directory".',
    command: 'git add .', altCommands: ['git add -A', 'git add --all'],
    points: 10
  },
  {
    id: 5, difficulty: 'easy',
    title: 'Make Your First Commit',
    description: 'Save a snapshot of the staged changes with the message <em>"Initial commit"</em>.',
    hint: 'Use <code>git commit</code> with the <code>-m</code> flag and wrap your message in quotes.',
    command: 'git commit -m "Initial commit"',
    altCommands: ["git commit -m 'Initial commit'"],
    points: 15
  },
  {
    id: 6, difficulty: 'easy',
    title: 'View Commit History',
    description: 'Show the full list of commits on the current branch, including author and date.',
    hint: 'Think of a three-letter word meaning "record" or "history".',
    command: 'git log', altCommands: ['git log --all', 'git log --graph'],
    points: 10
  },
  {
    id: 7, difficulty: 'easy',
    title: 'Compact Log View',
    description: 'Show one commit per line — just the short SHA and the commit message.',
    hint: 'Append <code>--oneline</code> to your log command.',
    command: 'git log --oneline', altCommands: ['git log --oneline --all'],
    points: 10
  },
  {
    id: 8, difficulty: 'easy',
    title: 'Set Your Username',
    description: 'Configure your global Git username to <em>"Student"</em> so commits are attributed to you.',
    hint: 'Use <code>git config --global user.name</code> followed by your name in quotes.',
    command: 'git config --global user.name "Student"',
    altCommands: ["git config --global user.name 'Student'"],
    points: 10
  },
  {
    id: 9, difficulty: 'easy',
    title: 'View Configuration',
    description: 'List all current Git configuration values — names, emails, and settings.',
    hint: 'Use <code>git config</code> with the <code>--list</code> flag.',
    command: 'git config --list', altCommands: ['git config -l'],
    points: 8
  },

  /* ── INTERMEDIATE ── */
  {
    id: 10, difficulty: 'intermediate',
    title: 'Create a Branch',
    description: 'Create a new branch called <code>feature</code> without switching to it yet.',
    hint: 'Use <code>git branch</code> followed by the new branch name.',
    command: 'git branch feature', altCommands: [],
    points: 12
  },
  {
    id: 11, difficulty: 'intermediate',
    title: 'Switch to a Branch',
    description: 'Switch your working directory to the <code>feature</code> branch.',
    hint: 'Use either <code>git checkout</code> or the newer <code>git switch</code> command.',
    command: 'git checkout feature', altCommands: ['git switch feature'],
    points: 12
  },
  {
    id: 12, difficulty: 'intermediate',
    title: 'Create & Switch in One Step',
    description: 'Create a new branch called <code>hotfix</code> and switch to it immediately.',
    hint: 'Combine branch creation and switching with <code>checkout -b</code> or <code>switch -c</code>.',
    command: 'git checkout -b hotfix', altCommands: ['git switch -c hotfix'],
    points: 15
  },
  {
    id: 13, difficulty: 'intermediate',
    title: 'List All Branches',
    description: 'Show all local branches, including which one you are currently on.',
    hint: 'Run <code>git branch</code> with no extra arguments, or add <code>-a</code> to see remote branches too.',
    command: 'git branch', altCommands: ['git branch -a', 'git branch --list', 'git branch -v'],
    points: 10
  },
  {
    id: 14, difficulty: 'intermediate',
    title: 'Merge a Branch',
    description: 'While on <code>main</code>, merge the <code>feature</code> branch into it.',
    hint: 'Use <code>git merge</code> followed by the name of the branch you want to bring in.',
    command: 'git merge feature', altCommands: ['git merge feature --no-ff'],
    points: 15
  },
  {
    id: 15, difficulty: 'intermediate',
    title: 'Delete a Branch',
    description: 'Safely delete the <code>feature</code> branch after it has been merged.',
    hint: 'Use <code>git branch</code> with the <code>-d</code> flag.',
    command: 'git branch -d feature', altCommands: ['git branch --delete feature'],
    points: 12
  },
  {
    id: 16, difficulty: 'intermediate',
    title: 'View Unstaged Changes',
    description: 'Show a diff of changes in your working directory that have NOT yet been staged.',
    hint: 'The command <code>git diff</code> with no arguments shows unstaged changes.',
    command: 'git diff', altCommands: ['git diff HEAD'],
    points: 12
  },
  {
    id: 17, difficulty: 'intermediate',
    title: 'Stash Working Changes',
    description: 'Temporarily save all uncommitted changes so you can work on something else.',
    hint: 'Think of a hiding spot for changes — the command is <code>git stash</code>.',
    command: 'git stash', altCommands: ['git stash push', 'git stash save'],
    points: 15
  },
  {
    id: 18, difficulty: 'intermediate',
    title: 'Restore Stashed Changes',
    description: 'Bring back the most recently stashed changes and remove them from the stash.',
    hint: 'Use <code>git stash pop</code> to apply and remove the latest stash entry.',
    command: 'git stash pop', altCommands: ['git stash apply'],
    points: 12
  },
  {
    id: 19, difficulty: 'intermediate',
    title: 'Add a Remote',
    description: 'Link your local repo to a remote called <code>origin</code> at <code>https://github.com/user/repo.git</code>.',
    hint: 'Use <code>git remote add</code> followed by the name and URL.',
    command: 'git remote add origin https://github.com/user/repo.git',
    altCommands: [],
    points: 15
  },
  {
    id: 20, difficulty: 'intermediate',
    title: 'List Remotes',
    description: 'Show all configured remotes and their fetch/push URLs.',
    hint: 'Use <code>git remote</code> with the verbose flag <code>-v</code>.',
    command: 'git remote -v', altCommands: ['git remote'],
    points: 10
  },

  /* ── ADVANCED ── */
  {
    id: 21, difficulty: 'advanced',
    title: 'Push to Remote',
    description: 'Push your local <code>main</code> branch to the remote named <code>origin</code>.',
    hint: 'Use <code>git push</code> followed by the remote name and the branch name.',
    command: 'git push origin main',
    altCommands: ['git push', 'git push -u origin main', 'git push origin master'],
    points: 18
  },
  {
    id: 22, difficulty: 'advanced',
    title: 'Pull from Remote',
    description: 'Fetch changes from <code>origin</code> and automatically merge them into your current branch.',
    hint: 'This is the opposite of push — it <em>pulls</em> remote changes in.',
    command: 'git pull origin main',
    altCommands: ['git pull', 'git pull origin master'],
    points: 18
  },
  {
    id: 23, difficulty: 'advanced',
    title: 'Rebase onto Main',
    description: 'Rebase the current branch on top of <code>main</code> to create a cleaner, linear history.',
    hint: 'Use <code>git rebase</code> followed by the branch you want to rebase onto.',
    command: 'git rebase main', altCommands: ['git rebase -i main'],
    points: 22
  },
  {
    id: 24, difficulty: 'advanced',
    title: 'Hard Reset to HEAD',
    description: 'Discard ALL uncommitted changes in both staging and the working directory, reverting to the last commit.',
    hint: 'Use <code>git reset</code> with the <code>--hard</code> flag targeting <code>HEAD</code>.',
    command: 'git reset --hard HEAD',
    altCommands: ['git reset --hard'],
    points: 20
  },
  {
    id: 25, difficulty: 'advanced',
    title: 'Revert the Last Commit',
    description: 'Create a new commit that undoes the changes from the most recent commit, keeping history intact.',
    hint: 'Use <code>git revert</code> with <code>HEAD</code> to target the latest commit.',
    command: 'git revert HEAD', altCommands: [],
    points: 22
  },
  {
    id: 26, difficulty: 'advanced',
    title: 'Create a Version Tag',
    description: 'Tag the current commit with the version label <code>v1.0.0</code>.',
    hint: 'Use <code>git tag</code> followed by the tag name.',
    command: 'git tag v1.0.0',
    altCommands: ['git tag -a v1.0.0 -m "v1.0.0"'],
    points: 18
  },
  {
    id: 27, difficulty: 'advanced',
    title: 'Inspect the Latest Commit',
    description: 'Display the full details and diff of the most recent commit on the current branch.',
    hint: 'Use <code>git show</code> with <code>HEAD</code> to inspect the latest commit.',
    command: 'git show HEAD', altCommands: ['git show'],
    points: 15
  }
];

const DIFFICULTY_ORDER = ['easy', 'intermediate', 'advanced'];
const DIFFICULTY_LABELS = { easy: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
const TOTAL_XP = EXERCISES.reduce((s, e) => s + e.points, 0);

/* ══════════════════════════════════════════════
   2. CHEAT SHEET DATA
══════════════════════════════════════════════ */
const CHEATSHEET = [
  {
    category: 'Setup & Configuration',
    commands: [
      { cmd: 'git config --global user.name "Name"', desc: 'Set your global author name' },
      { cmd: 'git config --global user.email "e@x.com"', desc: 'Set your global author email' },
      { cmd: 'git config --list', desc: 'List all configuration values' },
      { cmd: 'git config --global core.editor "code"', desc: 'Set VS Code as default editor' },
      { cmd: 'git config --global init.defaultBranch main', desc: 'Set default branch name to main' },
    ]
  },
  {
    category: 'Creating & Cloning',
    commands: [
      { cmd: 'git init', desc: 'Initialize a new local repository' },
      { cmd: 'git init <directory>', desc: 'Create a new repo in a specific folder' },
      { cmd: 'git clone <url>', desc: 'Clone a remote repository locally' },
      { cmd: 'git clone <url> <dir>', desc: 'Clone into a specific directory name' },
    ]
  },
  {
    category: 'Staging & Snapshots',
    commands: [
      { cmd: 'git status', desc: 'Show working tree status' },
      { cmd: 'git add <file>', desc: 'Stage a specific file' },
      { cmd: 'git add .', desc: 'Stage all changes in current directory' },
      { cmd: 'git add -p', desc: 'Interactively stage chunks of a file' },
      { cmd: 'git commit -m "msg"', desc: 'Commit staged changes with a message' },
      { cmd: 'git commit --amend', desc: 'Amend the most recent commit' },
      { cmd: 'git commit --amend --no-edit', desc: 'Amend commit without changing message' },
      { cmd: 'git restore <file>', desc: 'Discard working directory changes in a file' },
      { cmd: 'git restore --staged <file>', desc: 'Unstage a file (keep changes)' },
      { cmd: 'git rm <file>', desc: 'Remove a file from tracking and disk' },
      { cmd: 'git rm --cached <file>', desc: 'Untrack a file but keep it on disk' },
      { cmd: 'git mv <old> <new>', desc: 'Rename or move a tracked file' },
    ]
  },
  {
    category: 'Inspection & Comparison',
    commands: [
      { cmd: 'git log', desc: 'Show commit history' },
      { cmd: 'git log --oneline', desc: 'Compact one-commit-per-line view' },
      { cmd: 'git log --oneline --graph', desc: 'Log with ASCII branch graph' },
      { cmd: 'git log -p', desc: 'Show patches (diffs) with each commit' },
      { cmd: 'git log --author="name"', desc: 'Filter commits by author' },
      { cmd: 'git log --since="2 weeks ago"', desc: 'Filter commits by date' },
      { cmd: 'git diff', desc: 'Show unstaged changes' },
      { cmd: 'git diff --staged', desc: 'Show staged changes (vs last commit)' },
      { cmd: 'git diff <branch1> <branch2>', desc: 'Compare two branches' },
      { cmd: 'git show <commit>', desc: 'Show a specific commit and its diff' },
      { cmd: 'git show HEAD', desc: 'Show the latest commit' },
      { cmd: 'git blame <file>', desc: 'Show who last modified each line' },
    ]
  },
  {
    category: 'Branching & Merging',
    commands: [
      { cmd: 'git branch', desc: 'List all local branches' },
      { cmd: 'git branch -a', desc: 'List local and remote branches' },
      { cmd: 'git branch <name>', desc: 'Create a new branch' },
      { cmd: 'git branch -d <name>', desc: 'Delete a merged branch' },
      { cmd: 'git branch -D <name>', desc: 'Force-delete a branch (even if unmerged)' },
      { cmd: 'git branch -m <old> <new>', desc: 'Rename a branch' },
      { cmd: 'git checkout <branch>', desc: 'Switch to an existing branch' },
      { cmd: 'git checkout -b <branch>', desc: 'Create and switch to new branch' },
      { cmd: 'git switch <branch>', desc: 'Switch to branch (modern syntax)' },
      { cmd: 'git switch -c <branch>', desc: 'Create and switch (modern syntax)' },
      { cmd: 'git merge <branch>', desc: 'Merge a branch into the current one' },
      { cmd: 'git merge --no-ff <branch>', desc: 'Merge with a merge commit always' },
      { cmd: 'git merge --abort', desc: 'Abort an in-progress merge' },
    ]
  },
  {
    category: 'Stashing',
    commands: [
      { cmd: 'git stash', desc: 'Stash all uncommitted changes' },
      { cmd: 'git stash push -m "msg"', desc: 'Stash with a descriptive message' },
      { cmd: 'git stash list', desc: 'List all stash entries' },
      { cmd: 'git stash pop', desc: 'Apply & remove the most recent stash' },
      { cmd: 'git stash apply stash@{n}', desc: 'Apply a specific stash without removing' },
      { cmd: 'git stash drop stash@{n}', desc: 'Delete a specific stash entry' },
      { cmd: 'git stash clear', desc: 'Remove all stash entries' },
      { cmd: 'git stash branch <name>', desc: 'Create branch from stash' },
    ]
  },
  {
    category: 'Remotes & Collaboration',
    commands: [
      { cmd: 'git remote', desc: 'List configured remotes' },
      { cmd: 'git remote -v', desc: 'List remotes with their URLs' },
      { cmd: 'git remote add <name> <url>', desc: 'Add a new remote' },
      { cmd: 'git remote remove <name>', desc: 'Remove a remote' },
      { cmd: 'git remote rename <old> <new>', desc: 'Rename a remote' },
      { cmd: 'git fetch', desc: 'Download changes without merging' },
      { cmd: 'git fetch <remote>', desc: 'Fetch from a specific remote' },
      { cmd: 'git pull', desc: 'Fetch and merge from tracking remote' },
      { cmd: 'git pull <remote> <branch>', desc: 'Pull from explicit remote/branch' },
      { cmd: 'git push <remote> <branch>', desc: 'Push branch to remote' },
      { cmd: 'git push -u origin <branch>', desc: 'Push and set upstream tracking' },
      { cmd: 'git push --force-with-lease', desc: 'Force push safely (fail if diverged)' },
      { cmd: 'git push origin --delete <branch>', desc: 'Delete a remote branch' },
    ]
  },
  {
    category: 'Rewriting History',
    commands: [
      { cmd: 'git rebase <branch>', desc: 'Rebase current branch onto another' },
      { cmd: 'git rebase -i HEAD~n', desc: 'Interactive rebase for last n commits' },
      { cmd: 'git rebase --abort', desc: 'Abort an in-progress rebase' },
      { cmd: 'git rebase --continue', desc: 'Continue after resolving conflicts' },
      { cmd: 'git cherry-pick <commit>', desc: 'Apply a specific commit to current branch' },
      { cmd: 'git cherry-pick <c1>..<c2>', desc: 'Apply a range of commits' },
      { cmd: 'git commit --amend', desc: 'Rework the most recent commit' },
    ]
  },
  {
    category: 'Undoing Changes',
    commands: [
      { cmd: 'git revert <commit>', desc: 'Create a new commit that undoes a commit' },
      { cmd: 'git revert HEAD', desc: 'Revert the most recent commit' },
      { cmd: 'git reset HEAD~1', desc: 'Undo last commit, keep changes staged' },
      { cmd: 'git reset --soft HEAD~1', desc: 'Undo commit but keep changes staged' },
      { cmd: 'git reset --mixed HEAD~1', desc: 'Undo commit, unstage changes' },
      { cmd: 'git reset --hard HEAD', desc: 'Discard all uncommitted changes' },
      { cmd: 'git reset --hard <commit>', desc: 'Reset branch to a specific commit' },
      { cmd: 'git clean -fd', desc: 'Delete untracked files and directories' },
      { cmd: 'git reflog', desc: 'Show history of HEAD movements' },
    ]
  },
  {
    category: 'Tags',
    commands: [
      { cmd: 'git tag', desc: 'List all tags' },
      { cmd: 'git tag <name>', desc: 'Create a lightweight tag at HEAD' },
      { cmd: 'git tag -a <name> -m "msg"', desc: 'Create an annotated tag' },
      { cmd: 'git tag -d <name>', desc: 'Delete a local tag' },
      { cmd: 'git push origin <tag>', desc: 'Push a tag to remote' },
      { cmd: 'git push origin --tags', desc: 'Push all tags to remote' },
    ]
  }
];

/* ══════════════════════════════════════════════
   3. STORAGE
══════════════════════════════════════════════ */
const Storage = {
  getPlayer:    ()    => localStorage.getItem('gq_player') || '',
  setPlayer:    name  => localStorage.setItem('gq_player', name),
  getProgress:  () => {
    try { return JSON.parse(localStorage.getItem('gq_progress') || '{"completed":[],"hintUsed":[],"score":0}'); }
    catch { return { completed:[], hintUsed:[], score:0 }; }
  },
  saveProgress: p => localStorage.setItem('gq_progress', JSON.stringify(p)),
  reset: () => localStorage.removeItem('gq_progress')
};

/* ══════════════════════════════════════════════
   4. SANDBOX SIMULATION
   In-memory filesystem + Git state machine.
   Produces realistic output for all common commands.
══════════════════════════════════════════════ */
const Sandbox = (() => {

  const fs = {
    'README.txt':   'Welcome to GitQuest!\nThis is your practice repository.\n',
    'src/app.js':   'console.log("Hello, Git!");\n',
    'src/utils.js': '// Utilities\nexport const add = (a, b) => a + b;\n',
    '.gitignore':   'node_modules/\n.DS_Store\n*.log\n',
  };

  const git = {
    initialized: false,
    branches: { main: [] },
    currentBranch: 'main',
    staged: new Set(),
    stash: [],
    tags: {},
    remotes: { origin: 'https://github.com/workshop/repo.git' },
    HEAD: null,
    commitCount: 0,
  };

  const cwd = '~/repo';

  const sha = () => Math.random().toString(16).slice(2, 10);
  const ts  = () => new Date().toLocaleString('en-US', {
    weekday:'short', month:'short', day:'2-digit',
    hour:'2-digit', minute:'2-digit', year:'numeric'
  });
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  /* Shell command handlers */
  function runLs(parts) {
    const verbose = parts.some(p => p.includes('l') && p.startsWith('-'));
    const keys = Object.keys(fs);
    const top = new Set(keys.map(k => k.split('/')[0]));
    const entries = [...top].sort();
    if (verbose) {
      const lines = [`total ${entries.length * 4}`];
      if (git.initialized) lines.push(`drwxr-xr-x  <span class="t-dim">.git/</span>`);
      entries.forEach(e => {
        const isDir = keys.some(k => k.startsWith(e+'/'));
        lines.push(`-rw-r--r--  ${isDir ? `<span class="t-info">${e}/</span>` : esc(e)}`);
      });
      return lines.join('\n');
    }
    return entries.map(e => keys.some(k=>k.startsWith(e+'/'))
      ? `<span class="t-info">${e}/</span>` : esc(e)
    ).join('  ');
  }

  function runCat(parts) {
    if (!parts[1]) return `<span class="t-err">cat: missing operand</span>`;
    if (!fs[parts[1]]) return `<span class="t-err">cat: ${esc(parts[1])}: No such file or directory</span>`;
    return esc(fs[parts[1]]);
  }

  function runEcho(parts, raw) {
    const m = raw.match(/^echo\s+(.*?)\s*>\s*(\S+)$/);
    if (m) { fs[m[2]] = m[1].replace(/^["']|["']$/g,'') + '\n'; return ''; }
    return esc(parts.slice(1).join(' ').replace(/^["']|["']$/g,''));
  }

  /* Git handlers */
  function needsInit() {
    return `<span class="t-err">fatal: not a git repository (or any of the parent directories): .git</span>`;
  }
  function isCommitted(f) {
    return (git.branches[git.currentBranch] || []).some(c => c.files?.includes(f));
  }

  function gitInit() {
    if (git.initialized) return `Reinitialized existing Git repository in ${cwd}/.git/`;
    git.initialized = true;
    return `Initialized empty Git repository in ${cwd}/.git/`;
  }

  function gitStatus(args) {
    if (!git.initialized) return needsInit();
    const staged   = [...git.staged];
    const unstaged = Object.keys(fs).filter(f => !git.staged.has(f) && !isCommitted(f));
    const modified = Object.keys(fs).filter(f => !git.staged.has(f) && isCommitted(f));
    const short = args.includes('-s') || args.includes('--short');
    if (short) {
      const lines = [];
      staged.forEach(f   => lines.push(`<span class="t-ok">M  ${esc(f)}</span>`));
      modified.forEach(f => lines.push(`<span class="t-warn"> M ${esc(f)}</span>`));
      unstaged.forEach(f => lines.push(`<span class="t-err">?? ${esc(f)}</span>`));
      return lines.join('\n') || '<span class="t-dim">nothing to commit, working tree clean</span>';
    }
    const lines = [`On branch <span class="t-br">${git.currentBranch}</span>`];
    if (!(git.branches[git.currentBranch]||[]).length) lines.push('\nNo commits yet\n');
    if (staged.length) {
      lines.push('\nChanges to be committed:');
      lines.push('  (use "git restore --staged &lt;file&gt;..." to unstage)');
      staged.forEach(f => lines.push(`\t<span class="t-ok">new file:   ${esc(f)}</span>`));
    }
    if (modified.length) {
      lines.push('\nChanges not staged for commit:');
      modified.forEach(f => lines.push(`\t<span class="t-warn">modified:   ${esc(f)}</span>`));
    }
    if (unstaged.length) {
      lines.push('\nUntracked files:');
      lines.push('  (use "git add &lt;file&gt;..." to include in what will be committed)');
      unstaged.forEach(f => lines.push(`\t<span class="t-err">${esc(f)}</span>`));
    }
    if (!staged.length && !modified.length && !unstaged.length) {
      lines.push('\nnothing to commit, working tree clean');
    }
    return lines.join('\n');
  }

  function gitAdd(args) {
    if (!git.initialized) return needsInit();
    if (!args.length) return `<span class="t-err">Nothing specified, nothing added.\nHint: try 'git add .'</span>`;
    const t = args[0];
    if (t === '.' || t === '-A' || t === '--all') {
      Object.keys(fs).forEach(f => git.staged.add(f));
      return '';
    }
    if (!fs[t]) return `<span class="t-err">fatal: pathspec '${esc(t)}' did not match any files</span>`;
    git.staged.add(t);
    return '';
  }

  function gitCommit(args) {
    if (!git.initialized) return needsInit();
    if (!git.staged.size) return `On branch ${git.currentBranch}\nnothing to commit, working tree clean`;
    const mi = args.indexOf('-m');
    let msg = mi !== -1 && args[mi+1] ? args[mi+1].replace(/^["']|["']$/g,'') : 'Commit';
    const id = sha();
    const files = [...git.staged];
    git.staged.clear();
    git.commitCount++;
    if (!git.branches[git.currentBranch]) git.branches[git.currentBranch] = [];
    git.branches[git.currentBranch].push({ id, msg, files, ts: ts(), author: Storage.getPlayer()||'user' });
    git.HEAD = id;
    return `[${git.currentBranch} <span class="t-sha">${id}</span>] ${esc(msg)}\n ${files.length} file${files.length!==1?'s':''} changed`;
  }

  function gitLog(args) {
    if (!git.initialized) return needsInit();
    const commits = [...(git.branches[git.currentBranch]||[])].reverse();
    if (!commits.length) return `<span class="t-err">fatal: your current branch '${git.currentBranch}' does not have any commits yet</span>`;
    const oneline = args.includes('--oneline');
    return commits.map((c, i) => oneline
      ? `<span class="t-sha">${c.id}</span> ${esc(c.msg)}`
      : `<span class="t-sha">commit ${c.id}${i===0?` (<span class="t-info">HEAD → ${git.currentBranch}</span>)`:''}</span>\nAuthor: ${esc(c.author)} &lt;${esc(c.author)}@workshop.local&gt;\nDate:   ${c.ts}\n\n    ${esc(c.msg)}\n`
    ).join('\n');
  }

  function gitBranch(args) {
    if (!git.initialized) return needsInit();
    if (!args.length || args[0]==='-v'||args[0]==='-a'||args[0]==='--list') {
      return Object.keys(git.branches)
        .map(b => b===git.currentBranch ? `<span class="t-ok">* ${b}</span>` : `  ${b}`)
        .join('\n');
    }
    if (args[0]==='-d'||args[0]==='--delete') {
      const n = args[1];
      if (!n) return `<span class="t-err">fatal: branch name required</span>`;
      if (n===git.currentBranch) return `<span class="t-err">error: Cannot delete branch you are on</span>`;
      if (!git.branches[n]) return `<span class="t-err">error: branch '${esc(n)}' not found</span>`;
      delete git.branches[n];
      return `Deleted branch ${esc(n)}.`;
    }
    if (args[0]==='-D') {
      const n = args[1];
      if (!n) return `<span class="t-err">fatal: branch name required</span>`;
      if (!git.branches[n]) return `<span class="t-err">error: branch '${esc(n)}' not found</span>`;
      delete git.branches[n];
      return `Deleted branch ${esc(n)} (was ${sha()}).`;
    }
    if (args[0]==='-m') {
      const [,oldN,newN] = args;
      if (!oldN||!newN) return `<span class="t-err">usage: git branch -m &lt;old&gt; &lt;new&gt;</span>`;
      if (!git.branches[oldN]) return `<span class="t-err">error: branch '${esc(oldN)}' not found</span>`;
      git.branches[newN] = git.branches[oldN];
      delete git.branches[oldN];
      if (git.currentBranch===oldN) git.currentBranch=newN;
      return '';
    }
    const n = args[0];
    if (git.branches[n]) return `<span class="t-err">fatal: A branch named '${esc(n)}' already exists.</span>`;
    git.branches[n] = [...(git.branches[git.currentBranch]||[])];
    return '';
  }

  function gitCheckout(args) {
    if (!git.initialized) return needsInit();
    if (args[0]==='-b') {
      const n = args[1];
      if (!n) return `<span class="t-err">fatal: branch name required</span>`;
      if (git.branches[n]) return `<span class="t-err">fatal: A branch named '${esc(n)}' already exists.</span>`;
      git.branches[n] = [...(git.branches[git.currentBranch]||[])];
      git.currentBranch = n;
      return `Switched to a new branch '<span class="t-br">${esc(n)}</span>'`;
    }
    const n = args[0];
    if (!n) return `<span class="t-err">error: pathspec required</span>`;
    if (!git.branches[n]) return `<span class="t-err">error: pathspec '${esc(n)}' did not match any branch</span>`;
    git.currentBranch = n;
    return `Switched to branch '<span class="t-br">${esc(n)}</span>'`;
  }

  function gitSwitch(args) {
    if (!git.initialized) return needsInit();
    if (args[0]==='-c'||args[0]==='--create') {
      const n = args[1];
      git.branches[n] = [...(git.branches[git.currentBranch]||[])];
      git.currentBranch = n;
      return `Switched to a new branch '<span class="t-br">${esc(n)}</span>'`;
    }
    const n = args[0];
    if (!git.branches[n]) return `<span class="t-err">fatal: invalid reference: ${esc(n)}</span>`;
    git.currentBranch = n;
    return `Switched to branch '<span class="t-br">${esc(n)}</span>'`;
  }

  function gitMerge(args) {
    if (!git.initialized) return needsInit();
    const n = args[0];
    if (!n) return `<span class="t-err">fatal: No branch name specified</span>`;
    if (!git.branches[n]) return `<span class="t-err">merge: ${esc(n)} - not something we can merge</span>`;
    const incoming = git.branches[n]||[];
    const current  = git.branches[git.currentBranch]||[];
    const newC = incoming.filter(c => !current.find(e => e.id===c.id));
    git.branches[git.currentBranch] = [...current, ...newC];
    if (!newC.length) return 'Already up to date.';
    return `Merge made by the 'ort' strategy.\n ${newC.length} commit${newC.length!==1?'s':''} merged\n Merge commit: <span class="t-sha">${sha()}</span>`;
  }

  function gitPush(args) {
    if (!git.initialized) return needsInit();
    const remote = args.find(a=>!a.startsWith('-'))||'origin';
    const branch = args.filter(a=>!a.startsWith('-')).slice(1)[0]||git.currentBranch;
    const commits = git.branches[git.currentBranch]||[];
    if (!commits.length) return `<span class="t-err">error: src refspec ${esc(branch)} does not match any ref</span>`;
    const n = commits.length*3;
    return `Enumerating objects: ${n}, done.\nCounting objects: 100% (${n}/${n}), done.\nWriting objects: 100% (${n}/${n}), ${(Math.random()*3+.5).toFixed(2)} KiB, done.\nTo ${git.remotes[remote]||remote}\n * [new branch]      <span class="t-br">${esc(branch)}</span> -&gt; <span class="t-br">${esc(branch)}</span>`;
  }

  function gitPull(args) {
    if (!git.initialized) return needsInit();
    const a = sha(), b = sha();
    return `remote: Enumerating objects: 3, done.\nFrom ${git.remotes['origin']||'origin'}\n   ${a}..${b}  main -&gt; origin/main\nUpdating ${a}..${b}\nFast-forward\n 1 file changed, 2 insertions(+)`;
  }

  function gitFetch(args) {
    if (!git.initialized) return needsInit();
    return `From ${git.remotes['origin']||'origin'}\n * branch            main       -&gt; FETCH_HEAD`;
  }

  function gitStash(args) {
    if (!git.initialized) return needsInit();
    const sub = args[0];
    if (!sub||sub==='push'||sub==='save') {
      const files = [...git.staged];
      if (!files.length && !Object.keys(fs).some(f=>!isCommitted(f))) return 'No local changes to save';
      git.stash.push({ files, ts: ts(), msg: args.find(a=>a!=='push'&&a!=='save'&&!a.startsWith('-'))||'WIP' });
      git.staged.clear();
      return `Saved working directory and index state WIP on ${git.currentBranch}: ${git.HEAD||sha()} &lt;stash&gt;`;
    }
    if (sub==='pop'||sub==='apply') {
      if (!git.stash.length) return `<span class="t-err">error: No stash entries found.</span>`;
      const e = sub==='pop' ? git.stash.pop() : git.stash[git.stash.length-1];
      e.files.forEach(f=>git.staged.add(f));
      return `On branch ${git.currentBranch}\nChanges to be committed:\n${e.files.map(f=>`  modified: ${f}`).join('\n')}`;
    }
    if (sub==='list') return git.stash.map((s,i)=>`stash@{${i}}: WIP on ${git.currentBranch}: ${s.ts}`).join('\n')||'';
    if (sub==='drop') { if(!git.stash.length) return `<span class="t-err">error: No stash entries found.</span>`; git.stash.pop(); return `Dropped refs/stash@{0}`; }
    if (sub==='clear') { git.stash=[]; return ''; }
    return `<span class="t-err">error: unknown subcommand: ${esc(sub)}</span>`;
  }

  function gitDiff(args) {
    if (!git.initialized) return needsInit();
    const staged = [...git.staged];
    if (!staged.length && !args.includes('--staged')) return '<span class="t-dim">(no changes to show)</span>';
    return `diff --git a/README.txt b/README.txt\nindex 0000000..${sha()} 100644\n--- a/README.txt\n+++ b/README.txt\n@@ -1 +1,2 @@\n Welcome to GitQuest!\n<span class="t-ok">+Your edits go here</span>`;
  }

  function gitRemote(args) {
    if (args[0]==='-v') {
      return Object.entries(git.remotes).map(([k,v])=>`${k}\t${v} (fetch)\n${k}\t${v} (push)`).join('\n')||'(no remotes)';
    }
    if (args[0]==='add') {
      const [,n,url]=args;
      if(!n||!url) return `<span class="t-err">usage: git remote add &lt;name&gt; &lt;url&gt;</span>`;
      git.remotes[n]=url; return '';
    }
    if (args[0]==='remove'||args[0]==='rm') { delete git.remotes[args[1]]; return ''; }
    return Object.keys(git.remotes).join('\n')||'';
  }

  function gitClone(args) {
    if (!args[0]) return `<span class="t-err">fatal: You must specify a repository to clone.</span>`;
    const name = args[0].split('/').pop().replace('.git','');
    return `Cloning into '${esc(name)}'...\nremote: Enumerating objects: 42, done.\nreceiving objects: 100% (42/42), 12.5 KiB, done.`;
  }

  function gitReset(args) {
    if (!git.initialized) return needsInit();
    if (args[0]==='--hard') { git.staged.clear(); return `HEAD is now at ${git.HEAD||sha()} Hard reset`; }
    if (args[0]==='--soft') { return `Soft reset. Staged changes preserved.`; }
    git.staged.clear();
    return `Unstaged changes after reset:\n${Object.keys(fs).map(f=>`M\t${f}`).join('\n')}`;
  }

  function gitRevert(args) {
    if (!git.initialized) return needsInit();
    const commits = git.branches[git.currentBranch]||[];
    if (!commits.length) return `<span class="t-err">fatal: no commits on current branch</span>`;
    const target = commits[commits.length-1];
    const id = sha();
    git.branches[git.currentBranch].push({ id, msg:`Revert "${target.msg}"`, files:[], ts:ts(), author:Storage.getPlayer()||'user' });
    git.HEAD = id;
    return `[${git.currentBranch} ${id}] Revert "${esc(target.msg)}"\n 1 file changed, 0 insertions(+), 0 deletions(-)`;
  }

  function gitRebase(args) {
    if (!git.initialized) return needsInit();
    return `Successfully rebased and updated refs/heads/${git.currentBranch}.`;
  }

  function gitCherryPick(args) {
    if (!git.initialized) return needsInit();
    const c = args[0]||sha();
    return `[${git.currentBranch} ${sha()}] cherry-pick: applied ${esc(c)}`;
  }

  function gitTag(args) {
    if (!git.initialized) return needsInit();
    if (!args.length) return Object.keys(git.tags).join('\n')||'(no tags)';
    const n = args.find(a=>!a.startsWith('-')&&a!=='-a'&&a!=='-d');
    if (args[0]==='-d') { delete git.tags[args[1]]; return `Deleted tag '${esc(args[1])}'`; }
    if (n) { git.tags[n] = git.HEAD||sha(); return ''; }
    return '';
  }

  function gitShow(args) {
    if (!git.initialized) return needsInit();
    const commits = git.branches[git.currentBranch]||[];
    if (!commits.length) return `<span class="t-err">fatal: no commits yet</span>`;
    const c = commits[commits.length-1];
    return `<span class="t-sha">commit ${c.id}</span>\nAuthor: ${esc(c.author)} &lt;${esc(c.author)}@workshop.local&gt;\nDate:   ${c.ts}\n\n    ${esc(c.msg)}\n\ndiff --git a/README.txt b/README.txt\n<span class="t-ok">+${esc(Object.values(fs)[0].split('\n')[0])}</span>`;
  }

  function gitBlame(args) {
    if (!git.initialized) return needsInit();
    const f = args[0];
    if (!f||!fs[f]) return `<span class="t-err">fatal: no such path '${esc(f||'')}'</span>`;
    const player = Storage.getPlayer()||'user';
    return fs[f].split('\n').filter(Boolean).map((line,i)=>
      `<span class="t-sha">${sha()}</span> (<span class="t-ok">${esc(player)}</span> ${ts()}) ${esc(line)}`
    ).join('\n');
  }

  function gitConfig(args) {
    if (args[0]==='--list'||args[0]==='-l') {
      return `user.name=${esc(Storage.getPlayer()||'Student')}\nuser.email=student@workshop.local\ncore.repositoryformatversion=0\ncore.filemode=true\ninit.defaultbranch=main`;
    }
    if ((args[0]==='--global'||args[0]==='--local') && args[1] && args[2]) return '';
    return '';
  }

  function gitReflog() {
    if (!git.initialized) return needsInit();
    const commits = git.branches[git.currentBranch]||[];
    if (!commits.length) return '<span class="t-dim">(empty)</span>';
    return commits.slice().reverse().map((c,i)=>
      `<span class="t-sha">${c.id}</span> HEAD@{${i}}: commit: ${esc(c.msg)}`
    ).join('\n');
  }

  function gitClean(args) {
    if (!git.initialized) return needsInit();
    const fd = args.includes('-fd')||args.includes('-f');
    if (!fd) return `<span class="t-warn">Would remove:\n${Object.keys(fs).filter(f=>!isCommitted(f)).map(f=>`  ${f}`).join('\n')}\nUse -fd to actually remove.</span>`;
    const removed = Object.keys(fs).filter(f=>!isCommitted(f));
    removed.forEach(f=>delete fs[f]);
    return removed.map(f=>`Removing ${f}`).join('\n')||'';
  }

  function gitHelp() {
    return `usage: git [--version] [--help] &lt;command&gt; [&lt;args&gt;]\n\n<span class="t-info">Common commands:</span>\n   init, clone, add, commit, status, log, diff, branch,\n   checkout, switch, merge, push, pull, fetch, stash,\n   remote, reset, revert, rebase, cherry-pick, tag,\n   show, blame, reflog, clean, config\n\nTip: try <span class="t-ok">git help &lt;command&gt;</span> for more details.`;
  }

  /* Arg splitter — handles quoted strings */
  function splitArgs(str) {
    const args=[]; let cur='',inQ=false,qCh='';
    for (const c of str) {
      if (inQ) { if(c===qCh){inQ=false;}else{cur+=c;} }
      else if (c==='"'||c==="'") { inQ=true; qCh=c; }
      else if (c===' ') { if(cur){args.push(cur);cur='';} }
      else { cur+=c; }
    }
    if (cur) args.push(cur);
    return args;
  }

  function runGit(args) {
    const sub = args[0];
    if (!sub) return gitHelp();
    switch (sub) {
      case 'init':         return gitInit();
      case 'status':       return gitStatus(args);
      case 'add':          return gitAdd(args.slice(1));
      case 'commit':       return gitCommit(args.slice(1));
      case 'log':          return gitLog(args);
      case 'branch':       return gitBranch(args.slice(1));
      case 'checkout':     return gitCheckout(args.slice(1));
      case 'switch':       return gitSwitch(args.slice(1));
      case 'merge':        return gitMerge(args.slice(1));
      case 'push':         return gitPush(args.slice(1));
      case 'pull':         return gitPull(args.slice(1));
      case 'fetch':        return gitFetch(args.slice(1));
      case 'stash':        return gitStash(args.slice(1));
      case 'diff':         return gitDiff(args.slice(1));
      case 'remote':       return gitRemote(args.slice(1));
      case 'clone':        return gitClone(args.slice(1));
      case 'reset':        return gitReset(args.slice(1));
      case 'revert':       return gitRevert(args.slice(1));
      case 'rebase':       return gitRebase(args.slice(1));
      case 'cherry-pick':  return gitCherryPick(args.slice(1));
      case 'tag':          return gitTag(args.slice(1));
      case 'show':         return gitShow(args.slice(1));
      case 'blame':        return gitBlame(args.slice(1));
      case 'config':       return gitConfig(args.slice(1));
      case 'reflog':       return gitReflog();
      case 'clean':        return gitClean(args.slice(1));
      case 'help':         return gitHelp();
      case 'version':      return 'git version 2.44.0';
      default: return `<span class="t-err">git: '${esc(sub)}' is not a git command. See 'git help'.</span>`;
    }
  }

  function run(raw) {
    const t = raw.trim();
    if (!t) return '';
    const parts = splitArgs(t);
    const cmd = parts[0];
    if (cmd==='clear')  return '__CLEAR__';
    if (cmd==='pwd')    return cwd;
    if (cmd==='ls')     return runLs(parts);
    if (cmd==='cat')    return runCat(parts);
    if (cmd==='touch')  { if(parts[1])fs[parts[1]]=''; return ''; }
    if (cmd==='mkdir')  return '';
    if (cmd==='echo')   return runEcho(parts, t);
    if (cmd==='git')    return runGit(parts.slice(1));
    return `<span class="t-err">bash: ${esc(cmd)}: command not found</span>`;
  }

  function getPrompt() { return `user@gitquest:<span class="t-info">${cwd}</span>$`; }

  return { run, getPrompt };
})();

/* ══════════════════════════════════════════════
   5. TERMINAL ENGINE
   Shared between exercise and sandbox terminals.
══════════════════════════════════════════════ */
function makeTerminal(outEl, inEl, ps1El, onCmd) {
  const hist=[]; let hIdx=-1;
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  function print(html) {
    const d=document.createElement('div');
    d.innerHTML=html;
    outEl.appendChild(d);
    outEl.scrollTop=outEl.scrollHeight;
  }
  function clear() { outEl.innerHTML=''; }
  function submit() {
    const cmd=inEl.value.trim();
    if (!cmd) return;
    hist.unshift(cmd); hIdx=-1; inEl.value='';
    // print the command line
    const d=document.createElement('div');
    d.innerHTML=`<span style="color:var(--accent)">${ps1El.innerHTML}</span>${esc(cmd)}`;
    outEl.appendChild(d);
    if (cmd==='clear') { clear(); return; }
    const result=Sandbox.run(cmd);
    if (result==='__CLEAR__') { clear(); return; }
    if (result!=='') print(result);
    ps1El.innerHTML = Sandbox.getPrompt()+'&nbsp;';
    outEl.scrollTop=outEl.scrollHeight;
    if (onCmd) onCmd(cmd, result);
  }
  inEl.addEventListener('keydown', e=>{
    if (e.key==='Enter') { submit(); }
    else if (e.key==='ArrowUp') {
      e.preventDefault();
      if (hIdx<hist.length-1) { hIdx++; inEl.value=hist[hIdx]; }
    } else if (e.key==='ArrowDown') {
      e.preventDefault();
      hIdx>0 ? (hIdx--, inEl.value=hist[hIdx]) : (hIdx=-1, inEl.value='');
    }
  });
  return { print, clear };
}

/* ══════════════════════════════════════════════
   6. UI — EXERCISES
══════════════════════════════════════════════ */
let progress, activeId=null, exTerm=null;
const DIFF_COLORS = { easy: 'var(--easy)', intermediate: 'var(--mid)', advanced: 'var(--hard)' };

function initExercises() {
  progress = Storage.getProgress();
  buildSidebar();
  initExTerminal();
}

function buildSidebar() {
  const container = document.getElementById('ex-groups');
  container.innerHTML = '';

  DIFFICULTY_ORDER.forEach(diff => {
    const items = EXERCISES.filter(e => e.difficulty === diff);
    const doneCount = items.filter(e => progress.completed.includes(e.id)).length;

    const group = document.createElement('div');
    group.className = 'diff-group open';
    group.dataset.diff = diff;

    group.innerHTML = `
      <div class="diff-header">
        <span class="diff-dot" style="background:${DIFF_COLORS[diff]}"></span>
        <span class="diff-label">${DIFFICULTY_LABELS[diff]}</span>
        <span class="diff-count">${doneCount}/${items.length}</span>
        <span class="diff-chevron">›</span>
      </div>
      <ul class="diff-items"></ul>
    `;

    const ul = group.querySelector('.diff-items');
    items.forEach(ex => {
      const li = document.createElement('li');
      li.className = 'ex-item' +
        (progress.completed.includes(ex.id) ? ' is-done' : '') +
        (ex.id === activeId ? ' is-active' : '');
      li.dataset.id = ex.id;
      li.innerHTML = `
        <span class="ex-item-num">${ex.id}</span>
        <span class="ex-item-title">${ex.title}</span>
        <span class="ex-item-pts">${ex.points}</span>
      `;
      li.addEventListener('click', () => selectExercise(ex.id));
      ul.appendChild(li);
    });

    group.querySelector('.diff-header').addEventListener('click', () => {
      group.classList.toggle('open');
    });

    container.appendChild(group);
  });

  updateProgress();
}

function updateProgress() {
  const done  = progress.completed.length;
  const total = EXERCISES.length;
  const pct   = total ? Math.round((done/total)*100) : 0;
  const circ  = 2 * Math.PI * 20; // r=20
  const arc   = document.getElementById('ring-arc');
  if (arc) arc.style.strokeDashoffset = circ - (circ * pct / 100);
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-text').textContent = `${done} / ${total}`;
}

function selectExercise(id) {
  activeId = id;
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  // Update sidebar active state
  document.querySelectorAll('.ex-item').forEach(el => {
    el.classList.toggle('is-active', +el.dataset.id === id);
  });

  const done     = progress.completed.includes(id);
  const hintUsed = progress.hintUsed.includes(id);
  const pts      = hintUsed ? Math.floor(ex.points / 2) : ex.points;

  document.getElementById('ex-detail').innerHTML = `
    <div class="ex-num-badge">
      EXERCISE ${String(id).padStart(2,'0')}
      <span class="diff-badge ${ex.difficulty}">${DIFFICULTY_LABELS[ex.difficulty]}</span>
    </div>
    <div class="ex-title">${ex.title}</div>
    <div class="ex-desc">${ex.description}</div>
    <div class="ex-footer">
      <span class="pts-tag">⚡ ${pts} XP${hintUsed?' (hint used)':''}</span>
      ${done ? '<span class="done-tag">✓ Completed</span>' : ''}
      ${!done ? '<button class="btn-hint" id="hint-btn">💡 Show Hint</button>' : ''}
    </div>
    <div class="hint-box ${hintUsed?'open':''}" id="hint-box">
      <div class="hint-label">HINT</div>
      <div class="hint-text">${ex.hint}</div>
    </div>
  `;

  if (!done) {
    document.getElementById('hint-btn').addEventListener('click', () => {
      if (!progress.hintUsed.includes(id)) {
        progress.hintUsed.push(id);
        Storage.saveProgress(progress);
      }
      document.getElementById('hint-box').classList.add('open');
      selectExercise(id); // re-render with half pts shown
    });
  }

  // Show + clear terminal
  const termEl = document.getElementById('ex-term');
  termEl.style.display = 'block';
  document.getElementById('ex-term-label').textContent = `Exercise ${id} — ${ex.title}`;
  if (exTerm) {
    exTerm.clear();
    exTerm.print(done
      ? '<span class="t-ok">✓ Already completed — keep experimenting!</span>'
      : '<span class="t-info">Type your command and press Enter</span>'
    );
  }
  document.getElementById('ex-input').focus();
}

function initExTerminal() {
  exTerm = makeTerminal(
    document.getElementById('ex-out'),
    document.getElementById('ex-input'),
    document.getElementById('ex-ps1'),
    (cmd) => {
      if (activeId == null || progress.completed.includes(activeId)) return;
      const ex = EXERCISES.find(e => e.id === activeId);
      if (!ex) return;
      if (cmdMatches(cmd, ex)) completeExercise(ex);
    }
  );
  exTerm.print('<span class="t-dim">— Select an exercise to begin —</span>');
}

function cmdMatches(cmd, ex) {
  const n = s => s.trim().replace(/\s+/g,' ').replace(/['"]/g,'"').toLowerCase();
  const inp = n(cmd);
  if (n(ex.command) === inp) return true;
  return (ex.altCommands||[]).some(a => n(a) === inp);
}

function completeExercise(ex) {
  const hintUsed = progress.hintUsed.includes(ex.id);
  const earned   = hintUsed ? Math.floor(ex.points/2) : ex.points;
  progress.completed.push(ex.id);
  progress.score += earned;
  Storage.saveProgress(progress);

  document.getElementById('score-display').textContent = progress.score;
  buildSidebar();
  selectExercise(ex.id);
  exTerm.print(`\n<span class="t-ok">✓ Correct! +${earned} XP</span>`);
  showToast(`+${earned} XP — ${ex.title}`, 'ok');

  if (progress.completed.length === EXERCISES.length) setTimeout(showBadge, 700);
}

/* ══════════════════════════════════════════════
   7. UI — CHEAT SHEET
══════════════════════════════════════════════ */
function buildCheatSheet() {
  const grid = document.getElementById('cs-grid');
  grid.innerHTML = '';

  CHEATSHEET.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'cs-card';
    card.innerHTML = `
      <div class="cs-cat-title">${cat.category}</div>
      ${cat.commands.map(c => `
        <div class="cs-cmd-row" data-cmd="${c.cmd.toLowerCase()}" data-desc="${c.desc.toLowerCase()}">
          <span class="cs-cmd">${escHtml(c.cmd)}</span>
          <span class="cs-desc">${escHtml(c.desc)}</span>
        </div>
      `).join('')}
    `;
    grid.appendChild(card);
  });

  document.getElementById('cs-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.cs-cmd-row').forEach(row => {
      const match = !q || row.dataset.cmd.includes(q) || row.dataset.desc.includes(q);
      row.classList.toggle('hidden-filter', !match);
    });
    // hide empty cards
    document.querySelectorAll('.cs-card').forEach(card => {
      const visible = [...card.querySelectorAll('.cs-cmd-row')].some(r => !r.classList.contains('hidden-filter'));
      card.style.display = visible ? '' : 'none';
    });
  });
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ══════════════════════════════════════════════
   TUTORIAL DATA  (8 lessons)
   Each lesson: id, title, content (HTML string)
══════════════════════════════════════════════ */
const LESSONS = [
  {
    id: 1,
    title: 'What is Git?',
    icon: '🧠',
    lead: 'Git is a distributed version control system that tracks changes in your files over time. It lets you collaborate with others, experiment safely, and roll back mistakes — all without fear.',
    content: `
      <h3>The problem Git solves</h3>
      <p>Imagine you're working on a project. You save <em>app.js</em>, then break something. You wish you could go back to yesterday's version. Or you're on a team — two people edit the same file and one person's work overwrites the other's.</p>
      <p>Git solves both problems. It's a <strong>version control system (VCS)</strong> — software that records every change you make, who made it, and when. Think of it as an unlimited undo history for your entire project.</p>

      <div class="tut-callout info">
        <span class="tut-callout-icon">💡</span>
        <div>Git was created by <strong>Linus Torvalds</strong> in 2005 to manage the Linux kernel source code. Today it's the most widely used VCS in the world, powering GitHub, GitLab, Bitbucket, and millions of projects.</div>
      </div>

      <h3>What makes Git "distributed"?</h3>
      <p>Unlike older VCS tools, every developer has a <strong>full copy</strong> of the entire repository — history and all. You can commit, branch, and review history entirely offline. You only need a network connection when you want to share your work with others.</p>

      <div class="tut-terms">
        <div class="tut-term"><span class="tut-term-key">Repository</span><span class="tut-term-val">A folder tracked by Git. Contains your files plus a hidden <em>.git</em> directory that stores all history.</span></div>
        <div class="tut-term"><span class="tut-term-key">Commit</span><span class="tut-term-val">A snapshot of your project at a point in time. Like a save point in a video game.</span></div>
        <div class="tut-term"><span class="tut-term-key">Branch</span><span class="tut-term-val">A parallel line of development. Work on features independently, then merge them back.</span></div>
        <div class="tut-term"><span class="tut-term-key">Remote</span><span class="tut-term-val">A copy of the repository hosted on a server (e.g. GitHub) that team members share.</span></div>
      </div>

      <h3>Git vs GitHub — what's the difference?</h3>
      <p><strong>Git</strong> is the tool. It runs on your computer and manages your local repository. <strong>GitHub</strong> (and GitLab, Bitbucket) are cloud hosting services for Git repositories — they add collaboration features on top: pull requests, issue tracking, CI/CD pipelines.</p>
      <p>You can use Git perfectly well without GitHub, but GitHub makes sharing and collaborating much easier.</p>

      <div class="tut-callout tip">
        <span class="tut-callout-icon">✅</span>
        <div><strong>Key takeaway:</strong> Git tracks the history of your project locally. It gives you a safety net, lets you experiment freely, and enables teamwork without file collisions.</div>
      </div>
    `
  },
  {
    id: 2,
    title: 'Core Concepts',
    icon: '🗂️',
    lead: 'Before typing a single command, understanding Git\'s three-area model is the most important thing you can learn. Once it clicks, everything else makes sense.',
    content: `
      <h3>The three areas of Git</h3>
      <p>Git thinks of your project in three distinct areas. Files move between them as you work:</p>

      <div class="tut-diagram">
        <div class="stage-flow">
          <div class="sf-box">
            <span class="sf-icon">📁</span>
            <span class="sf-name">Working Directory</span>
            <span class="sf-sub">Your actual files</span>
          </div>
          <div class="sf-arrow">
            <span>→</span>
            <span class="sf-arrow-label">git add</span>
          </div>
          <div class="sf-box sf-accent">
            <span class="sf-icon">📋</span>
            <span class="sf-name">Staging Area</span>
            <span class="sf-sub">Planned snapshot</span>
          </div>
          <div class="sf-arrow">
            <span>→</span>
            <span class="sf-arrow-label">git commit</span>
          </div>
          <div class="sf-box">
            <span class="sf-icon">🗄️</span>
            <span class="sf-name">Repository</span>
            <span class="sf-sub">Permanent history</span>
          </div>
        </div>
      </div>

      <div class="tut-terms">
        <div class="tut-term"><span class="tut-term-key">Working Directory</span><span class="tut-term-val">The files you see and edit on your computer. Changes here are "untracked" until you stage them.</span></div>
        <div class="tut-term"><span class="tut-term-key">Staging Area (Index)</span><span class="tut-term-val">A preparation zone. You explicitly choose which changes go into the next commit by staging them with <em>git add</em>.</span></div>
        <div class="tut-term"><span class="tut-term-key">Repository (.git)</span><span class="tut-term-val">The permanent record. Once committed, changes are saved with their full history and cannot be easily lost.</span></div>
      </div>

      <h3>Why have a staging area?</h3>
      <p>The staging area is what makes Git precise. You might change 5 files in one work session, but want to split that into 2 logical commits — one for a bug fix, one for a new feature. By staging selectively, you craft exactly the snapshot you want.</p>

      <div class="tut-callout info">
        <span class="tut-callout-icon">💡</span>
        <div>A good commit is a <strong>single logical change</strong> with a clear message. Not "fixed stuff" — but "fix: null pointer in user login". This makes history readable and rollbacks surgical.</div>
      </div>

      <h3>Understanding HEAD</h3>
      <p><strong>HEAD</strong> is Git's pointer to your current position — usually the tip of the branch you're on. When you make a commit, HEAD advances to point to it. When you switch branches, HEAD moves to point to that branch's latest commit.</p>

      <div class="tut-callout warn">
        <span class="tut-callout-icon">⚠️</span>
        <div>If HEAD points directly to a commit instead of a branch, you're in "detached HEAD" state. You can look around, but don't commit — create a branch first.</div>
      </div>
    `
  },
  {
    id: 3,
    title: 'Your First Repository',
    icon: '🚀',
    lead: 'Time to get hands-on. This lesson walks through creating a repository and making your first commit — the foundation of everything else in Git.',
    content: `
      <h3>Initializing a repo</h3>
      <p>Navigate to your project folder and run one command to turn it into a Git repository:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git init</span>
<span class="c-ok">Initialized empty Git repository in ~/myproject/.git/</span></pre></div>
      <p>This creates a hidden <em>.git</em> folder. Don't touch it manually — that's Git's brain.</p>

      <h3>Checking what Git sees</h3>
      <p>Before staging anything, ask Git what's going on in your working directory:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git status</span>
On branch main

No commits yet

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)
        <span class="c-path">README.md</span>
        <span class="c-path">src/app.js</span></pre></div>
      <p>Untracked means Git sees the files but is not yet watching them for changes.</p>

      <h3>Staging files</h3>
      <p>Tell Git which files to include in the next snapshot:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Stage a single file</span>
<span class="c-cmd">git add README.md</span>

<span class="c-cmt"># Stage everything</span>
<span class="c-cmd">git add .</span>

<span class="c-cmt"># Verify what's staged</span>
<span class="c-cmd">git status</span>
Changes to be committed:
        <span class="c-ok">new file:   README.md</span>
        <span class="c-ok">new file:   src/app.js</span></pre></div>

      <h3>Making your first commit</h3>
      <p>Seal the staged snapshot into permanent history with a message explaining <em>why</em> this change was made:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git commit -m <span class="c-str">"Initial commit: add README and app entry point"</span></span>
[main (root-commit) <span class="c-cmt">a3f9d12</span>] Initial commit: add README and app entry point
 2 files changed, 15 insertions(+)</pre></div>

      <div class="tut-callout tip">
        <span class="tut-callout-icon">✅</span>
        <div><strong>Write commit messages in imperative mood:</strong> "Add login form" not "Added login form". Prefix with a type: <em>feat:</em>, <em>fix:</em>, <em>docs:</em>, <em>refactor:</em> for extra clarity.</div>
      </div>

      <h3>Reviewing history</h3>
      <p>After a few commits, inspect the history with <em>git log</em>:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git log --oneline</span>
<span class="c-cmt">c2d1e4f</span> feat: add user authentication
<span class="c-cmt">b5a3c9e</span> fix: handle null case in login
<span class="c-cmt">a3f9d12</span> Initial commit: add README and app entry point</pre></div>
      <p>The short SHA (e.g. <em>a3f9d12</em>) uniquely identifies each commit. You can reference any commit by its SHA in other commands.</p>
    `
  },
  {
    id: 4,
    title: 'Branching',
    icon: '🌿',
    lead: 'Branches are Git\'s killer feature. They let you work on multiple things simultaneously without interfering with each other — isolated workspaces that share the same history.',
    content: `
      <h3>What is a branch?</h3>
      <p>A branch is simply a lightweight, movable pointer to a commit. Creating a branch doesn't copy any files — it just creates a new pointer. This makes branches nearly instant and free to create.</p>

      <div class="tut-diagram">
        <div class="branch-vis"><span class="bv-commit">●</span>──<span class="bv-commit">●</span>──<span class="bv-commit">●</span>  ← <span class="bv-main">main</span>
                     ↘
                      <span class="bv-commit">●</span>──<span class="bv-commit">●</span>  ← <span class="bv-feat">feature/login</span> <span class="bv-head">(HEAD)</span></div>
      </div>

      <p>Both branches share the first three commits. The feature branch has two additional commits that exist only on that branch. <em>main</em> is unaffected.</p>

      <h3>Creating and switching branches</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Create a branch (stay where you are)</span>
<span class="c-cmd">git branch feature/login</span>

<span class="c-cmt"># Switch to it</span>
<span class="c-cmd">git switch feature/login</span>

<span class="c-cmt"># Or do both in one command (preferred)</span>
<span class="c-cmd">git switch -c feature/login</span>
<span class="c-ok">Switched to a new branch 'feature/login'</span></pre></div>

      <h3>Working on a branch</h3>
      <p>Once on your feature branch, work normally — edit files, stage, commit. Your changes exist only on this branch until you merge them.</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># See all branches (* = current)</span>
<span class="c-cmd">git branch</span>
<span class="c-ok">* feature/login</span>
  main

<span class="c-cmt"># Switch back to main</span>
<span class="c-cmd">git switch main</span></pre></div>

      <div class="tut-callout info">
        <span class="tut-callout-icon">💡</span>
        <div><strong>Branch naming conventions:</strong> Use <em>feature/</em>, <em>fix/</em>, <em>hotfix/</em>, <em>release/</em> prefixes to categorize branches. Use hyphens, not spaces: <em>feature/user-auth</em> not <em>feature/user auth</em>.</div>
      </div>

      <h3>Deleting a branch</h3>
      <p>After merging, clean up old branches:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Safe delete (only if merged)</span>
<span class="c-cmd">git branch -d feature/login</span>
<span class="c-ok">Deleted branch feature/login (was c2d1e4f).</span>

<span class="c-cmt"># Force delete (even if unmerged)</span>
<span class="c-cmd">git branch -D feature/experiment</span></pre></div>
    `
  },
  {
    id: 5,
    title: 'Merging & Conflicts',
    icon: '🔀',
    lead: 'Merging brings diverged branches back together. Most of the time Git handles it automatically. When it can\'t, you\'ll get a conflict — and learning to resolve one is an essential skill.',
    content: `
      <h3>Merging a branch</h3>
      <p>To integrate a feature branch back into <em>main</em>, switch to main first, then merge:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git switch main</span>
<span class="c-cmd">git merge feature/login</span>
<span class="c-ok">Updating a3f9d12..c2d1e4f
Fast-forward
 src/auth.js | 45 ++++++++++++
 1 file changed, 45 insertions(+)</span></pre></div>

      <h3>Fast-forward vs merge commit</h3>
      <div class="tut-terms">
        <div class="tut-term"><span class="tut-term-key">Fast-forward</span><span class="tut-term-val">When main hasn't moved since the branch was created, Git just moves the pointer forward. Clean, linear history — no extra commit.</span></div>
        <div class="tut-term"><span class="tut-term-key">Merge commit</span><span class="tut-term-val">When both branches have new commits, Git creates a new "merge commit" that has two parents, preserving the full history of both lines.</span></div>
      </div>

      <div class="tut-diagram">
        <div class="branch-vis"><span class="c-cmt bv-commit">Fast-forward:</span>
<span class="bv-commit">●</span>──<span class="bv-commit">●</span>──<span class="bv-commit">●</span>──<span class="bv-commit">●</span>──<span class="bv-commit">●</span>  ← <span class="bv-main">main</span> (moved forward)

<span class="c-cmt bv-commit">Merge commit:</span>
<span class="bv-commit">●</span>──<span class="bv-commit">●</span>──<span class="bv-commit">●</span>──────────<span class="bv-merge">M</span>  ← <span class="bv-main">main</span>
          ↘  <span class="bv-feat">feature</span>  ↗</div>
      </div>

      <h3>Merge conflicts</h3>
      <p>A conflict happens when two branches changed the <strong>same lines</strong> of the same file differently. Git can't decide which version wins — so it asks you.</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">conflict markers in file</span></div><pre><span class="c-cmt">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD  (your current branch)</span>
const greeting = "Hello, world!";
<span class="c-cmt">=======</span>
const greeting = "Hi there!";
<span class="c-cmt">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/login  (incoming branch)</span></pre></div>
      <p>To resolve: <strong>edit the file</strong> to the version you want (removing the markers), then stage and commit:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># After editing the file manually:</span>
<span class="c-cmd">git add src/greeting.js</span>
<span class="c-cmd">git commit -m <span class="c-str">"merge: resolve greeting conflict"</span></span></pre></div>

      <div class="tut-callout warn">
        <span class="tut-callout-icon">⚠️</span>
        <div>Conflicts look scary but are normal. Always communicate with teammates about which section to keep. Never blindly accept "ours" or "theirs" — read both sides first.</div>
      </div>
    `
  },
  {
    id: 6,
    title: 'Remote Repositories',
    icon: '☁️',
    lead: 'Remotes connect your local repository to the world. This is how you back up your work, share it with teammates, and collaborate on open-source projects.',
    content: `
      <h3>What is a remote?</h3>
      <p>A remote is a version of your repository hosted on another server — usually GitHub, GitLab, or a private server. By convention the primary remote is named <em>origin</em>.</p>

      <div class="tut-terms">
        <div class="tut-term"><span class="tut-term-key">origin</span><span class="tut-term-val">The default name for the remote you cloned from, or the first remote you added. You can rename it.</span></div>
        <div class="tut-term"><span class="tut-term-key">upstream</span><span class="tut-term-val">Convention for the original repo when you've forked someone else's project. Your fork is origin, their repo is upstream.</span></div>
      </div>

      <h3>Connecting to a remote</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Add a remote (if you didn't clone)</span>
<span class="c-cmd">git remote add origin https://github.com/user/repo.git</span>

<span class="c-cmt"># Verify remotes</span>
<span class="c-cmd">git remote -v</span>
<span class="c-ok">origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)</span></pre></div>

      <h3>Push — send your commits</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># First push — set upstream tracking</span>
<span class="c-cmd">git push -u origin main</span>

<span class="c-cmt"># Subsequent pushes (shorthand)</span>
<span class="c-cmd">git push</span></pre></div>

      <h3>Fetch & Pull — get remote changes</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Fetch: download changes WITHOUT merging</span>
<span class="c-cmd">git fetch origin</span>
<span class="c-cmt"># Then you can inspect with: git log origin/main</span>

<span class="c-cmt"># Pull: fetch + merge in one step</span>
<span class="c-cmd">git pull origin main</span></pre></div>

      <div class="tut-callout info">
        <span class="tut-callout-icon">💡</span>
        <div>Prefer <strong>fetch + review + merge</strong> over a blind <em>git pull</em> on important branches. Fetching first lets you see what's coming before it lands in your code.</div>
      </div>

      <h3>Cloning an existing repo</h3>
      <p>If a repository already exists on GitHub, clone it to get a full local copy:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git clone https://github.com/user/repo.git</span>
<span class="c-cmt"># This automatically sets origin and checks out main</span></pre></div>
    `
  },
  {
    id: 7,
    title: 'Undoing Changes',
    icon: '↩️',
    lead: 'One of Git\'s superpowers is the ability to undo almost anything. But the right tool depends on what you want to undo and whether you\'ve shared those commits with others.',
    content: `
      <h3>The undo toolkit</h3>
      <div class="tut-terms">
        <div class="tut-term"><span class="tut-term-key">git restore</span><span class="tut-term-val">Discard uncommitted changes in working directory or unstage files. Safe — no history modified.</span></div>
        <div class="tut-term"><span class="tut-term-key">git commit --amend</span><span class="tut-term-val">Rewrite the most recent commit. Use to fix a typo in the message or add forgotten files.</span></div>
        <div class="tut-term"><span class="tut-term-key">git revert</span><span class="tut-term-val">Create a new commit that undoes a previous one. <strong>Safe for shared history</strong> — doesn't rewrite.</span></div>
        <div class="tut-term"><span class="tut-term-key">git reset</span><span class="tut-term-val">Move HEAD (and optionally the working tree) to a previous commit. <strong>Dangerous on shared branches</strong> — rewrites history.</span></div>
      </div>

      <h3>Discarding working directory changes</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Discard changes in one file (can't undo!)</span>
<span class="c-cmd">git restore app.js</span>

<span class="c-cmt"># Unstage a file (keep the changes)</span>
<span class="c-cmd">git restore --staged app.js</span></pre></div>

      <h3>The three flavors of reset</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># --soft: undo commit, keep changes STAGED</span>
<span class="c-cmd">git reset --soft HEAD~1</span>

<span class="c-cmt"># --mixed (default): undo commit, unstage changes</span>
<span class="c-cmd">git reset HEAD~1</span>

<span class="c-cmt"># --hard: undo commit AND discard all changes (danger!)</span>
<span class="c-cmd">git reset --hard HEAD~1</span></pre></div>

      <div class="tut-callout warn">
        <span class="tut-callout-icon">⚠️</span>
        <div><strong>Never use git reset on shared/published commits.</strong> If teammates already pulled those commits, resetting and force-pushing will cause serious problems. Use <em>git revert</em> instead.</div>
      </div>

      <h3>Safely reverting a commit</h3>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Revert the last commit (creates a new undo-commit)</span>
<span class="c-cmd">git revert HEAD</span>

<span class="c-cmt"># Revert a specific commit by SHA</span>
<span class="c-cmd">git revert a3f9d12</span></pre></div>

      <h3>Reflog — the ultimate safety net</h3>
      <p>Git keeps a local log of every position HEAD has been, even after resets. If you accidentally lose commits, <em>git reflog</em> can save you:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmd">git reflog</span>
<span class="c-cmt">c2d1e4f HEAD@{0}: reset: moving to HEAD~1
a3f9d12 HEAD@{1}: commit: feat: add login
...</span>
<span class="c-cmd">git reset --hard a3f9d12</span>  <span class="c-cmt"># recover lost commit</span></pre></div>
    `
  },
  {
    id: 8,
    title: 'Advanced Workflows',
    icon: '⚡',
    lead: 'With the fundamentals down, these tools will level up your Git game: rebasing for clean history, stashing for context switching, and tags for marking releases.',
    content: `
      <h3>Rebasing — rewrite history cleanly</h3>
      <p>Rebasing re-applies your commits on top of another branch, creating a linear history without merge commits:</p>
      <div class="tut-diagram">
        <div class="branch-vis"><span class="c-cmt">Before rebase:</span>
<span class="bv-commit">A</span>──<span class="bv-commit">B</span>──<span class="bv-commit">C</span>           ← <span class="bv-main">main</span>
     ↘
      <span class="bv-commit">D</span>──<span class="bv-commit">E</span>         ← <span class="bv-feat">feature</span>

<span class="c-cmt">After: git rebase main</span>
<span class="bv-commit">A</span>──<span class="bv-commit">B</span>──<span class="bv-commit">C</span>──<span class="bv-commit">D'</span>──<span class="bv-commit">E'</span>  ← <span class="bv-feat">feature</span> (replayed)</div>
      </div>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># From your feature branch:</span>
<span class="c-cmd">git rebase main</span>

<span class="c-cmt"># Interactive rebase — squash, edit, reorder commits</span>
<span class="c-cmd">git rebase -i HEAD~3</span></pre></div>

      <div class="tut-callout warn">
        <span class="tut-callout-icon">⚠️</span>
        <div><strong>Never rebase shared/public branches.</strong> Rebasing rewrites commit SHAs — anyone who based work on those commits will have conflicts. Rebase only on local or personal branches.</div>
      </div>

      <h3>Stashing — save work in progress</h3>
      <p>Need to switch branches but not ready to commit? Stash it:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Save current work</span>
<span class="c-cmd">git stash</span>
<span class="c-ok">Saved working directory and index state WIP on main</span>

<span class="c-cmt"># ... do other work, switch branches, etc. ...</span>

<span class="c-cmt"># Get it back</span>
<span class="c-cmd">git stash pop</span>

<span class="c-cmt"># See all stashes</span>
<span class="c-cmd">git stash list</span></pre></div>

      <h3>Tags — mark releases</h3>
      <p>Tags are fixed pointers to commits — perfect for marking version releases:</p>
      <div class="tut-code"><div class="tut-code-bar"><span class="tut-code-lang">bash</span></div><pre><span class="c-cmt"># Lightweight tag</span>
<span class="c-cmd">git tag v1.0.0</span>

<span class="c-cmt"># Annotated tag (recommended — includes message & metadata)</span>
<span class="c-cmd">git tag -a v1.0.0 -m <span class="c-str">"Release version 1.0.0"</span></span>

<span class="c-cmt"># Push tags to remote</span>
<span class="c-cmd">git push origin --tags</span></pre></div>

      <div class="tut-callout tip">
        <span class="tut-callout-icon">✅</span>
        <div><strong>You're ready.</strong> You know how Git thinks, how to track changes, branch, merge, collaborate, undo mistakes, and use advanced tools. Head to the Exercises tab to put it all into practice — and keep the Cheat Sheet handy!</div>
      </div>
    `
  }
];

/* ══════════════════════════════════════════════
   TUTORIAL UI
══════════════════════════════════════════════ */
let tutProgress = {};  // { [lessonId]: true } — lessons read
let activeLessonId = 1;

function initTutorial() {
  tutProgress = getTutProgress();
  buildTutSidebar();
  showLesson(1);
}

function getTutProgress() {
  try { return JSON.parse(localStorage.getItem('gq_tut') || '{}'); }
  catch { return {}; }
}
function saveTutProgress() { localStorage.setItem('gq_tut', JSON.stringify(tutProgress)); }

function buildTutSidebar() {
  const ul = document.getElementById('tut-lesson-list');
  ul.innerHTML = '';
  LESSONS.forEach(lesson => {
    const li = document.createElement('li');
    li.className = 'tut-lesson-item'
      + (lesson.id === activeLessonId ? ' tl-active' : '')
      + (tutProgress[lesson.id] ? ' tl-read' : '');
    li.dataset.id = lesson.id;
    li.innerHTML = `
      <span class="tl-num">${tutProgress[lesson.id] ? '✓' : lesson.id}</span>
      <span class="tl-label">${lesson.icon} ${lesson.title}</span>
    `;
    li.addEventListener('click', () => showLesson(lesson.id));
    ul.appendChild(li);
  });

  const readCount = Object.keys(tutProgress).length;
  document.getElementById('tut-progress-text').textContent = `${readCount} / ${LESSONS.length} read`;
}

function showLesson(id) {
  activeLessonId = id;
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;

  // Mark as read
  tutProgress[id] = true;
  saveTutProgress();

  buildTutSidebar();

  const isFirst = id === LESSONS[0].id;
  const isLast  = id === LESSONS[LESSONS.length - 1].id;
  const prevLesson = !isFirst ? LESSONS.find(l => l.id === id - 1) : null;
  const nextLesson = !isLast  ? LESSONS.find(l => l.id === id + 1) : null;

  document.getElementById('tut-main').innerHTML = `
    <div class="tut-lesson-header">
      <div class="tut-lesson-eyebrow">Lesson ${id} of ${LESSONS.length}</div>
      <h2 class="tut-lesson-title">${lesson.icon} ${lesson.title}</h2>
      <p class="tut-lesson-lead">${lesson.lead}</p>
    </div>
    <div class="tut-body">${lesson.content}</div>
    <div class="tut-nav">
      <button class="tut-nav-btn" id="tut-prev" ${isFirst ? 'disabled' : ''}>
        ← ${prevLesson ? prevLesson.title : 'Previous'}
      </button>
      <span class="tut-read-badge">✓ Lesson read</span>
      ${isLast
        ? `<button class="tut-nav-btn primary" id="tut-go-exercises">Go to Exercises →</button>`
        : `<button class="tut-nav-btn primary" id="tut-next">${nextLesson ? nextLesson.title : 'Next'} →</button>`
      }
    </div>
  `;

  // Wire navigation buttons
  const prevBtn = document.getElementById('tut-prev');
  if (prevBtn && !isFirst) prevBtn.addEventListener('click', () => showLesson(id - 1));

  const nextBtn = document.getElementById('tut-next');
  if (nextBtn) nextBtn.addEventListener('click', () => showLesson(id + 1));

  const exBtn = document.getElementById('tut-go-exercises');
  if (exBtn) {
    exBtn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.querySelector('[data-tab="exercises"]').classList.add('active');
      document.getElementById('tab-exercises').classList.add('active');
    });
  }

  // Scroll to top
  document.getElementById('tut-main').scrollTop = 0;
  window.scrollTo(0, 0);
}

/* ══════════════════════════════════════════════
   8. UI — TAB NAVIGATION
══════════════════════════════════════════════ */
let tutorialInited = false;
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'tutorial' && !tutorialInited) {
      tutorialInited = true;
      initTutorial();
    }
  });
});

/* ══════════════════════════════════════════════
   9. UI — TOAST / BADGE
══════════════════════════════════════════════ */
let toastT;
function showToast(msg, type='info') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast ${type} show`;
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 3200);
}

let sessionStart = Date.now();
function showBadge() {
  const mins = Math.round((Date.now()-sessionStart)/60000);
  document.getElementById('badge-msg').textContent =
    `${progress.score} XP total · ${EXERCISES.length} exercises · ${mins} min${mins!==1?'s':''}`;
  document.getElementById('badge-overlay').classList.remove('hidden');
}
document.getElementById('badge-close').addEventListener('click', () => {
  document.getElementById('badge-overlay').classList.add('hidden');
});

/* ══════════════════════════════════════════════
  10. INIT
══════════════════════════════════════════════ */

/* ── Theme toggle ── */
(function() {
  const saved = localStorage.getItem('gq_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('gq_theme', next);
  });
})();

/* Sandbox terminal */
(function() {
  const sb = makeTerminal(
    document.getElementById('sb-out'),
    document.getElementById('sb-in'),
    document.getElementById('sb-ps1')
  );
  sb.print('<span class="t-info">GitQuest Sandbox — type any git or shell command.</span>');
  sb.print('<span class="t-dim">Pre-loaded files: README.txt, src/app.js, src/utils.js, .gitignore</span>');
  sb.print('');
  document.getElementById('clear-sb').addEventListener('click', () => sb.clear());
})();

/* Nickname / launch flow */
const nicknameInput = document.getElementById('nickname-input');
const savedPlayer   = Storage.getPlayer();
if (savedPlayer) nicknameInput.value = savedPlayer;

function launch(name) {
  const player = name.trim() || 'Player';
  Storage.setPlayer(player);
  progress = Storage.getProgress();
  document.getElementById('nickname-overlay').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('player-display').textContent = player;
  document.getElementById('score-display').textContent = progress.score;
  initExercises();
  buildCheatSheet();
}

document.getElementById('start-btn').addEventListener('click', () => launch(nicknameInput.value));
nicknameInput.addEventListener('keydown', e => { if(e.key==='Enter') launch(nicknameInput.value); });

/* Reset */
document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  Storage.reset();
  localStorage.removeItem('gq_tut');
  tutProgress = {};
  tutorialInited = false;
  progress = { completed:[], hintUsed:[], score:0 };
  document.getElementById('score-display').textContent = '0';
  activeId = null;
  buildSidebar();
  document.getElementById('ex-detail').innerHTML = `
    <div class="ex-empty">
      <svg width="44" height="44" viewBox="0 0 40 40" fill="none" opacity=".18">
        <circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="11" cy="13" r="4" fill="currentColor"/>
        <circle cx="29" cy="13" r="4" fill="currentColor"/>
        <circle cx="20" cy="30" r="4" fill="currentColor"/>
        <line x1="11" y1="13" x2="20" y2="30" stroke="currentColor" stroke-width="1.4"/>
        <line x1="29" y1="13" x2="20" y2="30" stroke="currentColor" stroke-width="1.4"/>
        <line x1="11" y1="13" x2="29" y2="13" stroke="currentColor" stroke-width="1.4"/>
      </svg>
      <p class="empty-h">Pick an exercise</p>
      <p class="empty-p">Select a mission from the sidebar to begin</p>
    </div>`;
  document.getElementById('ex-term').style.display = 'none';
  showToast('Progress reset', 'err');
});