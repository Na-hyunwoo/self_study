const backToTop=document.getElementById('backtotop');

const checkScroll = ()=>{
    let pageYOffset = window.pageYOffset;

    if(pageYOffset!==0){
        backToTop.classList.add('show');
    }else{
        backToTop.classList.remove('show');
    }
}

const moveBackToTop =() =>{
    if(window.pageYOffset>0){
        window.scrollTo({top:0,behavior:"smooth"})
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click',moveBackToTop);

/*---------------------------------------------------------------*/

function transformNext(event){
    const slideNext=event.target;
    const slidePrev=slideNext.previousElementSibling;

    const classList=slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi=classList.getAttribute('data-position');
    const liList=classList.getElementsByTagName('li');

    if(Number(activeLi)<0){
        activeLi=Number(activeLi)+260;

        slidePrev.style.color='#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click',transformPrev);

        if(Number(activeLi)==0){
            slideNext.style.color='#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click',transformNext);
        }
    }

    classList.style.transition='transform 1s';
    classList.style.transform='translateX('+String(activeLi)+'px)';
    classList.setAttribute('data-postion',activeLi);
}

function transformPrev(event){
    const slidePrev=event.target;
    const slideNext=slidePrev.nextElementSibling;

    const classList=slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi=classList.getAttribute('data-postion');
    const liList=classList.getElementsByTagName('li');

    if(classList.clientWidth<(liList.length*260+Number(activeLi))){
        activeLi=Number(activeLi)-260;

        if(classList.clientWidth>(liList.length*260+Number(activeLi))){
            slidePrev.style.color='#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
        }
        slideNext.style.color='#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click',transformNext);
    }
    classList.style.transition='transform 1s';
    classList.style.transform='translateX('+String(activeLi)+'px)';
    classList.setAttribute('data-position',activeLi);
}

const slidePrevList=document.getElementsByClassName('slide-prev');

for(let i=0;i<slidePrevList.length;i++){
    let classList=slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList=classList.getElementsByTagName('li');

    if(classList.clientWidth<(liList.length*260)){
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click',transformPrev);
    }else{
        const arrowContainer = slidePrevList[i].parentNode;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}


/*------------------------------------------------------------------------------------*/

let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;

function processTouchMove(event){

}

function processTouchStart(event){
    mouseStart=true;

    event.preventDefault();
    touchstartX=event.clientX;
    currentIImg=event.target;

    currentImg.addEventListener('mousemove',processTouchMove);
    currentImg.addEventListener('mouseup',processTouchEnd);

    currentClassList=currentImg.parentElement.parentElement;
    currentActiveLi=currentClassList.getAttribute('data-position');

}

function processTouchEnd(event){

}

window.addEventListener('dragend',processTouchEnd);
window.addEventListener('mouseup',processTouchEnd);

const classImgLists=document.querySelector('ul li img');
for(let i=0;i<classImgLists.length;i++){
    classImgLists[i].addEventListener('mousedown',processTouchStart);
}



