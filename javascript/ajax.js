//「change video」ボタンをクリックするたびにタイトル、内容、動画が切り替わること
//初回のみajax.jsonからデータを取得するコードにリファクタリングされていること

let indexNumber = 0;
let cacheData = null;
const button = document.getElementById('btn');
const titleArea = document.getElementById('title');
const contentArea = document.getElementById('content');
const videoArea = document.getElementById('video');

function fetchData(){
    return fetch('ajax.json')
    .then(response => {
        if(!response.ok){
            throw new Error('Network was not');
        }
        return response.json();
    })
    .then(data => {
        cacheData = data;
        updateVideo();
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        titleArea.textContent = 'データの読み込みに失敗しました';
    });
}

function updateVideo(){
    if(cacheData && cacheData.length > indexNumber){
        var videoInfo = cacheData[indexNumber];
        titleArea.textContent = videoInfo.title;
        contentArea.textContent = videoInfo.content;
        videoArea.src = videoInfo.url;
        indexNumber = (indexNumber+1) % cacheData.length;
    }
}

button.addEventListener('click', () =>{
    if(!cacheData){
        fetchData();
    } else {
        updateVideo();
    }
});

document.addEventListener('DOMContentLoaded' , () =>{
});
