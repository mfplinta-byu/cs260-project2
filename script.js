function getIpData(address = "") {
    let fetchObj;

    if (address === "") {
        fetchObj = fetch('https://ipapi.co/json/')
    } else {
        fetchObj = fetch(`https://ipapi.co/${address}/json/`)
    }

    return fetchObj.then(
        (response) => {
            if (response.status !== 200) {
                return {
                    exception: 'ipapi.co reported an error: ' + response.statusText
                }
            }

            return response.json()
        }
    )
}

if (document.getElementById('js-indexPage') !== null) {
    getIpData().then((json) => {
        console.log(json)

        document.getElementById('my-ip').innerText = json.ip
        document.getElementById('my-details-label').hidden = false
        document.getElementById('my-location').hidden = false
        document.getElementById('my-general-info').innerHTML =
            `
<table>
<tr><td>Subnet</td><td>${json.network}</td></tr>
<tr><td>Postal Code</td><td>${json.postal}</td></tr>
<tr><td>Timezone</td><td>${json.timezone}</td></tr>
<tr><td>City</td><td>${json.city}</td></tr>
<tr><td>State</td><td>${json.region_code}</td></tr>
<tr><td>Provider</td><td>${json.org}</td></tr>
<tr><td>Latitude</td><td>${json.latitude}</td></tr>
<tr><td>Longitude</td><td>${json.longitude}</td></tr>
</table>
            `
        document.getElementById('my-location')
            .setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyBE3UCYF3I4aP2DoF3s4QYhHBxtBlZj28A&q=${json.latitude}+${json.longitude}`)
    })
} else if (document.getElementById('js-searchPage') !== null) {
    document.getElementById('search-submit').addEventListener('click', (event) => {
        event.preventDefault()

        getIpData(document.getElementById('search-ip-field').value).then((json) => {
            console.log(json)

            document.getElementById('search-details-label').hidden = false
            document.getElementById('search-location').hidden = false
            document.getElementById('search-general-info').innerHTML =
                `
<table>
<tr><td>Subnet</td><td>${json.network}</td></tr>
<tr><td>Postal Code</td><td>${json.postal}</td></tr>
<tr><td>Timezone</td><td>${json.timezone}</td></tr>
<tr><td>City</td><td>${json.city}</td></tr>
<tr><td>State</td><td>${json.region_code}</td></tr>
<tr><td>Provider</td><td>${json.org}</td></tr>
<tr><td>Latitude</td><td>${json.latitude}</td></tr>
<tr><td>Longitude</td><td>${json.longitude}</td></tr>
</table>
            `
            document.getElementById('search-location')
                .setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyBE3UCYF3I4aP2DoF3s4QYhHBxtBlZj28A&q=${json.latitude}+${json.longitude}`)
        })
    })
}