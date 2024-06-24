class UI {
    constructor() {}

    // properties
    static localUrl = "http://127.0.0.1:3000";
    static url = "https://somar-jaber.serv00.net";
    static pageSize = 10;

    // methods
    static async fetchData(url, method, token, dataToSend = {}) {
        method = method.toUpperCase();
        return await fetch(url, {  // http://127.0.0.2:3000/api/auth
            method: method,
            headers: {
                'Content-Type': 'application/json',  // Specify that you're sending JSON data
                'x-auth-token': token,
        },
            // mode: "no-cors",
            body: method != "GET"? JSON.stringify(dataToSend): null,  // Convert your data object to a JSON string
        })
            .then((response) => {
                if (!response.ok) {
                    // If the status is not 200, try to get the error message from the response
                    return response.text().then(text => {
                        throw new Error(`HTTP error! \nStatus: ${response.status}, \nMessage: ${text}`);
                    });
                }

                // Check if the response contains JSON data
                if (response.headers.get('content-type').includes('application/json')) {
                    return response.json();
                } else {
                    // If not JSON, return the response as plain text
                    return response.text();
                }

            })  // i have removed the catch method because i want to handle every setiuation differently from thier methods  
    }  // fetchData


    static async auth (email , password) {
        let token = await this.fetchData(`${this.url}/api/auth`, "POST", null, {email: email, password: password});
        localStorage.setItem("token", token)
        return true;
    }  // auth


    static async redirect(url , save = false) {
       // Get the JWT from wherever it's stored
        var token = localStorage.getItem('token');

        // Create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Configure it: GET-request for the URL 
        xhr.open('GET', url, true);

        // Set the x-auth-token header
        xhr.setRequestHeader('x-auth-token', token);

        if (save) {
            let arr = localStorage.getItem("stack");
            arr = arr.split(",");
            console.log(arr);
            arr.push(url);
            localStorage.setItem("stack", arr.join(","));
        }
        
        // Send the request over the network
        xhr.send();

        // This will run after the response is received
        xhr.onload = function() {
            if (xhr.status != 200) { // analyze HTTP response status
                // // Handle error
                // console.error('Error: ' + xhr.status);
                // return;
            }

            // Get the response body
            var response = xhr.response;

            // Insert the response in the iframe
            var iframeDoc;
            try {
                iframeDoc = document.querySelector('.frame').contentWindow.document;
            }
            catch (ex) {
                iframeDoc = window.top.document.querySelector('.frame').contentWindow.document;
            }
            iframeDoc.open();
            iframeDoc.write(response);
            iframeDoc.close();
        };

        xhr.onerror = function() {
            // console.error('Request failed');
        };

    }
}; // UI class
