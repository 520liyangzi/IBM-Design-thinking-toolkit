export function inTeams(): boolean {
  const currentUrl: string = window.location.href
  console.log(currentUrl)
  // Check if using HistoryRouter
  const url: URL = currentUrl.includes('/#/')
    ? new URL(`${window.location.href.split('/#/').join('/')}`)
    : //@ts-ignore
      new URL(window.location)
  console.log(url)
  const params: URLSearchParams = url.searchParams
  console.log(!!params.get('inTeams'))
  return !!params.get('inTeams')
}
