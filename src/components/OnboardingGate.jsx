import EmptyState from './EmptyState'
import { isOnboardingComplete } from '../data/userState'

export default function OnboardingGate({
  profile,
  children,
  title = 'Complete onboarding first',
  message = 'Finish setup to unlock this page.',
  actionLabel = 'Continue onboarding',
  actionTo = '/onboarding',
}) {
  if (isOnboardingComplete(profile)) {
    return children
  }

  return (
    <EmptyState
      title={title}
      message={message}
      actionLabel={actionLabel}
      actionTo={actionTo}
    />
  )
}
