<?php
   
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>位置情報取得サンプル</title>

    <script>
    /*
    // Geolocation APIに対応している
    if (navigator.geolocation) {
      alert("この端末では位置情報が取得できます");
    // Geolocation APIに対応していない
    } else {
      alert("この端末では位置情報が取得できません");
    }
*/
    // 現在地取得処理

    </script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script> 
    <script src="./js/jPages.js"></script> 
    <link rel='stylesheet' href='./css/style.css'>
    <link rel='stylesheet' href='./css/bootstrap-reboot.css'>
    <link rel='stylesheet' href='./css/pagination.css'>

    

</head>
<body>
    <div class="bar_area">
        <div class = "search">
            <div class = "tag">
                <nav>
                <ul>
                    <li id ="tag1" onclick ="tag_change(0)">
                    条件入力検索
                    </li>
                    <li id ="tag2" onclick ="tag_change(1)">
                    現在地からの検索
                    </li>
                </ul>
                </nav>
            </div>
            
            <div class ="search_area box" id ="box1">

                
                <h2>条件入力検索</h2>
                <form action="" method="post" id="select_form" name = "search">
                    <table>
                        <tr>
                            <td>地域選択：</td>
                            <td><select name="area" id = "area" ></select></td>
                        </tr>
                        <tr>
                            <td>キーワード：</td>
                            <td><input type="text" name = "keyword"></td>
                        </tr>
                        <tr>
                            <td>宴会収容人数：</td>
                            <td><input type="text" name = "party_capacity"></td>
                        </tr>

                    </table>

                    他の条件：
                    <br>
                    <table>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="wifi">WiFi
                            </td>
                            <td>
                            <input type="checkbox" name="need" value="wedding">ウェディング二次会等
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="course">コースあり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="free_drink">飲み放題
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="free_food">食べ放題
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="private_room">個室あり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="horigotatsu">掘りごたつあり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="tatami">座敷あり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="cocktail">カクテル充実
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="shochu">焼酎充実
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="sake">日本酒充実
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="wine">ワイン充実
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="card">カード可
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="non_smoking">禁煙席
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="charter">貸切可
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="ktai">携帯電話OK
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="parking">駐車場あり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="barrier_free">バリアフリー
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="sommelier">ソムリエがいる
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="night_view">夜景がキレイ
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="open_air">オープンエア
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="show">ライブ・ショーあり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="equipment">エンタメ設備
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="karaoke">カラオケあり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="band">バンド演奏可
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="tv">TV・プロジェクター
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="lunch">ランチあり
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="midnight">23時以降も営業
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="midnight_meal">23時以降食事OK
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="english">英語メニューあり
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="need" value="pet">ペット可
                            </td>
                            <td>
                                <input type="checkbox" name="need" value="child">お子様連れOK
                            </td>
                        </tr>
                    </table>
                    <a href="javascript:search.submit()" class = "btn-circle-stitch" id = "button2">検索</a>
                </form>
            </div>



            <div class = "local_search box" id ="box2">
                <div class = "center">
                    <h2>現在地からの検索</h2>
                    <form action="" method="post" id="select_form" name = "local">
                        <select name="range" id = "date" >
                            <!--<option disabled selected value></option>-->
                            
                            <option value="1">300m</option>
                            <option value="2">500m</option>
                            <option value="3">1000m</option>
                            <option value="4">2000m</option>
                            <option value="5">3000m</option>

                        </select>　
                        <a href="javascript:local.submit()" class = "btn-circle-stitch" id = "button1">検索</a>
                    </form>
                </div>

            </div>
        </div>
        

    </div>

    <h2 id = 'test'></h2>
    <div id = "place">
            <!--<input type="radio" name="place" onclick="main_content();"><span></span>-->
    </div>

</body>

<script src="./js/main.js"></script>
<script type="text/javascript" src="./js/jquery.pagination.js"></script>
</html>