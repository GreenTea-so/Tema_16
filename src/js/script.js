import {forkJoin, fromEvent} from 'rxjs'
import {map, switchMap, mergeMap,  } from "rxjs/operators";
import {ajax} from 'rxjs/ajax'
import axios from 'axios';


const gitUrl = 'https://api.github.com/users';

const refresh = document.getElementById('refresh_btn');

const streamClickRefresh = fromEvent(refresh, 'click')
    .pipe(
        
        switchMap( v => ajax.getJSON(gitUrl).pipe(
           
            switchMap(q=>{
                const array = []
                for(let i=0; i<3; i+=1){
                    const randomUser = getRandom(0, q.length)
                    let zapros = ajax.getJSON(gitUrl + '/' + q[randomUser].login);
                    array.push(zapros);
                }

                return forkJoin(array);
            })
            )
        )
    );

streamClickRefresh.subscribe((data) =>{
    

    console.log(2, data)
    const content = document.getElementById('content')
    content.innerHTML = "";
    console.log(content)
    for(let i=0; i<data.length; i+=1) {
        createUser(data[i])
    }



})


const createUser = (data)=>{
    const contentUser = document.createElement('div');
        contentUser.classList.add('content_user');
        contentUser.innerHTML = `
        <div class="content_user_image">
                    <img class="content_user_image_img" src="${data.avatar_url}">
                </div>
                <div class="content_user_text">
                   
                    <div class="content_user_text_name">${data.name}</div>
                    <div class="content_user_text_location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${data.location}
                    </div>
                    <div class="content_user_text_login">@${data.login}</div>
                </div>
                <div class="content_user_item">
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="content_user_button">
                    
                    <button class="content_user_button_btn fas fa-trash-alt"></button>
                </div>
        `;
        content.appendChild(contentUser);
        

        const newButtonCollection = document.getElementsByClassName('content_user_button_btn')
        const newButton = newButtonCollection[newButtonCollection.length-1]
        const streamNewButton = fromEvent(newButton, 'click')
            .pipe(
                map(data=>{
                    data.toElement.parentElement.parentElement.remove()
                }

                ),
                switchMap( v => ajax.getJSON(gitUrl).pipe(
                    switchMap(data=> {
                        let randomUser = getRandom(0, data.length)
                        console.log(data, randomUser)
                        const ajaxUser = ajax.getJSON(gitUrl + '/' + data[randomUser].login)
                        return ajaxUser
                    })
                ))
            );
        
        streamNewButton.subscribe(data=>{
            console.log(data)
            createUser(data)
        })
}

refresh.click()

        

    

