const DOMAIN_RULES = [
  {
    id: 'animation',
    keywords: ['animator', 'animation', 'disney', 'pixar', 'storyboard', 'motion', 'character', '3d artist', 'vfx'],
    pathways: ['Character Animator', 'Motion Designer', 'Storyboard Artist'],
    skills: ['Animation principles', 'Storyboarding', 'Character design', 'After Effects', '3D fundamentals'],
    portfolio: ['Animation Reel', 'Character Design Collection', 'Storyboard Project'],
    strength: 'Your goal points toward visual storytelling, creative iteration, and expressive production work.',
    growth: 'Build a tighter reel with polished sequences and a clear character or story focus.',
    fit: 'Creative studio environments should fit well if you keep pairing craft practice with finished portfolio pieces.',
  },
  {
    id: 'data',
    keywords: ['data scientist', 'data science', 'machine learning', 'analytics', 'analyst', 'python', 'model', 'ai engineer', 'research'],
    pathways: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    skills: ['Python', 'Statistics', 'SQL', 'Machine learning', 'Data visualization'],
    portfolio: ['Data Dashboard', 'Prediction Model', 'Research Report'],
    strength: 'Your inputs suggest strong alignment with analytical problem solving and evidence-based decisions.',
    growth: 'Add visible projects that show how you clean data, explain tradeoffs, and turn findings into recommendations.',
    fit: 'Roles that combine technical analysis with business or research context are a strong match.',
  },
  {
    id: 'frontend',
    keywords: ['frontend', 'front end', 'react', 'ui engineer', 'web developer', 'website', 'javascript', 'product builder', 'ux', 'designer'],
    pathways: ['Frontend Developer', 'UI Engineer', 'Product Designer'],
    skills: ['React', 'JavaScript', 'Responsive design', 'UX fundamentals', 'Component architecture'],
    portfolio: ['React Web App', 'Personal Portfolio Site', 'UX Redesign Project'],
    strength: 'Your profile blends creative judgment with technical build energy, which is ideal for digital products.',
    growth: 'Ship small polished projects that prove interaction design, responsiveness, and code quality.',
    fit: 'Product teams and design-forward engineering roles should be especially relevant.',
  },
  {
    id: 'education',
    keywords: ['college', 'university', 'student', 'scholarship', 'major', 'study', 'school', 'degree', 'education'],
    pathways: ['Academic Planner', 'Scholarship Candidate', 'Career Explorer'],
    skills: ['Study planning', 'Research', 'Application writing', 'Time management', 'Interview prep'],
    portfolio: ['College Application Tracker', 'Scholarship Essay Set', 'Major Research Brief'],
    strength: 'Your inputs show a need for structure, comparison, and steady academic decision-making.',
    growth: 'Create a clearer timeline with milestones, requirements, and evidence for each application path.',
    fit: 'Guided academic planning and exploration workflows fit your current stage well.',
  },
  {
    id: 'fitness',
    keywords: ['fitness', 'workout', 'health', 'strength', 'weight', 'running', 'nutrition', 'gym'],
    pathways: ['Strength Training Plan', 'Wellness Builder', 'Habit Coach'],
    skills: ['Consistency', 'Recovery planning', 'Nutrition basics', 'Progress tracking', 'Goal setting'],
    portfolio: ['Workout Progress Log', 'Nutrition Plan', '30-Day Habit Challenge'],
    strength: 'Your goal is well suited to measurable habits and visible progress loops.',
    growth: 'Focus on consistency, recovery, and one primary metric at a time.',
    fit: 'Structured weekly plans and simple tracking will give you the clearest momentum.',
  },
  {
    id: 'finance',
    keywords: ['finance', 'money', 'budget', 'invest', 'saving', 'debt', 'income', 'business'],
    pathways: ['Budget Planner', 'Financial Analyst', 'Entrepreneurial Builder'],
    skills: ['Budgeting', 'Financial literacy', 'Spreadsheet modeling', 'Market research', 'Decision tracking'],
    portfolio: ['Personal Budget System', 'Investment Research Brief', 'Revenue Plan'],
    strength: 'Your profile points toward practical planning and clearer financial decision-making.',
    growth: 'Translate your goal into a simple budget, timeline, and measurable next action.',
    fit: 'Planning-heavy paths that reward disciplined tracking should feel natural.',
  },
]

const FALLBACK = {
  id: 'general',
  pathways: ['Goal Strategist', 'Project Builder', 'Growth Planner'],
  skills: ['Project planning', 'Communication', 'Research', 'Consistency', 'Problem solving'],
  portfolio: ['Personal Roadmap', 'Skill-Building Project', 'Progress Case Study'],
  strength: 'Your inputs show motivation and a clear desire to move from intention into action.',
  growth: 'Turn the goal into a sequence of concrete projects, checkpoints, and skill practice.',
  fit: 'A structured plan with visible milestones will make the path feel more realistic.',
}

function normalize(value) {
  if (Array.isArray(value)) return value.join(' ').toLowerCase()
  return String(value || '').toLowerCase()
}

function profileText(profile = {}) {
  return [
    profile.category,
    profile.currentSituation,
    profile.goal,
    profile.name,
    profile.grade,
    profile.gpa,
    profile.budget,
    profile.interests,
    profile.skills,
    profile.extracurriculars,
    profile.countries,
    profile.careers,
  ].map(normalize).join(' ')
}

function scoreRule(rule, text, category) {
  const keywordScore = rule.keywords.reduce((score, keyword) => (
    text.includes(keyword) ? score + 4 : score
  ), 0)
  const categoryScore = text.includes(rule.id) || normalize(category).includes(rule.id) ? 3 : 0
  return keywordScore + categoryScore
}

function inferRule(profile) {
  const text = profileText(profile)
  const ranked = DOMAIN_RULES
    .map((rule) => ({ rule, score: scoreRule(rule, text, profile?.category) }))
    .sort((a, b) => b.score - a.score)

  return ranked[0]?.score > 0 ? ranked[0].rule : FALLBACK
}

function readiness(profile, matchBoost) {
  const filled = ['category', 'currentSituation', 'goal'].filter((key) => normalize(profile?.[key]).trim()).length
  const situationDepth = Math.min(normalize(profile?.currentSituation).length, 160) / 160
  const goalDepth = Math.min(normalize(profile?.goal).length, 120) / 120
  return Math.min(96, Math.round(58 + filled * 7 + situationDepth * 8 + goalDepth * 7 + matchBoost))
}

function makeExplanation(title, profile, rule) {
  const goal = profile?.goal?.trim()
  const category = profile?.category || 'your focus area'
  if (goal) {
    return `Based on your goal of "${goal}", this path connects your ${category.toLowerCase()} focus with the next practical skills to build.`
  }
  return `Based on your ${category.toLowerCase()} focus, this path gives you a concrete direction to explore first.`
}

export function generateResults(profile = {}) {
  const rule = inferRule(profile)
  const text = profileText(profile)
  const keywordHits = rule.keywords?.filter((keyword) => text.includes(keyword)).length || 0
  const baseMatch = Math.min(94, 82 + keywordHits * 3)
  const readinessScore = readiness(profile, keywordHits)

  const pathways = rule.pathways.map((title, index) => ({
    title,
    match: Math.max(68, baseMatch - index * 6),
    explanation: makeExplanation(title, profile, rule),
  }))

  const portfolio = rule.portfolio.map((title, index) => ({
    title,
    description: `A focused project that proves ${rule.skills[index] || rule.skills[0]} for your ${pathways[0].title.toLowerCase()} direction.`,
  }))

  const insights = [
    rule.strength,
    rule.growth,
    rule.fit,
  ]

  return {
    pathways,
    insights,
    portfolio,
    readinessScore,
    recommendedSkills: rule.skills,
    strengths: [rule.strength],
    growthOpportunities: [rule.growth],
    careerFitObservations: [rule.fit],
    nextActions: [
      `Start with a ${portfolio[0].title.toLowerCase()} this week.`,
      `Practice ${rule.skills[0]} and ${rule.skills[1]} in a visible project.`,
      `Use the ${pathways[0].title} path as your first judging-ready direction.`,
    ],
  }
}
