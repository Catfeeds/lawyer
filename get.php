<?php
session_start();

$phone = "13122707159";
$strphone = 'smsCodeReg_'.$phone;
$smsCode = isset($_SESSION['smsCodeReg_13122707159']) ? $_SESSION['smsCodeReg_13122707159'] : '';
echo $smsCode;