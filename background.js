const urls = ['https://www.youtube.com/watch?v=*', 'https://www.youtube.com/shorts/*']

// https://stackoverflow.com/questions/71000139/javascript-regex-for-youtube-video-and-shorts-id
const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/

browser.contextMenus.create({
    id: 'open-small-youtube-thumbnail-image',
    title: browser.i18n.getMessage('smallThumbnail'),
    onclick: getImage,
    documentUrlPatterns: urls,
})

browser.contextMenus.create({
    id: 'open-large-youtube-thumbnail-image',
    title: browser.i18n.getMessage('largeThumbnail'),
    onclick: getImage,
    documentUrlPatterns: urls,
})

async function getImage(info, tab) {
    const match = tab.url.match(regex)

    if (!match) return

    let thumbnailURL = `http://img.youtube.com/vi/${match[3]}`

    const small = info.menuItemId === 'open-small-youtube-thumbnail-image'
    const large = info.menuItemId === 'open-large-youtube-thumbnail-image'

    if (small) {
        thumbnailURL += '/hqdefault.jpg'
    } else if (large) {
        thumbnailURL += '/maxresdefault.jpg'
    }

    return await browser.tabs.create({
        url: thumbnailURL,
        active: true,
    })
}
