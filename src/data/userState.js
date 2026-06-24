export const ONBOARDING_CATEGORIES = ['Career', 'Education', 'Fitness', 'Finance', 'Personal Growth']

export function createEmptyProfile() {
  return {
    category: '',
    currentSituation: '',
    goal: '',
    onboardingComplete: false,
    name: '',
    grade: '',
    gpa: '',
    interests: [],
    skills: [],
    extracurriculars: [],
    budget: '',
    countries: [],
    careers: [],
  }
}

export function isOnboardingComplete(profile) {
  return Boolean(profile?.onboardingComplete)
}
