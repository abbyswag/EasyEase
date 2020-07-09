//global variables
const home = document.querySelector('.home-page')
const community = document.querySelector('.community-page')
const header_navbar = document.querySelector('.header-navbar')
//for explore navbar
document.querySelector('.header-icon').addEventListener('mouseover',()=>{
    header_navbar.style.display = 'block'
})
document.querySelector('.header-icon').addEventListener('mouseout',()=>{
    header_navbar.style.display = 'none'
})
let explore_btn_count = 1
document.querySelector('.header-icon').addEventListener('click',()=>{
    if(explore_btn_count%2===1)header_navbar.style.display = 'block'
    else header_navbar.style.display = 'none'
    explore_btn_count++
})
//for logger area
let login_page_count = 1
let signup_page_count = 1
const login_page = document.querySelector('.login-page')
const signup_page = document.querySelector('.signup-page')
document.querySelector('.login-btn')
.addEventListener('click',()=>{
    if(login_page_count%2===1)login_page.style.display = 'grid'
    else login_page.style.display = 'none'
    login_page_count++
})
document.querySelector('.cross-icon')
.addEventListener('click',()=>signup_page.style.display= 'none')
document.querySelector('.login-form-cancel')
.addEventListener('click',()=>login_page.style.display = 'none')
document.querySelector('.signup-btn')
.addEventListener('click',()=>{
    if(signup_page_count%2===1)signup_page.style.display = 'grid'
    else signup_page.style.display = 'none'
    signup_page_count++
})
// for responsive header
let header_btn_count = 1
document.querySelector('.header-logger-navbar-logo')
.addEventListener('click',()=>{
    if(header_btn_count%2===1){
        document.querySelectorAll('.header-btn').forEach((btn)=>{
            btn.style.width = '40%'
        })
    }else{
        document.querySelectorAll('.header-btn').forEach((btn)=>{
            btn.style.width = '0%'
        })
    }
    header_btn_count++
})
// for msg box
document.querySelector('.msg-cross-icon').addEventListener('click',()=>{
    document.querySelector('.msg-box').style.display = 'none'
})


//post req to server for signup
let signup_inputs = document.querySelectorAll('.signup-form input')
document.querySelector('.signup-form-submit-btn').addEventListener('click',()=>{
    fetch('/member',{
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            username: signup_inputs[0].value,
            email:signup_inputs[1].value,
            password:signup_inputs[2].value
        })
    }).then((res)=>{
        return res.json()
    }).then((msg)=>{
        let messageBox = document.querySelector('.msg-box')
        messageBox.style.display = 'flex'
        document.querySelector('.msg').innerHTML = msg.message
        setTimeout(()=>{
            messageBox.style.display = 'none'
        },5000)
    })
    .catch((err)=>console.log(err))
})
//post req for login
const login_inputs = document.querySelectorAll('.login-form input')
document.querySelector('.login-form-submit').addEventListener('click',()=>{
    fetch('/login',{
        method: 'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            username: login_inputs[0].value,
            password:login_inputs[1].value
        })
    }).then((res)=>{
        return res.json()
    }).then((msg)=>{
        let messageBox = document.querySelector('.msg-box')
        messageBox.style.display = 'flex'
        document.querySelector('.msg').innerHTML = msg.message
        setTimeout(()=>{
            messageBox.style.display = 'none'
        },5000)
    }).catch((err)=>console.log(err))
})
