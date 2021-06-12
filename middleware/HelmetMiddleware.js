const xssFilter = require('x-xss-protection')
const csp = require('helmet-csp')

const helmet = require('helmet'),
    express = require('express'),
    app = express()

// Модуль helmet представляет собой набор функций промежуточной обработки (middleware),
// устанавливающие определенные HTTP-заголовки для обеспечения безопасности

app.use(helmet())

//X-XSS-Protection: позволяет браузеру прекращать загрузку страницы, если он обнаружил отраженную XSS атаку
app.use(xssFilter())

//Content-Security-Policy: позволяет предотвращать такие атаки как XSS и атаки внедрения данных
app.use(csp({
    directives: {
        defaultSrc: ["'self'"],  // значение по умолчанию для всех директив, которые отсутствуют
        scriptSrc: ["'self'"],   // помогает предотвратить атаки XSS
        frameAncestors: ["'none'"],  // помогает предотвратить атаки Clickjacking
        styleSrc: ["'none'"]
    }
}))
