document.addEventListener('DOMContentLoaded', () => {
  let urlObj = {}
  const urlInput = document.querySelector('#url')
  const slugInput = document.querySelector('#slug')
  const newUrl = document.querySelector('#newUrl')
  const generatedSection = document.querySelector('#generated')
  const shortenBtn = document.querySelector('button.shorten')
  const copyBtn = document.querySelector('button.copy')
  const errorSection = document.querySelector('#error')
  if (shortenBtn) {
    shortenBtn.addEventListener('click', () => {
      // Reset the error section
      if (errorSection) {
        errorSection.classList.add('hide')
      }

      if (urlInput) {
        urlObj = { ogUrl: urlInput.value }

        if (slugInput) {
          urlObj = { ...urlObj, slug: slugInput.value }
        }
      }

      fetch('/urls', {
        method: 'POST',
        body: JSON.stringify(urlObj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Handle if response is bad request
          if (data.statusCode === 400) {
            if (errorSection) {
              errorSection.classList.remove('hide')
            }
          } else {
            if (newUrl) {
              newUrl.textContent = data.url
              if (generatedSection) {
                generatedSection.classList.remove('hide')
              }
              shortenBtn.innerText = 'Shortened!'
              setTimeout(() => (shortenBtn.innerText = 'Shorten'), 3000)
            }
          }
        })
    })

    urlInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()

        shortenBtn.click()
      }
    })

    copyBtn.addEventListener('click', () => {
      copyToClipboard(newUrl.textContent)
      copyBtn.innerText = 'Copied!'
      setTimeout(() => (copyBtn.innerText = 'Copy'), 3000)
    })
  }
})

const copyToClipboard = (str) => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
