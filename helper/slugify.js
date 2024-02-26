const slugify = require("slugify")
const toSlug = (name) => {
    return slugify(name, {
        lower: true
    })
}

module.exports = {
    toSlug
}