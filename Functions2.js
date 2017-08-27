        // -- BRETT --
        if (window.jstiming) window.jstiming.load.tick('headEnd');
        var ImgWidth = 100;
        var ImgHeight = 100;
        var vID = 0;
        var photos;
        LeftPicPreload = new Image(); 
        RightPicPreload = new Image();

        if (document.addEventListener)    
        {       
            document.addEventListener("keyup",keyup,false);       
        }    
        else if (document.attachEvent)    
        {       
            document.attachEvent("onkeyup", keyup);       
        }    
        else
        {      
            document.onkeyup= keyup;// probably doesn't work    
        }

        function keyup(e) 
        {
            if (!e) e = event;
            if (e.keyCode == 39) MoveToRightImg();
            if (e.keyCode == 37) MoveToLeftImg();
            if (e.keyCode == 27) HideLightBox();
            //alert(e.keyCode); 
        }

        function HideLightBox() {
            document.getElementById('LightBoxBackGroundBG').style.visibility = "hidden";
            document.getElementById('LightBoxBD').style.visibility = "hidden";
            document.getElementById('LightBoxDiv').style.visibility = "hidden";
            document.getElementById('LightBoxDivImg').style.visibility = "hidden";
            document.getElementById('RightDiv').style.visibility = "hidden";
            document.getElementById('LeftDiv').style.visibility = "hidden";
            document.getElementById('CloseDiv').style.visibility = "hidden";
            document.getElementById('LightBoxImg').src = '';
            document.getElementById('LightBoxIFrame').src = '';
            document.getElementById('TextTop').innerHTML = '';
            document.getElementById('TextTop').style.visibility = "hidden";
            document.getElementById('TextBottom').innerHTML = '';
            document.getElementById('TextBottom').style.visibility = "hidden";
        }

        function ShowLightBox(URL) {
            document.getElementById('LightBoxBackGroundBG').style.visibility = "visible";
            document.getElementById('LightBoxBD').style.visibility = "visible";
            document.getElementById('LightBoxDiv').style.visibility = "visible";
            document.getElementById('LightBoxDivImg').style.visibility = "hidden";
            document.getElementById('LightBoxIFrame').src = URL;
        }

        function ShowLightBoxImg(URL) {
            document.getElementById('LightBoxImg').src = URL;
            document.getElementById('LightBoxBackGroundBG').style.visibility = "visible";
            document.getElementById('LightBoxBD').style.visibility = "visible";
            document.getElementById('LightBoxDiv').style.visibility = "hidden";
            document.getElementById('LightBoxDivImg').style.visibility = "visible";
            document.getElementById('RightDiv').style.visibility = "visible";
        }

        function ShowLightBoxImg2(URL, W, H) {
            ImgWidth = W;
            ImgHeight = H;
            ResizeLightBoxImg();
            document.getElementById('LightBoxImg').src = URL;
            document.getElementById('LightBoxBackGroundBG').style.visibility = "visible";
            document.getElementById('LightBoxBD').style.visibility = "visible";
            document.getElementById('LightBoxDiv').style.visibility = "hidden";
            document.getElementById('LightBoxDivImg').style.visibility = "visible";
            document.getElementById('RightDiv').style.visibility = "visible";
            document.getElementById('LeftDiv').style.visibility = "visible";
            document.getElementById('CloseDiv').style.visibility = "visible";
        }

        function ShowLightBoxImg4(xID, vPageID) {
            vID = xID;
            eval('photos = photos' + vPageID);
            ShowLightBoxImg3(vID);
        }

        function ShowLightBoxImg3(xID) {
            vID = xID;
            ImgWidth = photos[vID][1];
            ImgHeight = photos[vID][2];
            ResizeLightBoxImg();
            document.getElementById('LightBoxImg').src = photos[vID][0];
            if (photos[vID][5] != '') {
                document.getElementById('TextTop').innerHTML = photos[vID][3] + "  -  " + photos[vID][5];
            } else {
                document.getElementById('TextTop').innerHTML = photos[vID][3];
            }
            document.getElementById('TextTop').style.visibility = "visible";
            document.getElementById('TextBottom').innerHTML = photos[vID][6];
            document.getElementById('TextBottom').style.visibility = "visible";
            document.getElementById('LightBoxBackGroundBG').style.visibility = "visible";
            document.getElementById('LightBoxBD').style.visibility = "visible";
            document.getElementById('LightBoxDiv').style.visibility = "hidden";
            document.getElementById('LightBoxDivImg').style.visibility = "visible";
            document.getElementById('RightDiv').style.visibility = "visible";
            document.getElementById('LeftDiv').style.visibility = "visible";
            document.getElementById('CloseDiv').style.visibility = "visible";

            RightID = vID + 1;
            if (RightID > photos.length - 1) {RightID = 0;}
            RightPicPreload.src = photos[RightID][0];
        }

        function MoveToRightImg() {
            vID = vID + 1;
            if (vID > photos.length - 1) { vID = 0; }
            ShowLightBoxImg3(vID)
        }

        function MoveToLeftImg() {
            vID = vID - 1;
            if (vID < 0) { vID = photos.length - 1; }
            ShowLightBoxImg3(vID)
        }

        function ResizeLightBoxImg() {
            var viewportwidth;
            var viewportheight;

            // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
            if (typeof window.innerWidth != 'undefined') {
                viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
            }

            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
                viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
            }

            // older versions of IE
            else {
                viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }

            // Calculated lowest scaling proportion
            var MinArrowWidth = 59;// 125;
            var TextHeight = 20;
            var border = 5;
            var Proportion = ((viewportheight - (TextHeight * 3) - (border * 2)) * 0.94) / ImgHeight; // .94
            if (Proportion > ((viewportwidth - (MinArrowWidth * 2) - (border * 2)) * 0.90) / ImgWidth) // .90
            { Proportion = ((viewportwidth - (MinArrowWidth * 2) - (border * 2)) * 0.90) / ImgWidth; } // .90
            if (Proportion > 1) { Proportion = 1; }
            var NewWidth = ImgWidth * Proportion;
            var NewHeight = ImgHeight * Proportion;
            var NewLeft = (viewportwidth - NewWidth) / 2;
            var NewTop = (viewportheight - NewHeight) / 2 - (TextHeight / 2);

            document.getElementById('LightBoxDivImg').style.top = Math.ceil(NewTop + border).toString() + 'px';
            document.getElementById('LightBoxDivImg').style.height = Math.ceil(NewHeight - (border * 2)).toString() + 'px';
            document.getElementById('LightBoxDivImg').style.left = Math.floor(NewLeft + border).toString() + 'px';
            document.getElementById('LightBoxDivImg').style.width = Math.floor(NewWidth - (border * 2)).toString() + 'px';

            document.getElementById('LightBoxBD').style.top = Math.floor(NewTop).toString() + 'px';
            document.getElementById('LightBoxBD').style.height = Math.floor(NewHeight).toString() + 'px';
            document.getElementById('LightBoxBD').style.left = Math.floor(NewLeft).toString() + 'px';
            document.getElementById('LightBoxBD').style.width = Math.floor(NewWidth).toString() + 'px';

            document.getElementById('TextBottom').style.top = Math.floor(NewTop + NewHeight + border).toString() + 'px';

            var ArrowWidth = 59; //  118; // NewLeft * 0.75;
            // if (ArrowWidth > 200) { ArrowWidth = 200; }
            var ArrowHeight = 68; //  135; // * ArrowWidth / 200;

            document.getElementById('LeftDiv').style.top = Math.floor((viewportheight - ArrowHeight) / 2).toString() + 'px';
            document.getElementById('LeftDiv').style.height = Math.floor(ArrowHeight).toString() + 'px';
            document.getElementById('LeftDiv').style.left = "20px"; // Math.floor((NewLeft - ArrowWidth) / 2).toString() + 'px';
            document.getElementById('LeftDiv').style.width = Math.floor(ArrowWidth).toString() + 'px';

            document.getElementById('RightDiv').style.top = Math.floor((viewportheight - ArrowHeight) / 2).toString() + 'px';
            document.getElementById('RightDiv').style.height = Math.floor(ArrowHeight).toString() + 'px';
            document.getElementById('RightDiv').style.left = Math.floor(viewportwidth - ArrowWidth - 20).toString() + 'px';  //Math.floor(NewLeft + NewWidth + ((NewLeft - ArrowWidth) / 2)).toString() + 'px';
            document.getElementById('RightDiv').style.width = Math.floor(ArrowWidth).toString() + 'px';

            document.getElementById('CloseDiv').style.top = "20px";
            document.getElementById('CloseDiv').style.height = Math.floor(ArrowHeight).toString() + 'px';
            document.getElementById('CloseDiv').style.left = Math.floor(viewportwidth - ArrowWidth - 20).toString() + 'px';  //Math.floor(NewLeft + NewWidth + ((NewLeft - ArrowWidth) / 2)).toString() + 'px';
            document.getElementById('CloseDiv').style.width = Math.floor(ArrowWidth).toString() + 'px';
        }
        
        function MoonSpaghettiStartup() {
            ReplaceDivs();
        }

        function ReplaceDivs() {
            var divs;
            if (document.getElementsByTagNameNS)
                divs = document.getElementsByTagNameNS('*', 'div');
            else
                divs = document.getElementsByTagName('div');
            for (var i in divs) {
                var div = divs[i];
                if (div.id)
                    if (div.id.substring(0, 9) == 'PhotoPage') {
                        var PageID = div.id.replace('PhotoPage', '');
                        jsonpage('http://brettfarley.com/ThumbnailAJAX.aspx?PageID=' + PageID + '&Width=680&Columns=4', 'PhotoPage' + PageID);
                        //jsonpage('http://localhost:62336/BrettFarleyAJAX/ThumbnailAJAX.aspx?PageID=' + PageID + '&Width=680&Columns=4', 'PhotoPage' + PageID);
                        //ajaxpage('http://brettfarley.com/ThumbnailAJAX.aspx?PageID=' + PageID + '&Width=680&Columns=4', 'PhotoPage' + PageID);
                        //ajaxpage('http://localhost:2554/BrettFarleyAJAX/ThumbnailAJAX.aspx?PageID=' + PageID + '&Width=680&Columns=4', 'PhotoPage' + PageID);
                    }
            }
        }

        function resizeFrame(tag) {
            var myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                //IE 4 compatible
                myHeight = document.body.clientHeight;
            }

            var f = document.getElementById(tag);
            f.height = myHeight;
            //if (f.contentDocument) {
            //alert(1);
            //f.height = f.contentDocument.documentElement.scrollHeight+30; //FF 3.0.11, Opera 9.63, and Chrome
            //} else {
            //alert(2); 

            //f.height = f.contentWindow.document.body.scrollHeight+30; //IE6, IE7 and Chrome
            //}
        }

        function sizeFrame() {
            var F = document.getElementById("myFrame");
            if (F.contentDocument) {
                F.height = F.contentDocument.documentElement.scrollHeight + 30; //FF 3.0.11, Opera 9.63, and Chrome
            } else {
                F.height = F.contentWindow.document.body.scrollHeight + 30; //IE6, IE7 and Chrome
            }
        }


        var bustcachevar = 1 //bust potential caching of external pages after initial request? (1=yes, 0=no)
        var loadedobjects = ""
        var rootdomain = "http://" + window.location.hostname
        var bustcacheparameter = ""
        var redrawloop = 0;

        function ajaxpage(url, containerid) {
            var PageID = containerid.replace('PhotoPage', '');
            document.getElementById(containerid).innerHTML = "<iframe id='Iframe" + PageID + "' src='" + url +
        "' frameborder=0 border=0 width='680' height='100%' onload='resizeFrame(\"Iframe" + PageID + "\")'></iframe>";
        }


        function jsonpage(url, containerid) {
            var PageID = containerid.replace('PhotoPage', '');

            // Show a "Loading..." indicator.
            var div = document.getElementById(containerid);
            var p = document.createElement('p');
            p.appendChild(document.createTextNode('Loading...'));
            div.appendChild(p);

            // Add a script element with the src as the user's Google Base query. 
            // JSON output is specified by including the alt=json-in-script argument
            // and the callback funtion is also specified as a URI argument.
            var scriptElement = document.createElement("script");
            scriptElement.setAttribute("id", "jsonScript" + PageID);
            scriptElement.setAttribute("src", url);
            scriptElement.setAttribute("type", "text/javascript");

            document.documentElement.firstChild.appendChild(scriptElement);
            //setTimeout("ReplacePhotoPage100()", 50);
        }

        function dummy() {
            var page_request = false
            if (window.XDomainRequest) {
                page_request = new XDomainRequest();
                page_request.onload = function () { loadpageIE8(page_request, containerid) }
            } // if IE8
            else if (window.XMLHttpRequest) {
                page_request = new XMLHttpRequest();
                page_request.onreadystatechange = function () { loadpage(page_request, containerid) }
            } // if Mozilla, Safari etc
            else if (window.ActiveXObject) { // if IE
                try {
                    page_request = new ActiveXObject("Msxml2.XMLHTTP");
                    page_request.onreadystatechange = function () { loadpage(page_request, containerid) }
                }
                catch (e) {
                    try {
                        page_request = new ActiveXObject("Microsoft.XMLHTTP");
                        page_request.onreadystatechange = function () { loadpage(page_request, containerid) }
                    }
                    catch (e) { }
                }
            }
            else return false
            if (bustcachevar) { bustcacheparameter = (url.indexOf("?") != -1) ? "&" + new Date().getTime() : "?" + new Date().getTime() }
            page_request.open('GET', url + bustcacheparameter, true)
            page_request.send(null)
            document.getElementById(containerid).innerHTML = "Loading Images..."; // url + bustcacheparameter;
        }

        function loadpage(page_request, containerid) {
            if (page_request.readyState == 4 && (page_request.status == 200 || window.location.href.indexOf("http") == -1)) {
                document.getElementById(containerid).innerHTML = page_request.responseText
            }
        }

        function loadpageIE8(page_request, containerid) {
            document.getElementById(containerid).innerHTML = page_request.responseText
        }

        function addLoadEvent(func) {
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                }
            }
        }


        if (window.jstiming) window.jstiming.load.tick('headEnd');


        function RedrawLightBox2() {
            document.getElementById('LightBoxIFrame').src = document.getElementById('LightBoxIFrame').src;
            redrawloop = redrawloop + 1;
            if (redrawloop < 20)
                setTimeout("RedrawLightBox2()", 200);
        }

