<?php
class UzanService
{
    protected $clientId;
    protected $clientSecret;
    protected $kdtId;
    protected $paySubject;
    protected $returnUrl;
    protected $totalFee;
    protected $outTradeNo;

    public function __construct($clientId,$clientSecret,$kdtId,$paySubject,$returnUrl,$totalFee,$outTradeNo)
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->kdtId = $kdtId;
        $this->paySubject = $paySubject;
        $this->returnUrl = $returnUrl;
        $this->totalFee = $totalFee;
        $this->outTradeNo = $outTradeNo;
    }

    /**
     * 发起订单
     * @return array
     */
    public function doPay()
    {
        $requestConfigs = array(
            'client_id'=>$this->clientId,
            'client_secret'=>$this->clientSecret,
            'kdt_id'=>$this->kdtId,
            'subject' => $this->paySubject,
            'return_url'=>$this->returnUrl,
            'total_fee'=>$this->totalFee,
            'out_trade_no'=>$this->outTradeNo,
        );
        return $this->buildRequestForm($requestConfigs);
    }

    /**
     * 建立请求，以表单HTML形式构造（默认）
     * @param $para_temp 请求参数数组
     * @return 提交表单HTML文本
     */
    function buildRequestForm($para_temp) {
        //待请求参数数组
        $para = $para_temp;
        $sHtml = "<form id='uzansubmit' name='uzansubmit' action='https://pay.dedemao.com/api.php' method='post'>";
        while (list ($key, $val) = each ($para)) {
            $sHtml.= "<input type='hidden' name='".$key."' value='".$val."'/>";
        }
        //submit按钮控件请不要含有name属性
        $sHtml = $sHtml."<input type='submit'  value='提交' style='display:none;'></form>";

        $sHtml = $sHtml."<script>document.forms['uzansubmit'].submit();</script>";

        return $sHtml;
    }
}