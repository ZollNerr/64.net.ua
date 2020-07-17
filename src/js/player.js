let video;
let durationControl;
let soundControl;
let intervalId;


// Документ полностью загружен
$().ready(function() {
    video = document.getElementById("player")

    // Вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // Обработчик событитй для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++) {
        playButtons[i].addEventListener('click',playStop);
    }

    // Обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)

    // Обработчик событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown',setVideoDuration);
    durationControl.min = 0;
    durationControl.value = 0;

    // Обработчик событий для ползунка громкости
    soundControl = document.getElementById("micLevel");
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // Задаем максимальные и минимальные значения громкости
    soundControl.min = 0;
    soundControl.mid = 5;
    soundControl.max = 10;

    // Присваиваем ползунку максимальное значение
    soundControl.value = soundControl.mid;


    // Обрабатываем окончание видео 
    video.addEventListener('ended', function () {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
    }, false);

});

/* 
    Воспроизведение видео

*/


function playStop(){
    // Показывает или скрывает белую кномку play
    $(".video__player-img").toggleClass("video__player-img--active");
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение, если наоборот то остановим
    if (video.paused) {
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        $('.duration__img').addClass('active')

        }else{
        // останавливаем видео
        video.pause();
        clearInterval(intervalId)
        $('.duration__img').removeClass('active')
        }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}


/* 
    Реализуем функцию перемотки нашего видео
*/

function setVideoDuration() {
    if (video.paused) {
        video.play();
    }else{
        video.pause();
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}

/* 
    Функция обновления позиции ползунка продолжительности видео
*/
function updateDuration(){
    durationControl.value = video.currentTime;
}


/* 
    Управление звуком
*/
function soundOf() {
    /* 
    Делаем проверку уровня громкости.
    Если у нашего видео есть звук, то мы его выключаем.
    Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */  
if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel*10;
}else{
    /* 
    Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
    Хранится в переменной soundLevel
    */

    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    }
}

/* 
    Управление звуком видео
*/
function changeSoundVolume(){


    video.volume = soundControl.value/10;
    console.log(video.volume)
}








/*let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
/*

 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();
*/