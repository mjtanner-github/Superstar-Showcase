//script.js

onload=function(){

    var address;
    const address_field = document.getElementById("user_area");

    //Send Button Event Listener
    const send_button = document.getElementById("send_button");
    send_button.addEventListener("click", function(event){
        var pre_color = send_button.style.color;
        var pre_border_color = send_button.style.borderColor;
        send_button.style.color = "black";
        send_button.style.borderColor = "black";
        setTimeout(function(){
            send_button.style.color = pre_color;
            send_button.style.borderColor = pre_border_color;
            }, 500);
        var address = document.getElementById("address");
        var subject = document.getElementById("subject");
        var message = document.getElementById("message");
        var footer_0 = document.getElementById("footer_0");
        var footer_1 = document.getElementById("footer_1");
        var email_string="mailto:"+address.innerText+"?subject="+subject.innerText+"&body="+message.innerText+"%0D%0A%0D%0A"+footer_0.innerText+"%0D%0A%0D%0A"+footer_1.innerText;
        var date = new Date();
        localStorage.setItem("random_info_email_footer_"+date.getTime(),email_string);
        window = window.open(email_string, 'emailWindow');
        window.close();
    });     
}
    //API 0 Event Listener
    function processCheck_0(){
        var checkBox0 = document.getElementById("checkbox_0");
        if(checkBox0.checked==true){
            getQuotation();
        }
        if(checkBox0.checked==false){
            var footer = document.getElementById("footer_0");
            footer.innerHTML = "";
        }
    }

    //API 1 Event Listener
    function processCheck_1(){
        var checkBox1 = document.getElementById("checkbox_1");
        if(checkBox1.checked==true){
            getHistory();
        }
        if(checkBox1.checked==false){
            var footer = document.getElementById("footer_1");
            footer.innerHTML = "";
        }
    }

    
    //Get random quote 
    function getQuotation(){
        const api_url ="https://programming-quotes-api.herokuapp.com/Quotes/random";
        async function getapi(url){   
            const response = await fetch(url);
            var data = await response.json();
            var footer = document.getElementById("footer_0");
            footer.innerHTML = data.en+"\n - "+data.author+"\n";    
        }
        getapi(api_url);
    }

    function getHistory(){
        let today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        console.log(month+" "+day);
        var url = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/'+month+"/"+day;
        fetch(url)
            .then(function (response) {
                //Bail
                if(response.status == 204 || response.status < 200 || response.status > 299){
                return;
                }
                response.json()
                    .then(function (data) {
                        data = JSON.parse(JSON.stringify(data));
                        const interim_0 = Object.entries(data);
                        interim_1 = interim_0[3];
                        interim_2 = interim_1[1];
                        var element = interim_2[Math.floor(Math.random() * interim_2.length)];
                        var year = element.year;
                        var text = element.text;
                        var footer = document.getElementById("footer_1");
                        footer.innerHTML = "On this day in "+year+", "+text;
                    })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    
    
    
    
    
    





    

    
    



