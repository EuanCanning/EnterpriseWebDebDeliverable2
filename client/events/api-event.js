const create = async (params, credentials, event) => {
  try {
      let response = await fetch('/api/events/' + params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(event)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const list = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/events/' + params.userId, {
      method: 'GET',
      signal: signal,
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/events/' + params.userId + '/' + params.eventId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (params, credentials, event) => {
  try {
    let response = await fetch('/api/events/' + params.userId + '/' + params.eventId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(event)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/events/' + params.userId + '/' + params.eventId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const userrsvp = async (params, credentials) => {
  try {
    let response = await fetch('/api/rsvp/' + params.userId + '/' + params.eventId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const userunrsvp = async (params, credentials) => {
  try {
    let response = await fetch('/api/unrsvp/' + params.userId + '/' + params.eventId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const userRsvps = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/rsvps/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
    

export {
  create,
  list,
  read,
  update,
  remove,
  userrsvp,
  userunrsvp,
  userRsvps
}
