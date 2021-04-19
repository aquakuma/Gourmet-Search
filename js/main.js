let lat = 0;
let lon = 0;
var data_array = [];
var shop_num = 0;
area();
function getPosition() {
    // 現在地を取得

    navigator.geolocation.getCurrentPosition(
      // 取得成功した場合
      function(position) {
            //alert("緯度:" + position.coords.latitude + ",経度" + position.coords.longitude);
            //console.log(position.coords.latitude);
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;


            let range = document.local.range.value;
            shop_list(lat, lng,range);
      },
      // 取得失敗した場合
      function(error) {
        switch(error.code) {
          case 1: //PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:"+error.code+")");
            break;
        }
      }
    );
}

function shop_list(lat, lng, range) {
    console.log(lat);
    console.log(lng);

    $.ajax({
        url: './api.php', //送信先
        type: 'POST', //送信方法
        datatype: 'json', //受け取りデータの種類
        data: {
            'lat': lat,
            'lng': lng,
            'range': range,
            'mode':"local"
        }


    })
    // Ajax通信が成功した時
    .done( function(data) {
        data_display(data);
            
    })
    // Ajax通信が失敗した時
    .fail( function(data) {
        console.log('通信失敗');
        console.log(data);
    })

}




function search() {

    let needs = document.search.need;
    let keyword = document.search.keyword.value;
    let party_capacity = document.search.party_capacity.value;
    let area = document.search.area.value;
    console.log(keyword);
    console.log(party_capacity);
    let flag = 0;
    
    const arr = [];
    for (let i = 0; i < needs.length; i++) {
        if (needs[i].checked) { 
            arr.push(needs[i].value);
            flag = 1;
            //console.log(needs[i].value);
        }
    }
    
    
    $.ajax({
        url: './api.php', //送信先
        type: 'POST', //送信方法
        datatype: 'json', //受け取りデータの種類
        data: {
            'area': area,
            'keyword': keyword,
            'party_capacity': party_capacity,
            'needs': arr,
            'flag':flag,
            'mode':"search"
        }


    })
    // Ajax通信が成功した時
    .done( function(data) {
        data_display(data);
            
    })
    // Ajax通信が失敗した時
    .fail( function(data) {
        console.log('通信失敗');
        console.log(data);
    })
}


function area() {

    
    $.ajax({
        url: './api.php', //送信先
        type: 'POST', //送信方法
        datatype: 'json', //受け取りデータの種類
        data: {
            'mode':"area"
        }


    })
    // Ajax通信が成功した時
    .done( function(data) {
        data_array = data;
        shop_num = data['results_returned'];
        console.log('通信成功');
        console.log(data);

        var area = document.getElementById('area');

        for (let i = 0; i < data['results_returned']; i++){
            
            var option = document.createElement("option");
            option.textContent = data['large_area'][i]['name'];
            option.setAttribute('value',data['large_area'][i]['code']);
            area.appendChild(option);
        }

        
    })
    // Ajax通信が失敗した時
    .fail( function(data) {
        console.log('通信失敗');
        console.log(data);
    })
}


//レスポンスのデータ表示
function data_display(data){
    data_array = data;
        shop_num = data['results_returned'];
        console.log('通信成功');
        console.log(data);
        console.log("debug:" + data['results_returned']);
        
        var place = document.getElementById('place');
        while (place.querySelector('div')) {
            place.querySelector('div').remove();
        }
        while (place.querySelector('h3')) {
            place.querySelector('h3').remove();
        }

        var result = document.createElement("div");
        var details = document.createElement("div");

        result.classList.add('items');


        if (data['results_returned'] != 0) {
            for (let i = 0; i < data['results_returned']; i++){
                /* 
                if (i % 4 == 0) {
                    if (i != 0) {
                        place.appendChild(div);
                    }
                    var div = document.createElement("div");
                    div.classList.add('selection');
                    
                    let page = Math.floor(i / 4) + 1;
                    console.log('page-' + String(page));
                    div.id = 'page-' + String(page);
                }
                var name = document.createElement("h3");
                name.textContent = data['shop'][i]['name'];
                console.log(data['shop'][i]['name']);
                div.appendChild(name);
                */
                
                //店一覧
                var child_div = document.createElement("div");
                child_div.classList.add('item');
                


                var img = document.createElement("img");
                img.setAttribute('src', data['shop'][i]['photo']['pc']['l']);
                img.setAttribute('alt', i);
                img.setAttribute('onclick', `detail(${i})`); 
                child_div.appendChild(img);

                var name = document.createElement("h3");
                name.textContent = data['shop'][i]['name'];
                console.log(data['shop'][i]['name']);
                child_div.appendChild(name);

                var p = document.createElement("p");
                p.textContent = data['shop'][i]['access'];
                child_div.appendChild(p);

                
                result.appendChild(child_div);


                //詳細画面

                var child_div = document.createElement("div");
                child_div.setAttribute('onclick', `detail_close(${i})`); 
                child_div.classList.add('popup');
                child_div.id = `shop-${i}`;
                var content = document.createElement("div");
                content.classList.add('content');

                var h3 = document.createElement("h3");
                h3.textContent = data['shop'][i]['name'];
                content.appendChild(h3);

                var div = document.createElement("div");
                div.style.textAlign = "center";
                var img = document.createElement("img");
                img.setAttribute('src', data['shop'][i]['photo']['pc']['l']);
                div.appendChild(img);
                content.appendChild(div);

                var detail_area = document.createElement("div");
                detail_area.classList.add('detail_area');

                var table = document.createElement("table");
                table.classList.add('detail_table');


                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.classList.add('td1');
                td.textContent = "アクセス";
                tr.appendChild(td);
                var td = document.createElement("td");
                td.textContent = data['shop'][i]['access'];
                tr.appendChild(td);
                table.appendChild(tr);

                
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.classList.add('td1');
                td.textContent = "住所";
                tr.appendChild(td);
                var td = document.createElement("td");
                td.textContent = data['shop'][i]['address'];
                tr.appendChild(td);
                table.appendChild(tr);


                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.classList.add('td1');
                td.textContent = "営業時間";
                tr.appendChild(td);
                var td = document.createElement("td");
                td.textContent = data['shop'][i]['open'];
                tr.appendChild(td);
                table.appendChild(tr);


                
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.classList.add('td1');
                td.textContent = "料金";
                tr.appendChild(td);
                var td = document.createElement("td");
                td.textContent = data['shop'][i]['budget']['average'];
                tr.appendChild(td);
                table.appendChild(tr);

                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.classList.add('td1');
                td.textContent = "予約ページ";
                tr.appendChild(td);
                var td = document.createElement("td");
                var a = document.createElement("a");
                a.setAttribute('href', data['shop'][i]['urls']['pc']);
                a.setAttribute('target', "_blank");
                a.setAttribute('ref', "noopener noreferrer");
                a.textContent = data['shop'][i]['urls']['pc'];
                td.appendChild(a);
                tr.appendChild(td);
                table.appendChild(tr);


                detail_area.appendChild(table);
                content.appendChild(detail_area);
                /*
                var close = document.createElement("a");
                close.setAttribute('href', `javascript: detail_close(${i})`);
                close.textContent = "閉じる";
                content.appendChild(close);

                */
                
                child_div.appendChild(content);
                details.appendChild(child_div);

                
            }
            place.appendChild(result);
            place.appendChild(details);
            $('.items').pagination({
                itemElement : '> .item' // アイテムの要素
            });
  
        }
        else {
            var h3 = document.createElement("h3");
            h3.textContent = "検索結果はありません";
            place.appendChild(h3);
            console.log('検索結果はありません');
        }
}






const button1 = document.getElementById('button1');

button1.addEventListener('click', (e) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault();

    getPosition();
});
  
const button2 = document.getElementById('button2');

button2.addEventListener('click', (e) => {
    // デフォルトのイベントをキャンセル
    e.preventDefault();

    search();
});



function detail(i) {
    $(`#shop-${i}`).addClass('show').fadeIn();
}
function detail_close(i) {
    $(`#shop-${i}`).addClass('show').fadeOut();


    //コンテンツにクリックは閉じない
    $( '.content' ).on( 'click', function( e ){
        e.stopPropagation();
    } );

}



function tag_change(i){
    tag_array = ["box1","box2"];
    tag = document.getElementById(i);
    tag_array.forEach(function(element, index){
        if(index == i){
            content = document.getElementById(element);
            content.style.display ="block";

            tag = document.getElementById("tag"+String(index+1));
            tag.classList.add('tag_current');
        }
        else{
            content = document.getElementById(element);
            content.style.display ="none";

            tag = document.getElementById("tag"+String(index+1));
            tag.classList.remove('tag_current');
        }
    });
    
}



//window.addEventListener('DOMContentLoaded', area);




