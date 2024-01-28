/* RadUpload Common Styles */

.RadUpload,
.RadUploadProgressArea
{
	width:430px; /*default*/
	text-align: left;
}

.RadUploadProgressAreaHidden
{
	display: none;
}

.RadUpload_rtl,
.RadUploadProgressArea_rtl
{
	text-align: right;
}

.RadUpload .ruInputs
{
	zoom:1;/*IE fix - removing items on the client*/
}

.RadUpload .ruInputs li
{
    margin: 0 0 5px;
}

.RadUpload .ruInputs li.ruActions
{
    margin: 1.4em 0 0;
}

.RadUpload .ruInputs,
.RadUploadProgressArea .ruProgress
{
	list-style:none;
	margin:0;
	padding:0;
}

.RadUpload .ruCheck
{
	top: 1px;
	padding: 3px;
	position:static;
	zoom:1;
}

.RadUpload .ruFileWrap
{
	position: relative;
	white-space:nowrap;
	display: inline-block;
	vertical-align: top;
    padding-right: 0.8em;
    line-height: 20px;
    zoom: 1;
}

.RadUpload_rtl .ruFileWrap
{
    padding-left: 0.8em;
    padding-right: 0;
}

* html .RadUpload .ruFileWrap { top: -1px; }/*IE6*/
*+html .RadUpload .ruFileWrap { top: -1px; }/*IE7*/

.RadUpload .ruFileInput
{
    height: 22px;
    top: -5px;
    left: 0;
}
* html .RadUpload .ruFileInput { top: 0; }/*IE6*/
*+html .RadUpload .ruFileInput { top: 0; }/*IE7*/

.RadUpload .ruStyled .ruFileInput,
.RadUpload .ruFakeInput
{
    border-width: 1px;
    border-style: solid;
    line-height: 18px;
    padding: 4px 4px 0 4px;

    -moz-box-sizing: content-box; /* Quirksmode height fix */
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

.RadUpload .ruFileInput,
.RadUpload .ruFakeInput,
.RadUpload .ruButton,
.RadUploadProgressArea .ruButton
{
	float: none;
	vertical-align:top;
}

.RadUpload .ruStyled .ruFileInput
{
	position:absolute;
	z-index:1;
	opacity:0;/*Opera,Firefox*/
	-moz-opacity:0;/*Firefox*/
	filter:alpha(opacity=0);/*IE*/
}

.RadUpload .ruReadOnly .ruFakeInput
{
	position:relative;
	z-index:2;
}

.RadUpload .ruFakeInput
{
    height: 16px;
    margin-right: -1px;
    vertical-align: middle;
    background-position: 0 -93px;
    background-repeat: repeat-x;
    background-color: #fff;
    
    line-height /*\**/: 20px\9; /* IE8 Standards still broken + old hacks don't work */
    height /*\**/: 20px\9;
    padding-top /*\**/: 0\9;
}

* html .RadUpload .ruFakeInput /*IE6*/
{
    height: 20px;
    margin-top: 0;
    padding-top: 0;
    padding-right: 0.5em;
    line-height: 20px;
    vertical-align: middle;
}

* html .RadUpload_rtl .ruFakeInput /*IE6*/
{
    margin-right: 0;
    margin-left: 0;
}

*+html .RadUpload .ruFakeInput /*IE7*/
{
    height: 20px;
    margin-top: -1px;
    padding-top: 0;
    padding-right: 0.5em;
    line-height: 20px;
    vertical-align: middle;
}

/* <buttons> */

.RadUpload .ruButton,
.RadUploadProgressArea .ruButton
{
    width: 79px;
    height: 22px;
    border: 0;
    padding-bottom: 2px;
    background-position: 0 -23px;
    background-repeat: no-repeat;
    background-color: transparent;
    text-align: center;
}
*+html .RadUpload .ruButton,
*+html .RadUploadProgressArea .ruButton { padding-bottom: 0; }

.RadUpload .ruBrowse
{
    width: 65px;
    margin-left: 4px;
    background-position: 0 0;
}

.RadUpload_rtl .ruBrowse
{
    margin-left: 0;
    margin-right: 4px;
}

.RadUpload .ruRemove
{
	overflow: visible;
	border: 0;
	background-position: 7px -70px;
	width: auto;
	padding-left: 16px;
	cursor: pointer;
	font-size: 10px;
}

.RadUpload_rtl .ruRemove
{
	background-position: 100% -70px;
	padding-left: 0;
	padding-right: 14px;
    margin-right: 4px;
}

.RadUpload .ruActions .ruButton,
.RadUploadProgressArea .ruActions .ruButton
{
    width: 79px;
    margin: 0 16px 0 0;
    background-position: 0 -23px;
}

.RadUpload_rtl .ruActions .ruButton,
.RadUploadProgressArea_rtl .ruActions .ruButton
{
    margin: 0 0 0 16px;
}

.RadUpload input[disabled],
.RadUpload .ruButtonDisabled,
.RadUploadProgressArea .ruButtonDisabled
{
	-moz-opacity:0.6;/*Firefox*/
	opacity:0.6;/*Opera,Firefox*/
	filter:alpha(opacity=60);/*IE*/
}

/* </buttons> */

/* <submit button> */
/* (use this class to style a single button for uploads) */

.RadUploadSubmit
{
    width: 115px;
    height: 22px;
    border: 0;
    margin: 0;
    padding: 0;
    background-position: 0 -46px;
    background-repeat: no-repeat;
    background-color: transparent;
    font: 11px/22px "Segoe UI", Arial, sans-serif;
    text-align: center;
}

/* </submit button> */

/* <progress area> */

.RadUploadProgressArea .ruProgress
{
    border-width: 1px;
    border-style: solid;
    background-position: 0 -112px;
    background-repeat: repeat-x;
    padding: 62px 0 0;
    zoom: 1;
}

.RadUploadProgressArea .ruProgress li
{
    margin: 0 18px 16px;
}

.RadUploadProgressArea .ruProgress li.ruCurrentFile
{
	margin: 20px 18px 5px;
    font-size: 14px;
}

.RadUploadProgressArea .ruProgress li.ruTimeSpeed
{
	margin-bottom: 20px;
}

.RadUploadProgressArea .ruProgress li.ruCurrentFile span
{
    font-size: 14px;
    line-height: 16px;
}

.RadUploadProgressArea .ruProgress div
{
    margin-bottom: 0.4em;
}

.RadUploadProgressArea .ruProgress .ruBar
{
    margin-bottom: 0.4em;
    border-width: 1px;
    border-style: solid;
    background-color: transparent;
    background-repeat: repeat-x;
    background-position: 0 -92px;
	height: 16px;
	overflow: hidden;
}
 
.RadUploadProgressArea .ruProgress .ruBar div
{
    background-color: transparent;
    background-repeat: repeat-x;
    background-position: 0 0;
	height: 17px;
	margin-top: -1px;
}

.RadUploadProgressArea_rtl .ruProgress .ruBar div
{
    background-color: transparent;
    background-repeat: repeat-x;
    background-position: 0 -17px;
}
 
.RadUploadProgressArea .ruProgress .ruActions
{
	border-top-width: 1px;
	border-top-style: solid;
	padding: 12px;
	text-align: right;
	margin: 0;
}

.RadUploadProgressArea_rtl .ruProgress .ruActions
{
	text-align: left;
}

.RadUploadProgressArea .ruProgress .ruActions .ruButton
{
	margin: 0 6px 0 0
}

.RadUploadProgressArea_rtl .ruProgress .ruActions .ruButton
{
	margin: 0 0 0 6px
}

/* <shadow> */
.RadUploadProgressArea
{
	background: transparent url('WebResource.axd?d=WTmbGSiCIpqa--8UkgrEsxCExysn_yJ4N_vZjBe4bk_k31F46TqA7PuRbZrHCeM8IiE89zNjviSn8N7PEG_wSsANg6tVLMVlpUPQ5mrUdXAeLJ8C4EdQtuaQt1ldN2xio8hZC8y3SFG-D6ygB8AHS4P1JxcpL-bRcW7rJ8weYHk1&t=634183400340000000') no-repeat 100% 100%;
	padding-bottom: 3px;
}

.RadUploadProgressArea > .ruShadow
{
	background: transparent url('WebResource.axd?d=WTmbGSiCIpqa--8UkgrEsxCExysn_yJ4N_vZjBe4bk_k31F46TqA7PuRbZrHCeM8IiE89zNjviSn8N7PEG_wSsANg6tVLMVlpUPQ5mrUdXAeLJ8C4EdQtuaQt1ldN2xio8hZC8y3SFG-D6ygB8AHS4P1JxcpL-bRcW7rJ8weYHk1&t=634183400340000000') no-repeat 100% 2px;
	border-bottom: 3px solid transparent;
	zoom: 1;
}

*+html .RadUploadProgressArea > .ruShadow { border: 0; }

.RadUploadProgressArea .ruShadow > div
{
	margin: 0 3px -6px 0;
	padding: 0 0 3px;
	background: transparent url('WebResource.axd?d=ynTqpODdff0Q2pfxSfdVMTlBzcVUs4IjrgoZ50DmhVhJ3SIEa7ltByL_PSuitvNO2aT3D4gRpNWtvaA80Sg8iJmo9STURJHezmFwsC2XQAzqWx3xKzSLWkfBa7Fkep8fYsK3ZzVlBZ9cNH8HP-DlBlCpBqsvy56I-qFRjJwjj3k1&t=634183400340000000') no-repeat 2px 100%;
	zoom: 1;
}
*+html .RadUploadProgressArea .ruShadow > div { margin: 0 3px -3px 0; }

* html .RadUploadProgressArea
{
	background: none;
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#BBBBBB',direction='135',strength='3');
}

/* </shadow> */

/* <RadAsyncUpload additional styles> */

.RadUpload .ruUploadProgress
{
	padding-left: 18px;
	display: block;
	background-color: transparent;
	background-repeat: no-repeat;
	background-position: 0 50%;
}

.RadUpload .ruUploadSuccess
{
	background-position: 0 21%;
}

.RadUpload .ruUploadFailure
{
	background-position: 0 80%;
}

.RadUpload .ruFileWrap .ruUploadInvalid
{
	border-color: #d51923; 
	color: #d51923;    
}

/* </RadAsyncUpload additional styles> */

/* </progress area> */

@media screen and (-webkit-min-device-pixel-ratio:0)
{
	.RadUploadProgressArea .ruBar,
	.RadUploadProgressArea .ruBar div
	{
		border: solid transparent;
		border-width: 1px 0;
	}
	
	.RadUploadProgressAreaHidden
	{
		display: block; /* Progress area must be display: block in WebKit to render the animated gif before submit, */
						/* after that gif loading doesn't work                                                      */
		overflow: hidden;		   
		visibility: hidden;
		width: 0;
		height: 0;
	}
}

/* <hacks for opera/rtl> */
@media all and(-webkit-max-device-pixel-ratio: 10000),
   not all and(-webkit-min-device-pixel-ratio: 0) {

	.RadUpload_rtl .ruRemove
	{
		margin: 0 0 0 4px;
	}
	
	.RadUpload_rtl .ruActions .ruButton
	{
		margin: 0 16px 0 0;
	}

	.RadUploadProgressArea_rtl .ruProgress .ruActions .ruButton
	{
		margin: 0 6px 0 0
	}

	.RadUpload_rtl .ruBrowse
	{
		margin: 0 0 0 3px;
	}
}
/* </hacks for opera/rtl> */
