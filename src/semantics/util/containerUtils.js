const isPrivate = () => window.location.hash.includes('private')

export const privatePrefix = () => isPrivate() ? '/private' : ''
export const maybePublicPadding = () => isPrivate() ? '' : 'pt-4'