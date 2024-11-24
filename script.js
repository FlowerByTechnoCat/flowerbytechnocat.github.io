/*alert(window.innerHeight); */
function gsid (elid)
{
    return document.getElementById(elid).style;
}
function p (amo)
{
    return Math.round(amo)+"px";
}/*инкапсуляция*/
function setSqr(objStyle,dimension,isRound)
{
    objStyle.width = p(dimension);
    objStyle.height= objStyle.width;
    if(isRound)     setR(objStyle,dimension/2);
}
function setR(objStyle,dimension)
{
    objStyle.borderRadius = p(dimension);
}
let contSt, imgSt, colSt, lampSt;
[contSt, imgSt, colSt, lampSt] = [gsid("colorContainer"),gsid("image"),gsid("color"),gsid("lamp")];
let w = window.innerWidth;
let h = window.innerHeight;
let orientationIsAlbub =w>h?true:false;
let s = orientationIsAlbub?h:w;
let freeSpace = w-s//свободное пространство сбоку/снизу
let interfaceSize = (freeSpace)<s/3?s:freeSpace;

setSqr(contSt,s,false);
setSqr(imgSt,s*4/6,false);
setSqr(colSt,s*4/6,true);
setR(imgSt,s/4);
lampSt.width=p(s*2/6);
lampSt.height=p(s/2);
colSt.boxShadow="0px 0px "+Math.floor(s/8)+"px "+Math.floor(s/8)+"px rgb(255, 255, 255) inset"
imgSt.boxShadow="0px 0px "+Math.floor(s/100*7)+"px "+Math.floor(s/100*8)+"px rgb(255, 255, 255)"




gsid("favourite").width = p(interfaceSize*0.99);
gsid("interface").fontSize = p(interfaceSize/20);
gsid("confirm").fontSize = p(interfaceSize/20);
gsid("confirm").height = p(interfaceSize/15);
gsid("confirm").width = p(interfaceSize/4+20);
gsid("set").width = p(interfaceSize/15);
gsid("set").height = p(interfaceSize/15);


if(freeSpace>s/3)  {
    let body =  gsid("body");
    body.flexWarp = "nowrap";
    body.alignContent = "center"
    body.flexDirection = "row"
    contSt.marginRight= p(s/40);}

else    {
    let body =  gsid("body");
    body.flexWrap = "wrap";
    body.justifyContent = "center";
    body.flexDirection = "column";
     contSt.marginBottom= p(s/40);
}









let favDivs = []
let i = 0;
    do{
      const element = document.getElementById(`fav${i}`)
      i=i+1;
      if(element)
      {favDivs.push(element);
        setSqr(element.style,interfaceSize/7,false);
        setR(element.style,interfaceSize/20)}
        
    else break;
    }while(true);

    favDivs.forEach((element, i) => {
      element.onclick = function (){
            
        if(document.getElementById("set").checked)
        {element.style.backgroundColor = document.getElementById("colorSelector").value;
         sendToStorage(i,element.style.backgroundColor);
         document.getElementById("color").style.backgroundColor = document.getElementById("colorSelector").value;
        }
        else
        {   
            let r,g,b;
          //if (!(r&&g&&b))   return
          [r,g,b]= String(element.style.backgroundColor).slice(4,-1).split(", ");
            //if (!(r&&g&&b))   return
            //alert(r+' '+g+' '+b)
            let rr, gg, bb;
            [rr,gg,bb]=[Number(r),Number(g),Number(b)]
            //alert(rr+' '+gg+' '+bb)
            //[r,g,b] = [rr.toString(16),gg.toString(16),bb.toString(16)]
            r = rr.toString(16)
            b = bb.toString(16)
            g = gg.toString(16)
            r = r.length===1?"0"+r:r;
            g = g.length===1?"0"+g:g;
            b = b.length===1?"0"+b:b;
          //alert(r+g+b);
          let colorValue = "#"+r+g+b;
          //alert(colorValue)
            document.getElementById("colorSelector").value = colorValue;
        document.getElementById("color").style.backgroundColor = document.getElementById("colorSelector").value;
        }
        

      }}
    )


document.getElementById("colorSelector").onchange = function()
{   sendToStorage("color",document.getElementById("colorSelector").value);
 document.getElementById("color").style.backgroundColor = document.getElementById("colorSelector").value;
}

//получение json




  async function getFromGit()//используем getFromGit().colors для получения массива цветов с github 
{
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: { Authorization: `token ${TOKEN}` },
      }
    );
    const data = await response.json();
    const content = atob(data.content); // Раскодировать base64
    return { colors: JSON.parse(content), sha: data.sha };
  }


function sendToStorage(key, value){
    localStorage.setItem(key, value)
    return true
  }

  function getFromStorage(key){

    let item = localStorage.getItem(key)
    if(!item){
      console.log(`ошибка при взятии из localStorage ${key}. Его нет`);
        return false;
    }
    else return item 
  }










let cellSize = s*4/6/14.5;
/*let orientationIsAlbum = document.documentElement.clientWidth>document.documentElement.clientHeight;
orientationIsAlbum?(cellSize = Math.floor(document.documentElement.clientHeight/14.5)):(cellSize = Math.floor(document.documentElement.clientWidth/14.5));*/
//alert(cellSize);
const elements = document.querySelectorAll('.cell'); //устанавливаем размер каждой клетки
    elements.forEach(element => {
        element.onclick = function(){alert(1)}
        element.style.width = cellSize + 'px'; 
        element.style.height = cellSize + 'px'; 
    }); 
let rd = (Math.floor(cellSize / 3)) + 'px';
let bw= (Math.floor(cellSize / 20)) + 'px';
if (bw == '0px')  {bw = '1px';};
let hourss = document.querySelectorAll('.clckrnd');
    hourss.forEach(hr =>{hr.style.borderRadius = rd;
                       hr.style.borderWidth = bw;});
function positioning()
    {
    const coords = [        /*массив координат. первая строка это 12 или 0 часов и далее по стрелке. записаны координаты центра клетки в системе координат, где единичный отрезок это 1 клетка, а поле имеет размерность 14*14 клеток, координаты цетнра доски на поле 7,7 .левого верхнего угла 3,3*/
        7, 0.5,
        10, 1.5,
        12.5, 4,
        13.5, 7,
        12.5, 10,
        10, 12.5,
        7, 13.5,
        4, 12.5,
        1.5, 10,
        0.5, 7,
        1.5, 4,
        4, 1.5
    ];
    const hrs = document.querySelectorAll(".clckrnd");
    //alert(hrs[1]);
    let i = 0;
    //alert("started");
    hrs.forEach(tmp => {
            tmp.style.position = 'absolute';
            tmp.style.left = p(cellSize *(coords[i]-0.5)); /*условно если i = 2 то это 3 часа тоггда его координаты это coords[6] и coords[7], так как 0 часов это первый элемент массива */
            tmp.style.top = p(cellSize *(coords[i+1]-0.5));
            /*let msg = cellSize *(coords[i]-0.5)+' and ' + cellSize *(coords[i+1]-0.5);
            alert(msg);*/
            i++;
            i++;
        });
    }















window.onload = function ()
{
    positioning();
    favDivs.forEach((element, i) => {
        let StorVal = getFromStorage(i);
        if(StorVal)
        element.style.backgroundColor = StorVal;
        else
        element.style.backgroundColor = "rgb(255,255,255)";
        sendToStorage(i,"rgb(255,255,255)");
        
    });
    document.getElementById("colorSelector").value = getFromStorage("color");
    document.getElementById("color").style.backgroundColor = document.getElementById("colorSelector").value;

    
    
}





/*
//отправка json
  async function saveColor(newColor, colorIndex = -1) //сли есть первый аргумент и второй то значение от второго аргумента обновляется значением New Color. Иначе добавляется новый аргумент в конец массива
            {
    const { colors, sha } = await fetchColors();

    // Добавить новый цвет
    colorIndex==-1 ? colors.push(newColor) : colors[colorIndex]=newColor;

    // Отправить обновленный JSON на GitHub
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: { 
          Authorization: `token ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Added a new color",
          content: btoa(JSON.stringify(colors, null, 2)), // Закодировать в base64
          sha, // Указать SHA текущего файла
        }),
      }
    );

    if (response.ok) {
      console.log("Цвет сохранён!");
    } else {
      console.log("Ошибка сохранения!");
    }
  }




     if(localStorage.getItem('colors')){
      return localStorage.getItem('colors').split(",")


        const res = await fetchColors()
        localStorage.setItem('colors', res.colors)

*/
    
    
    
