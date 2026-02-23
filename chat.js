(function () {
  const STORAGE_KEY_PROFILE = 'u14_chat_profile'
  const STORAGE_KEY_ROOMS = 'u14_chat_rooms'
  const STORAGE_KEY_MESSAGES = 'u14_chat_messages'

  let profile = loadProfile()
  let rooms = loadRooms()
  let messages = loadMessages()
  let currentRoom = rooms[0]?.id || null
  let chatInitialized = false

  function loadProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROFILE)
      return raw ? JSON.parse(raw) : { id: null, name: '' }
    } catch {
      return { id: null, name: '' }
    }
  }

  function saveProfile(p) {
    profile = p
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(p))
  }

  function loadRooms() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ROOMS)
      if (!raw) {
        const defaultRooms = [{ id: 'general', name: 'General' }]
        localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(defaultRooms))
        return defaultRooms
      }
      return JSON.parse(raw)
    } catch {
      const defaultRooms = [{ id: 'general', name: 'General' }]
      localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(defaultRooms))
      return defaultRooms
    }
  }

  function saveRooms(r) {
    rooms = r
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(r))
  }

  function loadMessages() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MESSAGES)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  function saveMessages(m) {
    messages = m
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(m))
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
  }

  function openChat() {
    const chatOverlay = document.getElementById('chatOverlay')
    chatOverlay.classList.remove('hidden')
    chatOverlay.classList.add('flex')
    
    if (!chatInitialized) {
      htmx.trigger('#chatOverlay', 'htmx:trigger')
    }
  }

  function closeChat() {
    const chatOverlay = document.getElementById('chatOverlay')
    chatOverlay.classList.add('hidden')
    chatOverlay.classList.remove('flex')
  }

  function initChat() {
    const chatClose = document.getElementById('chatClose')
    const chatName = document.getElementById('chatName')
    const chatSaveProfile = document.getElementById('chatSaveProfile')
    const chatProfileHint = document.getElementById('chatProfileHint')
    const chatRoom = document.getElementById('chatRoom')
    const chatNewRoom = document.getElementById('chatNewRoom')
    const chatMessages = document.getElementById('chatMessages')
    const chatEmpty = document.getElementById('chatEmpty')
    const chatForm = document.getElementById('chatForm')
    const chatInput = document.getElementById('chatInput')
    const chatOverlay = document.getElementById('chatOverlay')

    if (chatInitialized) return
    chatInitialized = true

    function render() {
      chatName.value = profile.name || ''

      chatRoom.innerHTML = rooms
        .map(
          (r) =>
            `<option value="${r.id}" ${r.id === currentRoom ? 'selected' : ''}>${r.name}</option>`
        )
        .join('')

      const roomMessages = messages[currentRoom] || []
      if (roomMessages.length === 0) {
        chatEmpty.classList.remove('hidden')
        chatMessages.innerHTML = ''
      } else {
        chatEmpty.classList.add('hidden')
        chatMessages.innerHTML = roomMessages
          .map((m) => renderMessage(m))
          .join('')
      }
    }

    function renderMessage(m) {
      const isOwner = m.authorId === profile.id
      const time = new Date(m.createdAt).toLocaleString()
      const escapedText = escapeHtml(m.text)
      const escapedAuthor = escapeHtml(m.authorName || 'Anonymous')

      const avatarColors = [
        'from-[#1c3f93] to-[#2563eb]',
        'from-[#0ea5e9] to-[#06b6d4]',
        'from-[#a29063] to-[#f59e0b]',
        'from-[#10b981] to-[#059669]',
        'from-[#8b5cf6] to-[#7c3aed]',
      ]
      const colorIndex = Math.abs(hashCode(m.authorId || 'anon')) % avatarColors.length
      const avatarColor = avatarColors[colorIndex]
      const initial = escapedAuthor.charAt(0).toUpperCase()

      let actionsHtml = ''
      if (isOwner) {
        actionsHtml = `
          <div class="mt-3 flex gap-2">
            <button
              class="rounded-lg bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] px-3 py-1.5 text-xs font-bold text-[#1c3f93] transition hover:shadow-md"
              type="button"
              data-action="edit"
              data-id="${m.id}"
            >
              Edit
            </button>
            <button
              class="rounded-lg bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] px-3 py-1.5 text-xs font-bold text-[#dc2626] transition hover:shadow-md"
              type="button"
              data-action="delete"
              data-id="${m.id}"
            >
              Delete
            </button>
          </div>
        `
      }

      return `
        <li class="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md">
          <div class="flex gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor} text-lg font-bold text-white shadow-sm">
              ${initial}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2">
                <p class="truncate font-bold text-[#1c3f93]">${escapedAuthor}</p>
                <p class="shrink-0 text-xs text-[#64748b]">${time}</p>
              </div>
              <p class="mt-2 whitespace-pre-wrap text-[#334155]">${escapedText}</p>
              ${actionsHtml}
            </div>
          </div>
        </li>
      `
    }

    function hashCode(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
      }
      return hash
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    chatClose.addEventListener('click', closeChat)

    chatOverlay.addEventListener('click', (e) => {
      if (e.target === chatOverlay) closeChat()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !chatOverlay.classList.contains('hidden')) {
        closeChat()
      }
    })

    chatSaveProfile.addEventListener('click', () => {
      const name = chatName.value.trim()
      if (!name) {
        chatProfileHint.textContent = 'Please enter a name.'
        chatProfileHint.className = 'mt-2 text-xs text-[#dc2626] font-medium'
        return
      }
      if (!profile.id) profile.id = generateId()
      profile.name = name
      saveProfile(profile)
      chatProfileHint.textContent = 'Profile saved! You can now chat.'
      chatProfileHint.className = 'mt-2 text-xs text-[#059669] font-medium'
      render()
    })

    chatRoom.addEventListener('change', () => {
      currentRoom = chatRoom.value
      render()
    })

    chatNewRoom.addEventListener('click', () => {
      const name = prompt('New room name:')
      if (!name) return
      const trimmed = name.trim()
      if (!trimmed) return
      const id = generateId()
      rooms.push({ id, name: trimmed })
      saveRooms(rooms)
      currentRoom = id
      render()
    })

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = chatInput.value.trim()
      if (!text) return
      if (!profile.id || !profile.name) {
        chatProfileHint.textContent = 'Save your profile first to send messages.'
        chatProfileHint.className = 'mt-2 text-xs text-[#dc2626] font-medium'
        return
      }
      if (!currentRoom) {
        alert('Select a room first.')
        return
      }
      if (!messages[currentRoom]) messages[currentRoom] = []
      messages[currentRoom].push({
        id: generateId(),
        text,
        authorId: profile.id,
        authorName: profile.name,
        createdAt: Date.now(),
      })
      saveMessages(messages)
      chatInput.value = ''
      render()
    })

    chatMessages.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]')
      if (!btn) return
      const action = btn.dataset.action
      const id = btn.dataset.id
      if (action === 'edit') {
        const roomMessages = messages[currentRoom] || []
        const msg = roomMessages.find((m) => m.id === id)
        if (!msg) return
        const newText = prompt('Edit message:', msg.text)
        if (newText === null) return
        const trimmed = newText.trim()
        if (!trimmed) return
        msg.text = trimmed
        saveMessages(messages)
        render()
      } else if (action === 'delete') {
        if (!confirm('Delete this message?')) return
        messages[currentRoom] = (messages[currentRoom] || []).filter(
          (m) => m.id !== id
        )
        saveMessages(messages)
        render()
      }
    })

    if (profile.name) {
      chatProfileHint.textContent = 'Welcome back! Your profile is set.'
      chatProfileHint.className = 'mt-2 text-xs text-[#059669] font-medium'
    }

    render()
  }

  const chatOpen = document.getElementById('chatOpen')
  chatOpen.addEventListener('click', openChat)

  document.body.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.target.id === 'chatOverlay') {
      initChat()
    }
  })
})()
