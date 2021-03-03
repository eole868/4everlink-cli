#!/usr/bin/env node

const { initConf } = require('../src/update-conf')

initConf({
    host: '127.0.0.1',
    port: 9094,
    token: '',
})