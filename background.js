browser.contextMenus.create({
    id: 'open-small-youtube-thumbnail-image',
    title: 'Get small thumbnail',
    onclick: getImage,
})

browser.contextMenus.create({
    id: 'open-large-youtube-thumbnail-image',
    title: 'Get large thumbnail',
    onclick: getImage,
})

// https://stackoverflow.com/questions/71000139/javascript-regex-for-youtube-video-and-shorts-id
const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/

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
