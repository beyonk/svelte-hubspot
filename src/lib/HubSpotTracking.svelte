<script>
  import { onMount, tick } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  const {
    subdomain = 'js',
    hubId,
    doNotTrack = false,
    loadChatWidgetImmediately = true
  } = $props()

  const url = `//${subdomain}.hs-scripts.com/${hubId}.js`
  const globalName = '_hsp'

  let isMounted = $state(false)
  let isChatWidgetLoaded = false

  function onConversationsApiReady () {
    const status = window.HubSpotConversations.widget.status()

    isChatWidgetLoaded = status.loaded || (Object.hasOwn(status, 'pending') && !status.pending)
  }

  const hsConversationsSettings = {
    loadImmediately: loadChatWidgetImmediately
  }

  const hsConversationsOnReady = [ onConversationsApiReady ]

  $effect(() => {
    if (isMounted) {
      setDoNotTrackCookie(doNotTrack ? 'yes' : 'no')
    }
  })

  onMount(async () => {
    window._hsq = window._hsq || []
    window.hsConversationsSettings = hsConversationsSettings
    window.hsConversationsOnReady = hsConversationsOnReady

    isMounted = true
    await tick()
    init()
  })

  function isLoaded () {
    return !!window[globalName]
  }

  export function init () {
    loader(
      [
        { type: 'script', async: true, defer: true, url },
      ],
      isLoaded,
      trackPageView
    )
  }

  function setDoNotTrackCookie (value) {
    const cookie = '__hs_do_not_track'

    const thirteenMonths = 60 * 60 * 24 * 395

    document.cookie = `${cookie}=${value};Max-Age=${thirteenMonths}`

    trackPageView()
  }

  export function setIdentity (email, properties = {}) {
    window._hsq.push([ 'identify', { ...properties, email } ])

    isLoaded() && trackPageView()
  }

  export function setPath (page) {
    const path = page.url ? page.url.pathname : page.path
    const query = page.url ? page.url.searchParams : new URLSearchParams(page.query)
    window._hsq.push([ 'setPath', `${path}?${query}` ])

    refreshChatWidget()
    trackPageView()
  }

  function trackPageView () {
    window._hsq.push([ 'trackPageView' ])
  }

  export function loadChatWidget () {
    const { widget } = window.HubSpotConversations || {}

    if (widget) {
      widget.load()
    } else {
      hsConversationsOnReady.push(loadChatWidget)
    }
  }

  function refreshChatWidget () {
    if (!isChatWidgetLoaded) {
      return
    }
    window.HubSpotConversations.widget.refresh()
  }
</script>
