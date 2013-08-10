/*

The MIT License

Copyright (c) 2013 Bob Rudis (@hrbrmstr) (bob@rudis.net)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// "target" icon came from from: http://bit.ly/17EmSpB

// getIPIntelligence(info, tab)
//
// launch a new browser window with tabls for each lookup service
// ONLY if the item was an IP address
// it turns out you need a "background" page, build context menus
// on the fly and do message passing to do it the proper way 
// (i.e. only have the context menu appear if the selected text
// is a legit IP address) so, this takes the easy way out and 
// just does post-validation and alerting. #lazy
//
// you should be able to get the idea of how to add/remove
// various services just from scanning the source. it's
// *far* from rocket science :-)

function getIPIntelligence(info, tab) {
    
    console.log("IP: " + info.selectionText);
    
    if ((info.selectionText).match("^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$")) {

        chrome.windows.create(
            {'type': 'normal', 'focused': true},
            function(chromeWindow) {
               chrome.tabs.create({ 
                    url: "http://whois.domaintools.com/" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.mywot.com/en/scorecard/" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.tcpiputils.com/browse/ip-address/" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://labs.alienvault.com/labs/index.php/projects/open-source-ip-reputation-portal/information-about-ip/?ip=" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.projecthoneypot.org/ip_" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "https://www.virustotal.com/en/ip-address/" + info.selectionText + "/information/",
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.senderbase.org/lookup?search_string=" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.mcafee.com/threat-intelligence/ip/default.aspx?ip=" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.sophos.com/en-us/threat-center/ip-lookup.aspx?ip=" + info.selectionText,
                    windowId: chromeWindow.id,
                });
                chrome.tabs.create({ 
                    url: "http://www.ipvoid.com/scan/" + info.selectionText,
                    windowId: chromeWindow.id,
                });        
            }
        ); 
    } else {
        alert("Not an IP address")
    }
}

// Add the context menu for selected text. 
// If the menu item is activated, execute getIPIntelligence(...)

chrome.contextMenus.create({
    title: "Lookup IP Intelligence for [%s]", 
    contexts:[ "selection", "editable" ],
    onclick: getIPIntelligence
});
