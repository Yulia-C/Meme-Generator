'use strict'

function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

function loadSearchHistoryFromStorage() {
    const savedHistory = loadFromStorage(STORAGE_MAIN)
    if (savedHistory && Array.isArray(savedHistory)) {
        gSearchHistory = savedHistory
        gKeywordSearchCountMap = updateKeywordSearchMap(gSearchHistory)
    }
}