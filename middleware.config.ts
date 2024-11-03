export default {
    mapping: {
        '/login':               ['guest'],
        '/register':            ['guest'],
        '/forgot-password':     ['guest'],
        '/reset-password':      ['guest'],
        '/email-not-verified':  ['auth', 'email-not-verified'],
        '/verify-2fa':          ['auth', 'email-verified', '2fa-not-verified'],
        '/not-enabled':         ['auth', 'email-verified', '2fa-verified', 'not-enabled'],
        '/blocked':             ['auth', 'email-verified', '2fa-verified', 'enabled', 'blocked'],
        '/change-password':     ['auth', 'email-verified', '2fa-verified', 'enabled', 'not-blocked', 'require-password-change'],
        '/setup-2fa':           ['auth', 'email-verified', '2fa-verified', 'enabled', 'not-blocked', 'dont-require-password-change', 'require-two-factor-setup'],
        'DEFAULT':              ['auth', 'email-verified', '2fa-verified', 'enabled', 'not-blocked', 'dont-require-password-change', 'dont-require-two-factor-setup'],
    },
}