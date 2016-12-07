<?php
$WoWRealm = "https://us.api.battle.net/wow/realm/status?locale=en_US&jsonp=getRealm&apikey=m3fpsc5749akmzbtycd4w8q38g5tnp7m" . $_GET["type"] . "," . $_GET["name"] . "," . $_GET["status"] . "," . $_GET["population"] . "," . $_GET["connected_realms"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WoWRealm);
?>