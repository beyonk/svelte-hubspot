<script>
  import { afterNavigate } from '$app/navigation'
  import { HubSpotTracking } from '#lib'

  const { children } = $props()

  let hs
  let consented = $state(false)

  afterNavigate(({ to }) => {
    hs.setPath(to)
  })

  function consent () {
    consented = true
    hs.loadChatWidget()
  }

  function revoke () {
    consented = false
  }
</script>

<HubSpotTracking
  bind:this={hs}
  subdomain="js-eu1"
  hubId={import.meta.env.VITE_HUB_ID}
  doNotTrack={!consented}
  loadChatWidgetImmediately={false}
/>

<main>
  {@render children()}
</main>

<footer>
  {#if !consented}
    <button type="button" onclick={consent}>Consent</button>
  {:else}
    <button type="button" onclick={revoke}>Revoke</button>
  {/if}
</footer>
