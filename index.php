<?php
/**
 * Created by PhpStorm.
 * User: springlee
 * Date: 2018/1/31
 * Time:backendUrl 下午2:04
 */

define('BACKEND_URL', 'http://47.89.10.38:8001');
define('B2B_URL', 'http://192.168.8.239:8484/');

header('Access-Control-Allow-Origin:*');

function curl_request($url, $post = '', $cookie = '', $returnCookie = 0)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
    curl_setopt($curl, CURLOPT_REFERER, "http://XXX");
    if ($post) {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post));
    }
    if ($cookie) {
        curl_setopt($curl, CURLOPT_COOKIE, $cookie);
    }
    curl_setopt($curl, CURLOPT_HEADER, $returnCookie);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    if (curl_errno($curl)) {
        return curl_error($curl);
    }
    curl_close($curl);
    if ($returnCookie) {
        list($header, $body) = explode("\r\n\r\n", $data, 2);
        preg_match_all("/Set\-Cookie:([^;]*);/", $header, $matches);
        $info['cookie'] = substr($matches[1][0], 1);
        $info['content'] = $body;
        return $info;
    } else {
        return $data;
    }
}


$uri = isset($_GET['uri'])? $_GET['uri'] :'';
switch ($uri){
    case '/User/login':
        echo curl_request(BACKEND_URL.$uri,$_POST);
        break;
    case '/User/ssoGetUser':
        echo curl_request(BACKEND_URL.$uri,$_POST);
        break;
    case '/api/businessOpportunity/index':
        echo curl_request(B2B_URL.$uri,$_POST);
        break;
    case '/api/businessOpportunity/detail':
        echo curl_request(B2B_URL.$uri,$_POST);
        break;
    default:
        break;

}
exit;