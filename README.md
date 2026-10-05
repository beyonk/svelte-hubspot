<a href="https://beyonk.com">
    <br />
    <br />
    <img src="https://user-images.githubusercontent.com/218949/144224348-1b3a20d5-d68e-4a7a-b6ac-6946f19f4a86.png" width="198" />
    <br />
    <br />
</a>

## Svelte HubSpot

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![Svelte v5](https://img.shields.io/badge/svelte-v5-blueviolet.svg)](https://svelte.dev)

Svelte HubSpot integration

## Installation

```sh
npm i -D @beyonk/svelte-hubspot
```

## Usage

```svelte
<!-- src/routes/+layout.svelte -->
<HubSpotTracking hubId="123456" />

<script>
  import { HubSpotTracking } from '@beyonk/svelte-hubspot'
</script>
```

### Properties

| prop | type | default | description |
| ---- | ---- | ------- | ----------- |
| `subdomain` | string | `'js'` | HubSpot tracking code may be served via region-specific CDN, denoted by the subdomain of `hs-scripts.com` – this specific asset must be used |
| `hubId` | string | `undefined` | required; the HupSpot account id |
| `doNotTrack` | boolean | `false` | pass `true` if you do not want page views to be tracked, e.g. before user consent of GDPR policy |
| `loadChatWidgetImmediately` | boolean | `true` | pass `false` if you don't want the chat widget (where applicable) to be implicitly loaded — use `loadChatWidget()` to explicitly initialise chat |

(See demo code for example usage.)

### Tracking code API

The component instance exposes an interface to allow you to push actions to the HubSpot tracking queue. Note that you should still push the current path and submit `identify` calls before the tracking code is loaded (if at all); on load, an initial `trackPageView` is implicitly made to process items already in the queue.

Check out the example code to see how the current page could be tracked in a SvelteKit/Sapper app.

## Developing

In order to run the local demo you *must* pass a valid HubSpot ID otherwise it won't work:

```sh
VITE_HUB_ID=<your-hub-id> npm run dev
```
