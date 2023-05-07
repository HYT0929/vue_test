import Storage from 'good-storage'

const localStorage = {
    GetUserInfo: function () {
        return this.CookiesGet('userInfo')
    },
    GetUserId: function () {
        return this.CookiesGet('userInfo').user_id
    },
    CookiesPut: function (key, value) {
        return Storage.set(key, value)
    },
    CookiesGet: function (key) {
        return Storage.get(key)
    },
    CookiesClear: function () {
        return Storage.clear()
    },
    CookiesRemove: function (key) {
        return Storage.remove(key)
    },
    SessionPut: function (key, value) {
        return Storage.session.set(key, value)
    },
    SessionGet: function (key) {
        return Storage.session.get(key)
    },
    SessionClear: function () {
        return Storage.session.clear()
    },
    SessionRemove: function (key) {
        return Storage.session.remove(key)
    }
}

export default localStorage
