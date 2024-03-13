# Reload on Focus

Chrome extension which reloads tabs with matching URLs when they receive focus (becomes active).

<p>
	<a target="_blank" href="https://chromewebstore.google.com/detail/reload-on-focus/dmgfafnjghbbkmeibdmookfnadodgmgg" >
		<img src="images/chrome-web-store.png" alt="Chrome Web Store" width="200" />
	</a>
</p>

## Description

Open extension's options after installation. There you can specify URLs to watch for focus.

Then extension will reload any tab with matching URL on receiving focus (when you switch to it).
If tab's URL has changed to non-matching — the extension will not reload it.

There is a general (for all URLs) threshold option: specify time without reloads for fast switching.

Examples:

*   A site with recommendations like Twitch.
*   A feed/board/forum like Reddit.
*   An order/delivery page with tracking; if URL has order number — just use path glob.

## Development

### Setup

1.  Install [`pnpm`](https://pnpm.io/).
2.  Run `pnpm install`.

### Linting

`pnpm run lint` to lint docs, styles and scripts.

### Packing

`pnpm run pack` to pack the extension into ZIP-file.
Only necessary files will be packed.

We don't need for `.crx` and keys,
[Developer Dashboard](https://chrome.google.com/webstore/devconsole) now does it automatically.

## Credentials

*   [Main icon](https://www.flaticon.com/free-icon/refresh_189686)
*   [Loading icon](https://icons8.com/icon/XHchy08wwA71/loading-circle)
