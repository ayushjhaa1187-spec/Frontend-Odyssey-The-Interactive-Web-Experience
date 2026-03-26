export const devLifeStory = {
  hero: {
    badge: "The Developer's Journey",
    headline: "From Hello World to Production Zen",
    subtitle: "A humorous, scroll-driven odyssey through the caffeine, chaos, and occasional breakthroughs of building for the web.",
    cta: "Begin the Journey →",
    jokes: [
        "// Why do programmers wear glasses? Because they don't C#.",
        "// Real programmers count from 0.",
        "// I'd like to tell you a joke about UDP, but you might not get it.",
        "// !false - It's funny because it's true.",
        "// Git: A system for ensuring you can lose your work on many machines at once."
    ],
    initCode: `// Initializing life...\nconst developer = new Human();\ndeveloper.startCoding();`
  },
  learning: {
    headline: "PHASE 1: TUTORIAL HELL",
    subtitle: "I have 47 tabs open, and I've never felt more alive—nor more confused. Documentation is the enemy.",
    milestones: [
        { id: 0, icon: '💻', title: 'Day 1: Hello World', desc: 'Simple, elegant, life-changing. You think you’re a god already.', stats: 'Confidence: 100%\nActual Skill: 1%' },
        { id: 1, icon: '🌐', title: 'Week 2: CSS Centering', desc: 'The hardest problem in computer science. Why is it in the top left?', stats: 'Frustration: High\nTabs open: 12' },
        { id: 2, icon: '🎨', title: 'Month 1: JS Reactivity', desc: 'State, props, hooks... why is everything re-rendering infinitely?', stats: 'Rerenders: 1.2k/sec\nSleep: Optional' },
        { id: 3, icon: '⚡', title: 'Month 3: Framework Fatigue', desc: 'Switching to the latest trending library every 3 days. This is the way.', stats: 'Package Lock Size: 4GB\nSanity: 0.5%' },
        { id: 4, icon: '🎉', title: 'The Click', desc: "You finally understand the 'how' but still have no idea about the 'why'. Good enough.", stats: 'Status: Ready to break things\nConfidence: Over 9000' }
    ],
    modal: {
        title: "The Spark of Creation",
        text: "Every developer remembers their first line of code. It's the moment the computer first spoke back and you realized you could build anything.",
        btn: "ENGAGE GRIND MODE"
    }
  },
  bugs: {
    headline: "PHASE 2: THE BUG INFESTATION",
    subtitle: "It worked on my machine™. Now it's a living nightmare of undefined variables and broken dreams.",
    instructions: "TAP ANY BUG TO SQUASH IT!",
    consoleErrors: [
        "[ERROR] ReferenceError: commonSense is not defined",
        "[ERROR] TypeError: 'productivity' is read-only",
        "[ERROR] Uncaught Exception: User entered a string in a number field",
        "[ERROR] 404: Sleep not found",
        "[ERROR] Memory Leak: 99% of brain dedicated to regex"
    ]
  },
  eureka: {
    headline: "PHASE 3: THE EUREKA MOMENT",
    subtitle: "The bug wasn't the code. It was a missing semicolon and my own hubris. Relief at last.",
    messages: [
        "Optimization: 40% less memory (by removing the UI)",
        "Refactoring: Making it pretty before I break it again",
        "Pride: Increased by 1000% until next commit",
        "Confidence: Successfully copied from a 2014 blog post"
    ],
    hint: "TOGGLE DEBUG MODE FOR VISUAL THERAPY"
  },
  deadline: {
    headline: "PHASE 4: THE COUNTDOWN",
    subtitle: "Panic sets in. The feature list is shrinking, but the bug count is growing. Time to ship or die.",
    instructions: "DRAG SLIDER TO SEE PANIC INTENSIFY",
    steps: [
        { title: 'Day -3', sub: 'Merge features (Prayers sent)', icon: '🙏', id: 0 },
        { title: 'Day -2', sub: 'Review: 400 comments on one PR', icon: '📝', id: 1 },
        { title: 'Day -1', sub: 'Performance tuning (Delete stuff)', icon: '🗑️', id: 2 },
        { title: 'Day 0', sub: 'Production deploy (Hold breath)', icon: '🤞', id: 3 },
        { title: 'Go Live!', sub: 'It\'s somebody else\'s problem now', icon: '🎯', id: 4 }
    ]
  },
  caffeine: {
    headline: "PHASE 5: CAFFEINE PROTOCOL",
    subtitle: "Turning expensive roasted beans into lines of complex, unmaintainable logic. Persistence is key.",
    instructions: "SELECT DOSAGE TO REGULATE JITTER",
    commits: [
        { id: 1, message: "fix: resolved issue with logic (don't ask)", time: "1h ago" },
        { id: 2, message: "style: added more glassmorphism because why not", time: "3h ago" },
        { id: 3, message: "feat: implemented dark mode (was actually just a bug)", time: "5h ago" },
        { id: 4, message: "chore: updated README to sound like a genius", time: "7h ago" },
        { id: 5, message: "fix: re-enabled the bug I accidentally fixed", time: "9h ago" }
    ]
  },
  shipping: {
    headline: "PHASE 6: DEPLOYMENT STRESS",
    subtitle: "The build is green. The tests are (mostly) passing. Adrenaline peaks as you hit the button.",
    btn: "PRESS TO SHIP 🚀",
    logs: [
        "[INFO] Initializing production build...",
        "[INFO] Minifying spaghetti code...",
        "[WARN] Warning: Code might be too awesome to handle",
        "[INFO] Compressing assets (and my stress)...",
        "[INFO] Running final smoke tests (mostly smoke)...",
        "[WARN] Detected recursive dependency in life goals...",
        "[INFO] Finalizing build manifest...",
        "[SUCCESS] Build successful. Deployment imminent."
    ]
  },
  production: {
    headline: "PHASE 7: PRODUCTION LIVE",
    subtitle: "The world is using your code. Satisfaction at 99%. Anxiety at 100%. You are the architect.",
    metrics: [
        { label: "Users Online", val: 1 },
        { label: "Uptime", val: "99.9%" },
        { label: "Coffee Consumed", val: "∞" }
    ],
    cards: [
        { icon: "📊", title: "Monitor", desc: "Watching logs for the crash." },
        { icon: "📈", title: "Scale", desc: "Preparing for the 3 users total." },
        { icon: "🚀", title: "Ship Again", desc: "The cycle calls. Answer it." }
    ]
  },
  loop: {
    headline: "PHASE ∞: THE DEVELOPER'S LOOP",
    subtitle: "This isn't the end. It's just the beginning of Version 2.0. The cycle of creation and regret.",
    tiles: [
        { label: "LEARN", text: "New frameworks every Tuesday", icon: "📚" },
        { label: "BUILD", text: "Turning bugs into features", icon: "🛠️" },
        { label: "SHIP", text: "Release, regret, repeat", icon: "🚀" },
        { label: "SLEEP", text: "Error 404: Not Found", icon: "🛌" }
    ],
    btn: "RELOAD REALITY ↻",
    footerMsg: "And Then... It All Begins Again",
    jokes: [
        "// Code written at 3 AM is actually poetry.",
        "// A developer's true home is the console.log() output.",
        "// I have no idea why this works. Do not touch.",
        "// It's not a bug, it's an undocumented feature."
    ]
  }
};
