const axios = require('axios');

const anchor_url = 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-&co=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbTo0NDM.&hl=ar&v=vP4jQKq0YJFzU6e21-BGy3GP&size=normal&sa=action&cb=i8do82h1vtq0'
var url_base = 'https://www.google.com/recaptcha/'
var re = new RegExp('([api2|enterprise]+)\/anchor\?(.*)');
var matches = anchor_url.match(re);
url_base += matches[0]+'/';
params = matches[1]
axios({
    method: 'GET',
    url: url_base + 'anchor',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    params: {params}
}).then(response => { 
    var re = new RegExp('"recaptcha-token" value="(.*?)"');
    var token = response.data.match(re)
    params2 = ""
    for (var pair of params.split('&')) {  
        params2 += pair.split('=')
    }
    var post_data = params2['v'] + token + params2['k'] + params2['co']
    var re = new RegExp('value="(.*?)"');
    var key = post_data.match(re)[0].split('"')[1]
    console.log(key)
}).catch(error => {
    console.log(error)
})
